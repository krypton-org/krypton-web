/**
 * Module defining common error that can be raised by normal service usage..
 * @module ErrorTypes;'
 */

/**
 * Common errors raised by functions under certain conditions. Should be handled within the application.
 * @class
 * @classdesc Common errors raised by system.
 */
export default class KryptonError extends Error {
    public message: string;

    constructor(message: string, type?: string) {
        super();
        this.message = message;
    }
}

/**
 * Email already exists in the database.
 * @export
 * @class EmailAlreadyExistsError
 * @extends {KryptonError}
 */
export class EmailAlreadyExistsError extends KryptonError {}

/**
 * Password does not match.
 * @export
 * @class WrongPasswordError
 * @extends {KryptonError}
 */
export class WrongPasswordError extends KryptonError {}

/**
 * Account recorery email too old
 * @export
 * @class UpdatePasswordTooLateError
 * @extends {KryptonError}
 */
export class UpdatePasswordTooLateError extends KryptonError {}

/**
 * Email could not be sent.
 * @export
 * @class EmailNotSentError
 * @extends {KryptonError}
 */
export class EmailNotSentError extends KryptonError {}

/**
 * User not found.
 * @export
 * @class UserNotFoundError
 * @extends {KryptonError}
 */
export class UserNotFoundError extends KryptonError {}

/**
 * Request not authorized.
 * @export
 * @class UnauthorizedError
 * @extends {KryptonError}
 */
export class UnauthorizedError extends KryptonError {}

/**
 * User token encryption failed.
 * @export
 * @class TokenEncryptionError
 * @extends {KryptonError}
 */
export class TokenEncryptionError extends KryptonError {}

/**
 * Email already confirmed.
 * @export
 * @class EmailAlreadyConfirmedError
 * @extends {KryptonError}
 */
export class EmailAlreadyConfirmedError extends KryptonError {}

/**
 * User updates do not pass the fields' validator.
 * @export
 * @class UserValidationError
 * @extends {KryptonError}
 */
export class UserValidationError extends KryptonError {}

/**
 * User already logged in.
 * @export
 * @class AlreadyLoggedInError
 * @extends {KryptonError}
 */
export class AlreadyLoggedInError extends KryptonError {}

/**
 * Encryption failed.
 * @export
 * @class EncryptionFailedError
 * @extends {KryptonError}
 */
export class EncryptionFailedError extends KryptonError {}
