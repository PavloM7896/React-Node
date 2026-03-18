import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(filterBy?: string): Promise<Todo[]> {
    const todos = await this.todoModel.find().sort({ createdAt: -1 }).lean().exec();

    return todos.filter((todo) => {
      if (filterBy === 'open') {
        return !todo.done;
      }
      if (filterBy === 'done') {
        return todo.done;
      }
      return true;
    });
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const text = typeof createTodoDto.text === 'string' ? createTodoDto.text.trim() : '';
    if (!text) {
      throw new BadRequestException('Text is required.');
    }

    const createdTodo = new this.todoModel({ text });
    return createdTodo.save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updates: any = {};
    if (typeof updateTodoDto.text === 'string') {
      updates.text = updateTodoDto.text.trim();
    }
    if (typeof updateTodoDto.done === 'boolean') {
      updates.done = updateTodoDto.done;
    }

    const updatedTodo = await this.todoModel
      .findByIdAndUpdate(id, updates, { new: true, runValidators: true })
      .exec();

    if (!updatedTodo) {
      throw new NotFoundException('Todo not found.');
    }

    return updatedTodo;
  }

  async remove(id: string): Promise<void> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deletedTodo) {
      throw new NotFoundException('Todo not found.');
    }
  }
}
