

import ws from 'k6/ws';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";




export let options = {
    stages: [
      { duration: '5s', target: 50 },
      { duration: '5s', target: 200 },
      { duration: '3s', target: 500 },
      { duration: '5s', target: 2000 },
      { duration: '3s', target: 20 },
      { duration: '5s', target: 0 },
    ],
  };


const msg = {
  "request_details": {
    "connectionId": "Gto47d9-DoECGqg=",
    "connectedAt": "1579714617030",
    "domainName": "u6eodn2kg7.random-domain.eu-west-1.example.com",
    "eventType": "MESSAGE",
    "messageId": "Gto5md-NDoECGqg=",
    "routeKey": "$default",
    "requestId": "Gto5mE7jDoEFj7Q=",
    "extendedRequestId": "Gto5mE7jDoEFj7Q=",
    "apiId": "u6eodn2kg7",
    "sourceIp": "178.197.226.236",
    "userAgent": "",
    "requestTimeEpoch": "1579714621380",
    "status": "",
    "body": {
      "raw_body": "ping",
      "event": "ping"
    },
    "headers": {},
    "requests_headers": {
      "X-Amzn-Apigateway-Api-Id": "u6eodn2kg7",
      "X-Amzn-Trace-Id": "Root=1-5e28883d-46b12f0b1b1a8c61df028ed9",
      "User-Agent": "AmazonAPIGateway_u6eodn2kg7",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Content-Length": "519",
      "Host": "example-session.eample.io",
      "X-Forwarded-Proto": "https",
      "X-Forwarded-For": "108.128.162.174"
    }
  },
  "inital_details": {
    "connectionId": "Gto47d9-DoECGqg=",
    "connectedAt": "1579714617030",
    "domainName": "example.com",
    "eventType": "CONNECT",
    "messageId": "",
    "routeKey": "$connect",
    "requestId": "Gto47E5bjoEFp6A=",
    "extendedRequestId": "Gto47E5bjoEFp6A=",
    "apiId": "test",
    "sourceIp": "127.0.0.1",
    "userAgent": "",
    "requestTimeEpoch": "1579714617049",
    "status": "",
    "body": {
      "latitude": 47.3667,
      "longitude": 8.55
    },
    "headers": {
      "ding": "dong",
      "Host": "example.com",
      "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
      "Sec-WebSocket-Key": "test==",
      "Sec-WebSocket-Version": "13",
      "X-Amzn-Trace-Id": "2jl3kjsldökfjp2o3wrjsldkj",
      "X-Forwarded-For": "178.197.226.236",
      "X-Forwarded-Port": "443",
      "X-Forwarded-Proto": "https"
    },
    "requests_headers": {
      "X-Amzn-Apigateway-Api-Id": "test",
      "X-Amzn-Trace-Id": "test",
      "User-Agent": "AmazonAPIGatewaytest",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Content-Length": "1099",
      "Host": "example.ngrok.io",
      "X-Forwarded-Proto": "https",
      "X-Forwarded-For": "108.128.23.161"
    }
  }
};

export default function () {

  const url = 'ws://localhost:30800';    // local websocket server

  const res = ws.connect(url, null, function (socket) {
    socket.on('open', function open() {
      console.log('connected');
      socket.setInterval(function interval() {
        socket.send(msg);
        // console.log('Message sent: ', text);
      }, 1000);
    });

    socket.on('message', function message(data) {
      console.log('Message received: ', data);
    });

    socket.on('close', () => console.log('disconnected'));

    socket.setTimeout(function () {
    //   console.log('5 seconds passed, closing the socket');
      socket.close();
    }, 30000);
  });

}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}