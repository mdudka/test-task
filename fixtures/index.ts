import { test as base } from '@playwright/test';
import { Application } from '../app';

type TestFixtures = {
    app: Application;
};

export const test = base.extend<TestFixtures>({
    app: async ({ page }, use) => {
        const app = new Application(page);
        await use(app);
    },
});
