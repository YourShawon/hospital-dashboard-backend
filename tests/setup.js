"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Test setup file - runs before all tests
const logger_1 = __importDefault(require("../src/common/utils/logger"));
// Silence logs during tests (keeps test output clean)
beforeAll(() => {
    logger_1.default.silent = true;
});
afterAll(() => {
    logger_1.default.silent = false;
});
//# sourceMappingURL=setup.js.map