export const GenerateAuthError = (message) => {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Пользователя с такими данными не существует!";
        case "INVALID_PASSWORD":
            return "Неправильный email или пароль";
        case "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
};
