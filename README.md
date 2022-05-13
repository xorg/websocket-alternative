# websocket-alternative
Websocket Load Testing and Prototypes

## Basic structure
```
│   
│
└───load-testing/
│   │   # Scripts for load testing the various prototypes. Most load tests are written using k6.
│   │   
│   └───reports
│       │   # various html reports of the load tests.
│   
└───rest-server
│    │   # Basic HTTP server written in flask. Interacts with redis.
│    │   # Includes docker and kubernetes deployment configuration
│
└───websocket-server/   
│    │   # Asynchronous Websocket server written with the python library websockets. Uses a publish subscribe pattern with redis.
│
└───server-sent-events/  
     │   # Basic prototype of SSE written in Node.js and Express. Includes a small script that starts 1000 curl processs listening to the SSE.

