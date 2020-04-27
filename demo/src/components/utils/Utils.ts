const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_MIN_LENGTH = 8;

export function isEmailValid(email: string): boolean {
    return EMAIL_REGEXP.test(email);
}

export function isPasswordValid(password: string): boolean {
    return password !== undefined && password.length >= PASSWORD_MIN_LENGTH;
}
