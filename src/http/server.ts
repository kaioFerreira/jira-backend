import { app } from '../app'
import { env } from "../env";
import cors from '@fastify/cors'

import { usersRoutes } from '../routes/users.routes'

app.register(usersRoutes)

app.register(cors, {
  origin: true,
})

app.listen({
      host: "0.0.0.0",
  port: env.PORT,
}).then(() => {
  console.log('🚀 HTTP Server Running port 3333!')
})