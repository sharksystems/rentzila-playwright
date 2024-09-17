import { APIRequestContext, expect } from '@playwright/test';

let adminAccessToken = null;

export class ApiHelper {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createAdminAccessToken() {
        if (adminAccessToken == null) {
            await this.request.post("https://dev.rentzila.com.ua/api/auth/jwt/create/", {
                data: {
                    email: process.env.ADMIN_EMAIL || 'ADMIN_EMAIL',
                    password: process.env.ADMIN_PASSWORD || 'ADMIN_PASSWORD',
                }
            }).then(async (response) => {
                adminAccessToken = (await response.json()).access;
            });
        }
        return adminAccessToken;
    }

    async getCallBackFormSubmission(token, expectedName: string, expectedPhone: string) {
        const response = await this.request.get('https://dev.rentzila.com.ua/api/backcall/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const responseBody = await response.json();

        const submission = responseBody.find((form: { name: string; phone: string; }) =>
            form.name === expectedName && form.phone === expectedPhone
        );

        return submission;
    }

    async deleteCallbackFormSubmission(token, submissionId: number) {
        const response = await this.request.delete(`https://dev.rentzila.com.ua/api/backcall/${submissionId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(204);
    }
}