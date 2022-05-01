

import ws from 'k6/ws';
import { check } from 'k6';

// export let options = {
//   stages: [
//     { duration: '10s', target: 3000 },
//     { duration: '30s', target: 3000 },
//     { duration: '20s', target: 6000 },
//     { duration: '30s', target: 6000 },
//     { duration: '20s', target: 3000 },
//     { duration: '30s', target: 3000 },
//     { duration: '10s', target: 0 },
//   ],
// };

export let options = {
    stages: [
      { duration: '5s', target: 1000 },
      { duration: '10s', target: 2000 },
      { duration: '5s', target: 1000 },
      { duration: '5s', target: 0 },
    ],
  };

//   export let options = {
//     stages: [
//       { duration: '5s', target: 100 },
//       { duration: '10s', target: 200 },
//       { duration: '5s', target: 100 },
//       { duration: '5s', target: 0 },
//     ],
//   };


export default function () {
  const text = '{"session_id": "01234", "msg": "test message from k6"}';
  // public websocket server for quick test
  //const url = 'wss://javascript.info/article/websocket/demo/hello';
  const url = 'ws://localhost:30000';    // local websocket server

  const res = ws.connect(url, null, function (socket) {
    socket.on('open', function open() {
      console.log('connected');
      socket.setInterval(function interval() {
        socket.send(text);
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