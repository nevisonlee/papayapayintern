"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const product_module_1 = require("./product/product.module");
const auth_module_1 = require("./auth/auth.module");
const mongoose_2 = __importDefault(require("mongoose"));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule, auth_module_1.AuthModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const uri = configService.get('MONGODB_URI');
                    if (!uri) {
                        console.error('MONGODB_URI is not defined in the .env file');
                        process.exit(1);
                    }
                    try {
                        await mongoose_2.default.connect(uri);
                        console.log('Connected to database!');
                    }
                    catch (error) {
                        console.error('Database connection failed:', error);
                        process.exit(1);
                    }
                    return { uri };
                },
            }),
            product_module_1.ProductModule,
        ],
    })
], AppModule);
