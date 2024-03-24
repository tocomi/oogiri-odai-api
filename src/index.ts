import Fastify from "fastify"
import { getOdaiSuggestions } from "./getOdaiSuggestions"

const fastify = Fastify({
  logger: true,
})

// Declare a route
fastify.get<{
  Querystring: {
    keyword: string
  }
}>("/", async (request, reply) => {
  const odaiSuggestions = await getOdaiSuggestions(request.query.keyword)
  reply.send(odaiSuggestions)
})

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
