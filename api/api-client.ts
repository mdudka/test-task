import { APIRequestContext } from '@playwright/test';

export class ApiClient {
    constructor(private request: APIRequestContext) {}

    async getAllProductsList() {
        return await this.request.get('/api/productsList');
    }

    async getAllBrandsList() {
        return await this.request.get('/api/brandsList');
    }

    async searchProduct(searchTerm: string) {
        return await this.request.post('/api/searchProduct', {
            form: {
                search_product: searchTerm,
            },
        });
    }

    async verifyLogin(email: string, password: string) {
        return await this.request.post('/api/verifyLogin', {
            form: {
                email: email,
                password: password,
            },
        });
    }

    async createAccount(
        name: string,
        email: string,
        password: string,
        title: string,
        birth_date: string,
        birth_month: string,
        birth_year: string,
        firstname: string,
        lastname: string,
        company: string,
        address1: string,
        address2: string,
        country: string,
        zipcode: string,
        state: string,
        city: string,
        mobile_number: string,
    ) {
        return await this.request.post('/api/createAccount', {
            form: {
                name,
                email,
                password,
                title,
                birth_date,
                birth_month,
                birth_year,
                firstname,
                lastname,
                company,
                address1,
                address2,
                country,
                zipcode,
                state,
                city,
                mobile_number,
            },
        });
    }

    async deleteAccount(email: string, password: string) {
        return await this.request.delete('/api/deleteAccount', {
            form: {
                email,
                password,
            },
        });
    }

    async updateAccount(
        name: string,
        email: string,
        password: string,
        title: string,
        birth_date: string,
        birth_month: string,
        birth_year: string,
        firstname: string,
        lastname: string,
        company: string,
        address1: string,
        address2: string,
        country: string,
        zipcode: string,
        state: string,
        city: string,
        mobile_number: string,
    ) {
        return await this.request.put('/api/updateAccount', {
            form: {
                name,
                email,
                password,
                title,
                birth_date,
                birth_month,
                birth_year,
                firstname,
                lastname,
                company,
                address1,
                address2,
                country,
                zipcode,
                state,
                city,
                mobile_number,
            },
        });
    }

    async getUserDetailByEmail(email: string) {
        return await this.request.get('/api/getUserDetailByEmail', {
            params: {
                email,
            },
        });
    }
}
