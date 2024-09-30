export enum ErrorMessages {
    FIELD_EMPTY = "Поле не може бути порожнім",
    PHONE_INVALID = "Телефон не пройшов валідацію",
    NAME_TOO_SHORT = "Ім'я має містити щонайменше дві літери",

    WRONG_EMAIL_OR_PASSWORD = "Невірний e-mail або пароль",
    WRONG_PHONE_OR_PASSWORD = "Невірний номер телефону або пароль",
    EMAIL_OR_PHONE_INVALID_FORMAT = "Неправильний формат email або номера телефону",
    PASSWORD_INVALID_FORMAT = "Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли",

    FIELD_REQUIRED = "Це поле обов’язкове",
    LISTING_TITLE_TOO_SHORT = "У назві оголошення повинно бути не менше 10 символів",
    LISTING_TITLE_TOO_LONG = "У назві оголошення може бути не більше 100 символів",
    MODEL_NAME_TOO_LONG = "У назві моделі може бути не більше 15 символів",
    LOCATION_NOT_SELECTED = "Виберіть коректне місце на мапі України"
}