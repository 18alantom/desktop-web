require('dotenv').config();
const path = require('path');
const Fastify = require('fastify').default;
const cors = require('@fastify/cors').default;
const fastify = Fastify({ logger: process.env.MODE === 'development' });

const { Database } = require('../backend-common/database');
const database = new Database(process.env.DB_PATH);

if (process.env.MODE === 'development') {
  fastify.register(cors, {
    origin: [
      `http://0.0.0.0:${process.env.VITE_PORT_FRONTEND}`,
      `http://localhost:${process.env.VITE_PORT_FRONTEND}`,
    ],
  });
} else {
  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'dist'),
  });

  fastify.get('/', (_, reply) => reply.sendFile('index.html'));
}

// Create
fastify.put('/api', async (request, reply) => {
  const { name } = JSON.parse(request.body);
  reply.send(await database.create(name));
});

// Read
fastify.get('/api', async (_, reply) => {
  reply.send(await database.read());
});

// Update
fastify.post('/api', async (request, reply) => {
  const { name, value } = JSON.parse(request.body);
  reply.send(await database.update(name, value));
});

// Delete
fastify.delete('/api', async (request, reply) => {
  const { name } = JSON.parse(request.body);
  reply.send(await database.delete(name));
});

const port = process.env.VITE_PORT_SERVER;
console.log(`listening on ${port}`);
fastify.listen({ port });
