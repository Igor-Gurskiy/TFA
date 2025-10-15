import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
`;

export const AuthCard = styled.div`
  background: white;
  padding: 2rem;
  width: 100%;
  max-width: 440px;
`;

export const Header = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-block: 20px;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  background: none;
  border: none;
  cursor: pointer;

`;

export const BackIcon = styled.div<{icon?: string}>`
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  background-image: url(${props => props.icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Logo = styled.div`
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 0.375rem solid #1677ff;
`;

export const LogoText = styled.span`
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 1.25rem;
  margin-left: 0.5rem;
`;

export const Title = styled.h1`
font-family: 'SF Pro Text', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  line-height: 2rem;
  color: rgba(0, 0, 0, 0.88);
  margin-bottom: 1.5rem;
`;

export const Subtitle = styled.p`
  color: rgba(0, 0, 0, 0.88);
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const InputIcon = styled.div<{icon?: string}>`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background-image: url(${props => props.icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 1rem;
  height: 1rem;
  z-index: 1;
  pointer-events: none;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2rem;
  border: 1px solid ${props => props.hasError ? '#ef4444' : '#D9D9D9'};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : '#1677FF'};
    box-shadow: 0 0 0 2px ${props => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(5, 145, 255, 0.1)'};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    color: #D9D9D9;
  }
`;

export const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;

      background-color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.04)' : '#1677FF'};
      color: ${props => props.disabled ? '#D9D9D9' : '#fff'};
      
      &:hover:not(:disabled) {
        background-color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.04)' : '#2563eb'};
      }

`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
`;

export const CodeInputsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 0.25rem;
`;

export const CodeInput = styled.input<{ hasError?: boolean }>`
  flex: 1;
  min-width: 0;
  min-height: 3.75rem;
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid ${props => props.hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 8px;

  &:focus {
    outline: none;
  }
`;