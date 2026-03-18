import { Module, OnApplicationShutdown } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer: MongoMemoryServer;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (): Promise<MongooseModuleOptions> => {
        const uriFromEnv = process.env.MONGODB_URI;
        const uri = uriFromEnv ? uriFromEnv.trim() : '';
        let finalUri = uri;

        if (!uri) {
          memoryServer = await MongoMemoryServer.create();
          finalUri = memoryServer.getUri();
        }

        const inMemory = !uri;
        console.log(`MongoDB connected (${inMemory ? 'in-memory' : 'external'})`);
        if (inMemory) {
          console.log(`MongoDB URI: ${finalUri}`);
        }

        return {
          uri: finalUri,
          dbName: 'mern_basics',
        };
      },
    }),
  ],
})
export class DatabaseModule implements OnApplicationShutdown {
  async onApplicationShutdown(signal?: string) {
    if (memoryServer) {
      await memoryServer.stop();
      memoryServer = undefined;
    }
  }
}
