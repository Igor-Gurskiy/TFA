import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { TwoFAForm } from './TwoFAForm';
import { AuthContainer, AuthCard } from '../components/styled/AuthStyled';


export const AuthScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'login' | '2fa' | 'success'>('login');

  const handleLoginSuccess = (requires2FA: boolean) => {
    if (requires2FA) {
      setCurrentStep('2fa');
    } else {
      setCurrentStep('success');
    }
  };

  const handle2FASuccess = () => {
    setCurrentStep('success');
  };

  const handleBackToLogin = () => {
    setCurrentStep('login');
  };

  return (
      <AuthContainer>
        <AuthCard>
          {currentStep === 'login' && (
            <LoginForm onSuccess={handleLoginSuccess} />
          )}

          {currentStep === '2fa' && (
            <TwoFAForm onSuccess={handle2FASuccess} onBack={handleBackToLogin}/>
          )}

          {currentStep === 'success' && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Авторизация прошла успешно, можно перенаправить на домашнюю или еще куда</h2>
              <button
                onClick={handleBackToLogin}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Вернуться к входу
              </button>
            </div>
          )}
        </AuthCard>
      </AuthContainer>
  );
};

export default AuthScreen;