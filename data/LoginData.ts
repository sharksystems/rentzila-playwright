export default class LoginData {
    private email: string
    private phone: string
    private password: string

    constructor() {
        this.email = process.env.VALID_EMAIL || 'VALID_EMAIL';
        this.phone = process.env.VALID_PHONE || 'VALID_PHONE';
        this.password = process.env.VALID_PASSWORD || 'VALID_PASSWORD';
    }

    get getValidEmail() {
        return this.email;
    }
    get getValidPhoneNumber() {
        return this.phone;
    }
    get getValidPassword() {
        return this.password;
    }

    get phoneWithoutPlus() {
        return this.phone.replace("+", "");
    }
    get phoneWithoutCountryCode() {
        return this.phone.replace("+380", "0");
    }
    get phoneWithoutExtention() {
        return this.phone.replace("+380", "");
    }
    get phoneWithoutLastDigit() {
        return this.phone.slice(0, -1);
    }
    get phoneWithDashes() {
        return this.phone.replace(/(\+380)(\d{2})(\d{3})(\d{4})/, "$1-$2-$3-$4");
    }
    get phoneWithSpaces() {
        return this.phone.replace(/(\+380)(\d{2})(\d{3})(\d{4})/, "$1 $2 $3 $4");
    }
    get phoneWithBrackets() {
        return this.phone.replace(/(\+380)(\d{2})(\d{3})(\d{4})/, "$1($2)$3$4");
    }
    get phoneWithExtraDigit() {
        return this.phone + "0";
    }
    get phoneWithDifferentCountryCode() {
        return this.phone.replace("+380", "+1");
    }
    get phoneWithoutCountryCodeWithBrackets() {
        const phoneWithoutCountryCode = this.phone.slice(3);
        return `(${phoneWithoutCountryCode.slice(0, 2)})${phoneWithoutCountryCode.slice(2)}`;
    }
    get phoneWithElevenNumbers() {
        const phoneWithoutCountryCode = this.phone.slice(3);
        return `${phoneWithoutCountryCode}0`;
    }
    get phoneWithout38() {
        return `+0${this.phone.slice(3)}`;
    }

    get emailWithSpace() {
        return this.email.replace("@", " @");
    }
    get emailInCyrillic() {
        return "еуіегіуккутеяшдф";
    }
    get emailWithoutAt() {
        return this.email.replace("@", "");
    }
    get emailWithoutDot() {
        return this.email.replace(".", "");
    }
    get emailWithoutDomain() {
        return this.email.replace(".com", "");
    }
    get emailWithoutProvider() {
        return this.email.replace("gmail", "");
    }
    get emailWithDoubleAt() {
        return this.email.replace("@", "@@");
    }

    get passwordWithTrailingSpace() {
        return this.password + " ";
    }
    get passwordWithLeadingSpace() {
        return " " + this.password;
    }
    get passwordWithoutUppercase() {
        return this.password.toLowerCase();
    }
    get passwordWithoutLowercase() {
        return this.password.toUpperCase();
    }
    get passwordInCyrillic() {
        return "Еуіегіук10";
    }
}
