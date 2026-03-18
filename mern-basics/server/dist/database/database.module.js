"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_memory_server_1 = require("mongodb-memory-server");
let memoryServer;
let DatabaseModule = class DatabaseModule {
    async onApplicationShutdown(signal) {
        if (memoryServer) {
            await memoryServer.stop();
            memoryServer = undefined;
        }
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async () => {
                    const uriFromEnv = process.env.MONGODB_URI;
                    const uri = uriFromEnv ? uriFromEnv.trim() : '';
                    let finalUri = uri;
                    if (!uri) {
                        memoryServer = await mongodb_memory_server_1.MongoMemoryServer.create();
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
], DatabaseModule);
//# sourceMappingURL=database.module.js.map