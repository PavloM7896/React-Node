import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    findAll(filterBy?: string): Promise<import("./schemas/todo.schema").Todo[]>;
    create(createTodoDto: CreateTodoDto): Promise<import("./schemas/todo.schema").Todo>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<import("./schemas/todo.schema").Todo>;
    remove(id: string): Promise<void>;
}
