import os
import json
import http
from typing import Awaitable, Dict, List
import aioredis
import asyncio
import websockets
from websockets.server import WebSocketServerProtocol
from websockets.exceptions import ConnectionClosedError

REDIS_HOST = os.environ['REDIS_MASTER_SERVICE_HOST'] if os.environ.get('GET_HOSTS_FROM', '') == 'env' else 'localhost'
REDIS_PORT = 6379


REDIS_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"
channel_incoming = "test_in"
channel_outgoing = "test_out"

redis = aioredis.StrictRedis.from_url(REDIS_URL, decode_responses=True)

connections: Dict[str, WebSocketServerProtocol] = {}


def handle_connect(websocket: WebSocketServerProtocol) -> Awaitable:
    """Save incoming socket in Redis """
    
    return redis.set(str(websocket.id), str(websocket.state))


async def handler(websocket: WebSocketServerProtocol):
    """Handle connection and register it in connections dict"""

    print(f"websocket {websocket.id} just connected")
    await handle_connect(websocket)
    connections[str(websocket.id)] = websocket

    try:
        incoming_msg = await websocket.recv()
        print(f"msg from socket {websocket.id}: {incoming_msg}")

        await websocket.wait_closed()
    except ConnectionClosedError:
        print(f"websocket {websocket.id} just disconnected")
        del connections[str(websocket.id)]
        await redis.delete(str(websocket.id))


async def health_check(path, request_headers):
    """Health check for Kubernetes to check if service is up"""

    if path == "/health":
        return http.HTTPStatus.OK, [], b"OK\n"


async def process_events():
    """Listen to events in Redis and process them."""

    pubsub = redis.pubsub()
    await pubsub.subscribe(channel_incoming)
    async for event in pubsub.listen():
        print(f"got event {event}")
        if event["type"] == "message":
            # make sure json string is doubly quoted to not screw up json loading
            data = event.get("data")
            message = data.replace("'", '"')
            message = json.loads(message)
            session_id = message.get("session_id")
            socket = connections.get(session_id)
            if socket:
                print(f"sending {message} to session {socket.id}")
                msg_str = json.dumps(message)
                websockets.broadcast([socket], msg_str)
            else:
                print(f"got message {message}, but no valid session id")
                print(f"sending message {message} to all clients")
                recipients: List[WebSocketServerProtocol] = [connections[key] for key in connections]
                websockets.broadcast(recipients, json.dumps(message))


async def main():
    """Run main async loop"""

    await redis.flushall()
    print("Starting websocket server")
    async with websockets.serve(handler, "", 8001, ping_interval=None, process_request=health_check):
        await process_events()  # runs forever


if __name__ == "__main__":
    asyncio.run(main())
