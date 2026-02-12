import { test as base } from '@playwright/test';
import { Application } from '../app';
import { ErrorLogger } from '../utils/error-logger';

type TestFixtures = {
    app: Application;
    errorLogger: ErrorLogger;
};

export const test = base.extend<TestFixtures>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },

    errorLogger: async ({ page }, use, testInfo) => {
        const logger = new ErrorLogger(page, testInfo.title);
        await use(logger);

        logger.printSummary();

        if (logger.hasErrors()) {
            const filePath = await logger.saveToFile();
            if (filePath) {
                console.log(`   Error log saved to: ${filePath}`);
            }
        }
    },
});
