const Fastify = require('fastify').default;
const cors = require('@fastify/cors').default;
const fastify = Fastify({ logger: true });

const { Database } = require('../backend-common/database');
const database = new Database();

fastify.register(cors, {
  origin: 'http://0.0.0.0:3000',
});

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

fastify.listen({ port: 3030 });