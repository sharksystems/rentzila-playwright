import { APIRequestContext, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const baseURL = process.env.BASE_URL || 'BASE_URL';
let adminAccessToken = null;
let accessToken = null;

export class ApiHelper {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createAdminAccessToken() {
        if (adminAccessToken == null) {
            await this.request.post(`${baseURL}/api/auth/jwt/create/`, {
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

    async createAccessToken() {
        if (accessToken == null) {
            await this.request.post(`${baseURL}/api/auth/jwt/create/`, {
                data: {
                    email: process.env.VALID_EMAIL || 'VALID_EMAIL',
                    password: process.env.VALID_PASSWORD || 'VALID_PASSWORD',
                }
            }).then(async (response) => {
                accessToken = (await response.json()).access;
            });
        }
        return accessToken;
    }

    async createUnit(token, unitName: string, imageName: string) {
        const payload = {
            "category": 85,
            "description": "Listing Description",
            "features": "Features",
            "first_name": "",
            "last_name": "",
            "lat": 50.453,
            "lng": 30.516,
            "manufacturer": 203,
            "minimal_price": 12222,
            "model_name": "Model Name",
            "money_value": "UAH",
            "name": unitName,
            "owner": process.env.UNIT_OWNER_ID,
            "payment_method": "CASH_OR_CARD",
            "phone": "",
            "services": [
                144
            ],
            "time_of_work": "",
            "type_of_work": "HOUR"
        }

        const response = await this.request.post(`${baseURL}/api/units/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: payload
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        const unitId = responseBody.id;
        const isActiveStatus = responseBody.is_active;

        expect(isActiveStatus).toBe(undefined);

        const imagePath = path.resolve('data/files/images/', imageName);
        const imageReadStream = fs.createReadStream(imagePath);

        const imageResponse = await this.request.post(`${baseURL}/api/unit-images/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            multipart: {
                unit: unitId.toString(),
                image: imageReadStream,
                is_main: 'true'
            }
        });

        expect(imageResponse.status()).toBe(201);

        return unitId;
    }

    async setUnitActiveStatus(token, unitId: number) {
        const response = await this.request.patch(`${baseURL}/api/crm/units/${unitId}/moderate/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                is_approved: true
            }
        });

        expect(response.status()).toBe(200);

        const updatedResponse = await response.json();
        expect(updatedResponse.is_approved).toBe(true);

        return updatedResponse;
    }

    async deleteUnit(token, unitId: number) {
        const response = await this.request.delete(`${baseURL}/api/crm/units/${unitId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(204);
    }

    async getCallBackFormSubmission(token, expectedName: string, expectedPhone: string) {
        const response = await this.request.get(`${baseURL}/api/backcall/`, {
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

    async getUserGeneratedCategory(token, expectedName: string) {
        const response = await this.request.get(`${baseURL}/api/services/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const responseBody = await response.json();

        const submission = responseBody.find((form: { name: string; }) =>
            form.name === expectedName
        );

        return submission;
    }

    async deleteUserSubmittedCategory(token, submissionId: number) {
        const response = await this.request.delete(`${baseURL}/api/crm/services/${submissionId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(204);
    }

    async deleteCallbackFormSubmission(token, submissionId: number) {
        const response = await this.request.delete(`${baseURL}/api/backcall/${submissionId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(204);
    }
}