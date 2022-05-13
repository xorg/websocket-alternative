
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";



// example msg string
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
      "Host": "wilmaa-session.ngrok.io",
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
    "apiId": "u6eodn2kg7",
    "sourceIp": "178.197.226.236",
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
      "Sec-WebSocket-Key": "p87BzF3ocKK5tcleKWgZtA==",
      "Sec-WebSocket-Version": "13",
      "X-Amzn-Trace-Id": "2jl3kjsldökfjp2o3wrjsldkj",
      "X-Forwarded-For": "178.197.226.236",
      "X-Forwarded-Port": "443",
      "X-Forwarded-Proto": "https"
    },
    "requests_headers": {
      "X-Amzn-Apigateway-Api-Id": "u6eodn2kg7",
      "X-Amzn-Trace-Id": "slköfjlö2jkw34ölfskd",
      "User-Agent": "AmazonAPIGateway_u6eodn2kg7",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Content-Length": "1099",
      "Host": "example.ngrok.io",
      "X-Forwarded-Proto": "https",
      "X-Forwarded-For": "108.128.23.161"
    }
  }
};

export let options = {
    stages: [
      { duration: '5s', target: 5 },
      { duration: '10s', target: 10 },
      { duration: '5s', target: 20 },
      { duration: '5s', target: 5 },
      { duration: '1s', target: 0 },
    ],
  };


export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const payload = JSON.stringify(msg);
  http.post('http://localhost:30800/send', payload, params);
}


export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}