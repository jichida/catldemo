const Hapi = require('hapi');
const jsondata = require('./data.js');
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    routes: { cors: true },
    port: 50002
});

// config: {
//   cors: {
//     origin: ['*'],
//     additionalHeaders: ['cache-control', 'x-requested-with']
//     }
//  },
server.route({
    method: 'GET',
    path:'/api/getdevicegeo',
    handler: function (request, reply) {
      return reply(JSON.stringify({list:jsondata.getjsondata()}));
    }
  });

server.route({
        method: 'POST',
        path:'/api/setdevicegeo',
        handler: function (request, reply) {
          console.log(`get data:${JSON.stringify(request.payload)}`);
          jsondata.setjsondata(request.payload);
          return reply(JSON.stringify({result:'OK'}));
     },
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
