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
  if (!request.query.keyword) {
    reply.code(400)
    return { message: "keyword is required" }
  }
  const odaiSuggestions = await getOdaiSuggestions(request.query.keyword)
  reply.send(odaiSuggestions)
})

// Run the server!
fastify.listen({ port: 10000 }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
