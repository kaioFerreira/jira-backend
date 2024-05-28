import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ITaskData {
  title: string,
  description: string,
  responsible: string,
  avatar: string,
  priority: string,
  status: number,
}

export class Task {
  static async create(data: ITaskData) {
    return await prisma.task.create({data})
  }

  static async index() {
    return prisma.task.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
  }

  static async show(id: string) {
    return prisma.task.findUniqueOrThrow({
      where: {
        id,
      },
    })
  }

  static async delete(id: string) {
    return prisma.task.delete({
      where: {
        id,
      },
    })
  }

  static async update(id: string, data: ITaskData) {
    return await prisma.task.update({
      where: {
        id,
      },
      data,
    })
  }
}
