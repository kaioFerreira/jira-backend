import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { Task } from '../models/Task'

export async function usersRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    // await request.jwtVerify()
  })

  app.get('/task', async () => {
    return await Task.index()
  })

  app.get('/task/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    return await Task.show(id)
  })

  app.post('/task', async (request) => {
    const bodySchema = z.object({
      title: z.string().nonempty('O titulo é obrigatorio'),
      description: z.string().nonempty('A descrição é obrigatoria'),
      priority: z.string(),
      avatar: z.string().url(),
      status: z.number(),
      responsible: z.string().nonempty('O responsavel é obrigatorio')
    })

    const { title, description, avatar,  status, priority, responsible } = bodySchema.parse(request.body)

    const task = await Task.create({
      title,
      description,
      status,
      avatar,
      priority,
      responsible
    })

    return task
  })

  app.put('/task/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const bodySchema = z.object({
      title: z.string().nonempty('O titulo é obrigatorio'),
      description: z.string().nonempty('A descrição é obrigatoria'),
      priority: z.string(),
      avatar: z.string().url(),
      status: z.number(),
      responsible: z.string().nonempty('O responsavel é obrigatorio')
    })

    const { id } = paramsSchema.parse(request.params)
    const { title, description, avatar,  status, priority, responsible } = bodySchema.parse(request.body)

    return await Task.update(id, {
      title, 
      description, 
      avatar, 
      status,
      priority, 
      responsible
    })
  })

  app.delete('/task/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await Task.delete(id)
  })

}
