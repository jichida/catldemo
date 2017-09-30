const Hapi = require('hapi');
const jsondata = require('./data.js');
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    routes: { cors: true },
    host: 'localhost',
    port: 8000
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
      return reply(JSON.stringify({list:jsondata}));
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
