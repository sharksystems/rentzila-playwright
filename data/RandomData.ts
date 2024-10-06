import { faker } from '@faker-js/faker'

export default class RandomData {
    private randomName: string;
    private randomPhone: string;
    private randomEmail: string;
    private randomPassword: string;

    constructor() {
        this.randomName = faker.person.firstName();
        this.randomPhone = this.generateRandomPhoneNumber();
        this.randomEmail = faker.internet.email();
        this.randomPassword = faker.internet.password();
    }

    get getRandomName() {
        return this.randomName
    }
    get getRandomPhone() {
        return this.randomPhone
    }
    get getRandomEmail() {
        return this.randomEmail
    }
    get getRandomPassword() {
        return this.randomPassword
    }
    generateRandomPhoneNumber(): string {
        const validOperatorCodes = ['50', '63', '66', '67', '68', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
        const operatorCode = faker.helpers.arrayElement(validOperatorCodes);
        const remainingDigits = faker.string.numeric(7);

        return `+380${operatorCode}${remainingDigits}`
    }
    generateLessThan10Symbols(): string {
        const length = faker.number.int({ min: 1, max: 9 });
        return faker.string.alpha(length);
    }
    generate10Symbols(): string {
        return faker.string.alpha(10);
    }
    generate101Symbols(): string {
        return faker.string.alpha(101);
    }
    generate9000Symbols(): string {
        return faker.string.alpha(9000);
    }
    generate9001Symbols(): string {
        return faker.string.alpha(9001);
    }
}