"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const todo_schema_1 = require("./schemas/todo.schema");
let TodosService = class TodosService {
    constructor(todoModel) {
        this.todoModel = todoModel;
    }
    async findAll(filterBy) {
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
    async create(createTodoDto) {
        const text = typeof createTodoDto.text === 'string' ? createTodoDto.text.trim() : '';
        if (!text) {
            throw new common_1.BadRequestException('Text is required.');
        }
        const createdTodo = new this.todoModel({ text });
        return createdTodo.save();
    }
    async update(id, updateTodoDto) {
        const updates = {};
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
            throw new common_1.NotFoundException('Todo not found.');
        }
        return updatedTodo;
    }
    async remove(id) {
        const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
        if (!deletedTodo) {
            throw new common_1.NotFoundException('Todo not found.');
        }
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(todo_schema_1.Todo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TodosService);
//# sourceMappingURL=todos.service.js.map