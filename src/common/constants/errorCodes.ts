export class ErrorCodes {
    static readonly GENERAL = "GENERAL";
    static readonly NOT_FOUND = "NOT_FOUND";
    static readonly INTERNAL = "INTERNAL";

    static Auth = class {
        static readonly INVALID_PASSWORD = "INVALID_PASSWORD OR LOGIN";
    }

    static User = class {
        static readonly ALREADY_EXISTS = "USER_ALREADY_EXISTS";
    }
}