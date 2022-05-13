FROM python:3.7-alpine

RUN pip install aioredis asyncio websockets

COPY websocket.py .

CMD ["python", "websocket.py"]
