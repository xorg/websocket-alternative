kamino = db.getSiblingDB("kamino")

// let user = kamino.user.findOne()

// let newUsers = []
// for (let index = 0; index < 9999; index++) {
//     let newUser = user;
//     newUser.email = "test@test.test" + index
//     newUser._id = null
//     kamino.user.insertOne(newUser);
// }

let clientsession = {
    "user": {
        "$oid": "000000000000000000000001"
    },
    "created_at": {
        "$date": {
            "$numberLong": "1650808361122"
        }
    },
    "updated_at": {
        "$date": {
            "$numberLong": "1650808361130"
        }
    },
    "aws_api_gateway_timestamp": {
        "$date": {
            "$numberLong": "1650808360264"
        }
    },
    "socket_id": "RFpmUf7KjoECJgQ=",
    "inital_payload": {
        "connectionId": "RFpmUf7KjoECJgQ=",
        "connectedAt": "1650808360263",
        "domainName": "u6eodn2kg7.execute-api.eu-west-1.amazonaws.com",
        "eventType": "CONNECT",
        "messageId": "",
        "routeKey": "$connect",
        "requestId": "RFpmUGD1DoEF_Uw=",
        "extendedRequestId": "RFpmUGD1DoEF_Uw=",
        "apiId": "u6eodn2kg7",
        "sourceIp": "31.10.173.89",
        "userAgent": "",
        "requestTimeEpoch": "1650808360264",
        "status": "",
        "body": {
            "aws_api_gateway_timestamp": {
                "$date": {
                    "$numberLong": "1650808360264"
                }
            },
            "city": "Neuchatel",
            "country": "Switzerland",
            "weather": {
                "weather_details": [
                    {
                        "id": {
                            "$numberInt": "520"
                        },
                        "main": "Rain",
                        "description": "light intensity shower rain",
                        "icon": "09d"
                    }
                ],
                "temperature": {
                    "$numberInt": "12"
                },
                "visibility": {
                    "$numberInt": "10000"
                },
                "_cls": "Weather"
            }
        },
        "headers": {
            "Host": "u6eodn2kg7.execute-api.eu-west-1.amazonaws.com",
            "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
            "Sec-WebSocket-Key": "Ujt/6ykzLT8OokwFwh+aSg==",
            "Sec-WebSocket-Version": "13",
            "X-Amzn-Trace-Id": "Root=1-62655628-47c1b1f1294b5ed61efef1ac",
            "X-Forwarded-For": "31.10.173.89",
            "X-Forwarded-Port": "443",
            "X-Forwarded-Proto": "https"
        },
        "requests_headers": {
            "Host": "api.development.k8s.w4a.tv",
            "X-Real-Ip": "192.168.156.57",
            "X-Forwarded-For": "176.34.94.154, 192.168.156.57",
            "X-Forwarded-Proto": "https",
            "Connection": "close",
            "Content-Length": "786",
            "X-Forwarded-Port": "443",
            "X-Amzn-Trace-Id": "Root=1-62655628-3e45908e514d6b1d5a0d680f",
            "User-Agent": "python-requests/2.7.0 CPython/3.9.11 Linux/4.14.255-273-220.498.amzn2.x86_64",
            "Accept-Encoding": "gzip, deflate",
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    },
    "city": "Neuchatel",
    "country": "Switzerland",
    "weather": {
        "weather_details": [
            {
                "id": {
                    "$numberInt": "520"
                },
                "main": "Rain",
                "description": "light intensity shower rain",
                "icon": "09d"
            }
        ],
        "temperature": {
            "$numberInt": "12"
        },
        "visibility": {
            "$numberInt": "10000"
        }
    },
    "hit_counter": {
        "$numberInt": "2"
    }
};

let sessions = []
for (let index = 0; index < 9999; index++) {
    let newSession = clientsession
    kamino.client_session.insert(newSession)
}


kamino.user.find().forEach((u) => {
    let newSession = clientsession
    newSession.user = u._id
    kamino.client_session.insertOne(newSession)

});




