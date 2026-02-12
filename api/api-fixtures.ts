import { test as base } from '@playwright/test';
import { ApiClient } from './api-client';

type ApiFixtures = {
    apiClient: ApiClient;
};

export const apiTest = base.extend<ApiFixtures>({
    apiClient: async ({ request }, use) => {
        const apiClient = new ApiClient(request);
        await use(apiClient);
    },
});

export { expect } from '@playwright/test';
