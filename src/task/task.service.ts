import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {

  constructor(private readonly prismaService: PrismaService) {

  }

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prismaService.task.create({
      data: {
        text: createTaskDto.text,
        author: createTaskDto.author,
        completed: createTaskDto.completed ?? false,
      },
    });
    return task;
  }

  async findAll() {
    return await this.prismaService.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.task.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.task.delete({
      where: { id },
    });
  }
}
