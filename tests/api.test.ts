import { apiTest, expect } from '../api/api-fixtures';

apiTest.describe('API Tests - Products', () => {
    const BASE_URL = 'https://automationexercise.com';

    apiTest.use({
        baseURL: BASE_URL,
    });

    apiTest('Positive: Should successfully retrieve all products list', async ({ apiClient }) => {
        const response = await apiClient.getAllProductsList();

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.products).toBeDefined();
        expect(Array.isArray(responseBody.products)).toBeTruthy();
        expect(responseBody.products.length).toBeGreaterThan(0);

        const firstProduct = responseBody.products[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('brand');
        expect(firstProduct).toHaveProperty('category');
    });

    apiTest('Negative: Should return error when searching without required parameter', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/api/searchProduct`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toContain('Bad request');
    });
});

apiTest.describe('API Tests - Brands', () => {
    const BASE_URL = 'https://automationexercise.com';

    apiTest.use({
        baseURL: BASE_URL,
    });

    apiTest('Positive: Should successfully retrieve all brands list', async ({ apiClient }) => {
        const response = await apiClient.getAllBrandsList();

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.brands).toBeDefined();
        expect(Array.isArray(responseBody.brands)).toBeTruthy();
        expect(responseBody.brands.length).toBeGreaterThan(0);

        const firstBrand = responseBody.brands[0];
        expect(firstBrand).toHaveProperty('id');
        expect(firstBrand).toHaveProperty('brand');
        expect(typeof firstBrand.id).toBe('number');
        expect(typeof firstBrand.brand).toBe('string');
    });
});

apiTest.describe('API Tests - User Authentication', () => {
    const BASE_URL = 'https://automationexercise.com';

    apiTest.use({
        baseURL: BASE_URL,
    });

    apiTest('Negative: Should return error for login with invalid credentials', async ({ apiClient }) => {
        const response = await apiClient.verifyLogin('invalid@email.com', 'wrongpassword');

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(404);
        expect(responseBody.message).toBe('User not found!');
    });

    apiTest('Negative: Should return error for login without email parameter', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/api/verifyLogin`, {
            form: {
                password: 'somepassword',
            },
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(400);
        expect(responseBody.message).toContain('Bad request');
    });
});
