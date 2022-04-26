"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDriver = void 0;
const neo4j_driver_1 = require("neo4j-driver");
const createDriver = async (config) => {
    const driver = neo4j_driver_1.default.driver(`${config.scheme}://${config.host}:${config.port}`, neo4j_driver_1.default.auth.basic(config.username, config.password));
    await driver.verifyConnectivity();
    return driver;
};
exports.createDriver = createDriver;
//# sourceMappingURL=neo4j.utils.js.map