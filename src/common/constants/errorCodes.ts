export class ErrorCodes {
    static readonly GENERAL = "GENERAL";
    static readonly NOT_FOUND = "NOT_FOUND";
    static readonly INTERNAL = "INTERNAL";

    static Auth = class {
        static readonly INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
        static readonly INVALID_REFRESH_TOKEN = "INVALID_REFRESH_TOKEN";
    }

    static User = class {
        static readonly ALREADY_EXISTS = "USER_ALREADY_EXISTS";
    }
}