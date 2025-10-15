import React, { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import type { BaseAuth } from "../types/auth";
import {
  Input,
  Button,
  ErrorMessage,
  Title,
  Header,
  Logo,
  LogoText,
  InputWrapper,
  InputIcon,
} from "../components/styled/AuthStyled";

interface LoginFormProps {
  onSuccess: (requires2FA: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [credentials, setCredentials] = useState<BaseAuth>({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        onSuccess(data.requires2FA || false);
      },
    });
  };

  const getFieldError = (field: "email" | "password"): string | undefined => {
    if (loginMutation.error?.field === field) {
      return loginMutation.error.message;
    }
    return undefined;
  };

  const isFormValid = credentials.email && credentials.password;
  const visiblePassword =
    credentials.password.length === 0
      ? ""
      : "*".repeat(credentials.password.length);
  return (
    <div>
      <Header>
        <Logo></Logo>
        <LogoText>Company</LogoText>
      </Header>
      <Title>Sign in to your account to continue</Title>

      <form onSubmit={handleSubmit} className="space-y-4">
        {loginMutation.error && !loginMutation.error.field && (
          <ErrorMessage>{loginMutation.error.message}</ErrorMessage>
        )}

        <InputWrapper>
          <InputIcon icon="/email.svg" />
          <Input
            id="email"
            type="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }
            hasError={!!getFieldError("email")}
            placeholder="Email"
            disabled={loginMutation.isPending}
          />
        </InputWrapper>
        {getFieldError("email") && (
          <ErrorMessage>{getFieldError("email")}</ErrorMessage>
        )}

        <InputWrapper>
          <InputIcon icon="/lock.svg" />
          <Input
            id="password"
            value={visiblePassword}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            hasError={!!getFieldError("password")}
            placeholder="Password"
            disabled={loginMutation.isPending}
          />
        </InputWrapper>

        {getFieldError("password") && (
          <ErrorMessage>{getFieldError("password")}</ErrorMessage>
        )}

        <Button
          type="submit"
          disabled={!isFormValid || loginMutation.isPending}
        >
          {loginMutation.isPending ? "Log in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
};
