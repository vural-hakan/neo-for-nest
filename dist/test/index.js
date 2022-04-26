"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResult = exports.mockRelationship = exports.mockNode = exports.nodeId = void 0;
const neo4j_driver_1 = require("neo4j-driver");
const graph_types_1 = require("neo4j-driver-core/lib/graph-types");
let _nodeId = 0;
let _relationshipId = 0;
const nodeId = () => {
    _nodeId++;
    return neo4j_driver_1.int(_nodeId);
};
exports.nodeId = nodeId;
const mockNode = (labels, properties = {}) => {
    return new graph_types_1.Node(exports.nodeId(), Array.isArray(labels) ? labels : [labels], properties);
};
exports.mockNode = mockNode;
const mockRelationship = (type, properties, start, end) => {
    _relationshipId++;
    return new graph_types_1.Relationship(neo4j_driver_1.int(_relationshipId), start instanceof graph_types_1.Node ? start.identity : exports.nodeId(), end instanceof graph_types_1.Node ? end.identity : exports.nodeId(), type, properties);
};
exports.mockRelationship = mockRelationship;
const mockResult = (rows) => {
    return {
        records: rows.map((row) => ({
            keys: Object.keys(row),
            get: (key) => (row.hasOwnProperty(key) ? row[key] : null),
        })),
    };
};
exports.mockResult = mockResult;
//# sourceMappingURL=index.js.map