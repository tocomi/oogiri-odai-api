import cors from "@fastify/cors"
import Fastify from "fastify"
import { getOdaiSuggestions } from "./getOdaiSuggestions"

const port = process.env.PORT ? Number(process.env.PORT) : 3000
const host = "RENDER" in process.env ? "0.0.0.0" : "localhost"
;(async () => {
  const fastify = Fastify({
    logger: true,
  })
  await fastify.register(cors, {})

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

  fastify.listen({ host, port }, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
})()
