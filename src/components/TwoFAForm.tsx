import React, { useState, useRef } from 'react';
import { useVerify2FA, useRequestNew2FACode, use2FAStatus } from '../hooks/useAuth';
import {
  CodeInputsContainer,
  CodeInput,
  Button,
  ErrorMessage,
  Title,
  Subtitle,
  Header,
  LogoText,
  Logo,
  BackButton,
  BackIcon
} from '../components/styled/AuthStyled';

interface TwoFAFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const TwoFAForm: React.FC<TwoFAFormProps> = ({ onSuccess, onBack }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const verifyMutation = useVerify2FA();
  const requestNewCodeMutation = useRequestNew2FACode();
  const { data: twoFAStatus } = use2FAStatus();

  const isCodeExpired = twoFAStatus?.isExpired;
  const isCodeComplete = code.every(digit => digit !== '');

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (verifyMutation.error) {
      verifyMutation.reset();
    }

    if (value !== '' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();

      if (verifyMutation.error) {
      verifyMutation.reset();
    }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').split('').slice(0, 6);
    
    const newCode = [...code];
    digits.forEach((digit, index) => {
      newCode[index] = digit;
    });
    setCode(newCode);
    if (verifyMutation.error) {
      verifyMutation.reset();
    }
    const lastFilledIndex = digits.length - 1;
    if (lastFilledIndex < 5) {
      inputsRef.current[lastFilledIndex + 1]?.focus();
    } else {
      inputsRef.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    if (!isCodeComplete) return;

    const verificationCode = code.join('');
    verifyMutation.mutate({ code: verificationCode }, {
      onSuccess: () => {
        onSuccess();
      }
    });
  };

  const handleRequestNewCode = () => {
    requestNewCodeMutation.mutate(undefined, {
      onSuccess: () => {
        setCode(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
      },
      onSettled: () => {
        verifyMutation.reset();
      }
    });
  };

  const getCodeError = (): string | undefined => {
    if (verifyMutation.error?.field === 'code') {
      return verifyMutation.error.message;
    }
    return undefined;
  };

  return (
    <div>
        <Header>
          <BackButton onClick={onBack}>
          <BackIcon icon="/Arrow.svg" />
        </BackButton>
                <Logo></Logo>
                <LogoText>Company</LogoText>
                </Header>
      <Title>Two-Factor Authentication</Title>
      <Subtitle>
        Enter the 6-digit code from the Google Authenticator app
      </Subtitle>

      <div className="mb-6">
        <CodeInputsContainer>
          {code.map((digit, index) => (
            <CodeInput
              key={index}
              ref={el => {
    inputsRef.current[index] = el;
  }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              hasError={!!getCodeError()}
              disabled={verifyMutation.isPending || requestNewCodeMutation.isPending}
              className="focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </CodeInputsContainer>
        
        {getCodeError() && <ErrorMessage>{getCodeError()}</ErrorMessage>}
      </div>

      <div className="space-y-3">
        {!isCodeExpired && isCodeComplete && (
        <Button
          onClick={handleVerify}
          disabled={verifyMutation.isPending}
        >
          {verifyMutation.isPending ? 'Continue...' : 'Continue'}
        </Button>
        )}
        {isCodeExpired && (
          <Button
            onClick={handleRequestNewCode}
            disabled={requestNewCodeMutation.isPending}
          >
            {requestNewCodeMutation.isPending ? 'Get new...' : 'Get new'}
          </Button>
        )}
      </div>
    </div>
  );
};