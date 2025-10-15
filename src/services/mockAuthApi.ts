import type {
  BaseAuth,
  TwoFAuth,
  AuthResponse,
  AuthError,
} from "../types/auth";

const mockUsers = [
  {
    email: "user@example.com",
    password: "user@example.com",
    requires2FA: true,
  },
];

let twoFACode: string = "";
let codeExpiration: Date | null = null;

const generate2FACode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const isCodeExpired = (): boolean => {
  return !codeExpiration || new Date() > codeExpiration;
};

export const mockAuthApi = {
  login: async (credentials: BaseAuth): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find((u) => u.email === credentials.email);

    if (!user) {
      throw {
        message: "Email not found",
        code: "USER_NOT_FOUND",
        field: "email",
      } as AuthError;
    }

    if (user.password !== credentials.password) {
      throw {
        message: "Invalid password",
        code: "INVALID_PASSWORD",
        field: "password",
      } as AuthError;
    }

    if (user.requires2FA) {
      twoFACode = generate2FACode();
      codeExpiration = new Date(Date.now() + 1 * 60 * 1000);

      console.log("2FA Code:", twoFACode);

      return {
        success: true,
        requires2FA: true,
        message: "2FA required",
      };
    }

    return {
      success: true,
      // token: 'mock-jwt-token'
    };
  },

  verify2FA: async (credentials: TwoFAuth): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (isCodeExpired()) {
      throw {
        message: "Code expired",
        code: "CODE_EXPIRED",
      } as AuthError;
    }

    if (credentials.code !== twoFACode) {
      throw {
        message: "Invalid code",
        code: "INVALID_2FA_CODE",
        field: "code",
      } as AuthError;
    }

    twoFACode = "";
    codeExpiration = null;

    return {
      success: true,
      // token: 'mock-jwt-token-2fa'
    };
  },

  requestNew2FACode: async (): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    twoFACode = generate2FACode();
    codeExpiration = new Date(Date.now() + 1 * 60 * 1000);

    console.log("New 2FA Code:", twoFACode);

    return {
      success: true,
      message: "New 2FA code sent",
    };
  },

  get2FAStatus: (): { code: string; isExpired: boolean } => {
    return {
      code: twoFACode,
      isExpired: isCodeExpired(),
    };
  },
};
