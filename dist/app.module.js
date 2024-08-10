"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const env_validation_1 = require("./util/env.validation");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const food_module_1 = require("./food/food.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `src/config/env/.${process.env.NODE_ENV}.env`,
                isGlobal: true,
                validate: env_validation_1.validate
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    retryAttempts: config.get('NODE_ENV') === 'prod' ? 10 : 1,
                    type: 'mysql',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USER'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME'),
                    entities: [
                        "dist/**/*.entity.js"
                    ],
                    synchronize: true,
                    logging: true,
                    timezone: 'local',
                })
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            food_module_1.FoodModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map