import { faker } from '@faker-js/faker'

export default class RandomData {
    randomName: string;
    randomPhone: string;

    constructor() {
        this.randomName = faker.person.firstName();
        this.randomPhone = this.generateRandomPhoneNumber();
    }

    get getRandomName() {
        return this.randomName
    }
    get getRandomPhone() {
        return this.randomPhone
    }
    generateRandomPhoneNumber(): string {
        const validOperatorCodes = ['50', '63', '66', '67', '68', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
        const operatorCode = faker.helpers.arrayElement(validOperatorCodes);
        const remainingDigits = faker.string.numeric(7);

        return `+380${operatorCode}${remainingDigits}`
    }
}