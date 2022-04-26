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
exports.Neo4jService = void 0;
const common_1 = require("@nestjs/common");
const neo4j_driver_1 = require("neo4j-driver");
const neo4j_constants_1 = require("./neo4j.constants");
const transaction_1 = require("neo4j-driver-core/lib/transaction");
let Neo4jService = class Neo4jService {
    constructor(config, driver) {
        this.driver = driver;
        this.config = config;
    }
    getDriver() {
        return this.driver;
    }
    getConfig() {
        return this.config;
    }
    int(value) {
        return neo4j_driver_1.int(value);
    }
    beginTransaction(database) {
        const session = this.getWriteSession(database);
        return session.beginTransaction();
    }
    getReadSession(database) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j_driver_1.default.session.READ,
        });
    }
    getWriteSession(database) {
        return this.driver.session({
            database: database || this.config.database,
            defaultAccessMode: neo4j_driver_1.default.session.WRITE,
        });
    }
    read(cypher, params, databaseOrTransaction) {
        if (databaseOrTransaction instanceof transaction_1.default) {
            return databaseOrTransaction.run(cypher, params);
        }
        const session = this.getReadSession(databaseOrTransaction);
        return session.run(cypher, params);
    }
    write(cypher, params, databaseOrTransaction) {
        if (databaseOrTransaction instanceof transaction_1.default) {
            return databaseOrTransaction.run(cypher, params);
        }
        const session = this.getWriteSession(databaseOrTransaction);
        return session.run(cypher, params);
    }
    onApplicationShutdown() {
        return this.driver.close();
    }
};
Neo4jService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(neo4j_constants_1.NEO4J_OPTIONS)),
    __param(1, common_1.Inject(neo4j_constants_1.NEO4J_DRIVER)),
    __metadata("design:paramtypes", [Object, Object])
], Neo4jService);
exports.Neo4jService = Neo4jService;
//# sourceMappingURL=neo4j.service.js.map