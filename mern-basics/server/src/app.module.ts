import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TodosModule } from './todos/todos.module';
import { HealthController } from './health.controller';

@Module({
  imports: [DatabaseModule, TodosModule],
  controllers: [HealthController],
})
export class AppModule {}
