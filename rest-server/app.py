import os
from redis import StrictRedis, Redis
import json
from flask import Flask, request

REDIS_HOST = os.environ["REDIS_MASTER_SERVICE_HOST"] if os.environ.get("GET_HOSTS_FROM", "") == "env" else "localhost"
REDIS_PORT = 6379

app: Flask = Flask("app")

redis_url: str = f"redis://127.0.0.1:{REDIS_PORT}/0"
connection: Redis = StrictRedis.from_url(redis_url, decode_responses=True)
channel_incoming: str = "test_in"


@app.post("/send")
def send() -> str:
    body = request.json
    connection.publish(channel_incoming, str(body))
    return ""


@app.get("/list")
def list() -> str:
    connections = connection.keys("*")
    data: str = json.dumps(connections)
    return data


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)
