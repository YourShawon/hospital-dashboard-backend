// Test setup file - runs before all tests
import logger from "../src/common/utils/logger";

// Silence logs during tests (keeps test output clean)
beforeAll(() => {
  logger.silent = true;
});

afterAll(() => {
  logger.silent = false;
});
