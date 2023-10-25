import React from 'react';
import { Label, Input, ErrorMessage } from '../../styles/Signupstyled';

type VerificationCodeFormProps = {
  verificationRequested: boolean;
  verificationCode: string;
  handleVerificationCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isVerificationCodeValid: boolean;
};

const VerificationCodeForm: React.FC<VerificationCodeFormProps> = ({ verificationRequested, verificationCode, handleVerificationCodeChange, isVerificationCodeValid }) => {
  return (
    <div>
      <Label htmlFor="verificationCode">인증 코드</Label>
      <Input
        type="text"
        name="verificationCode"
        id="verificationCode"
        value={verificationCode}
        onChange={handleVerificationCodeChange}
      />
      {!isVerificationCodeValid && (
        <ErrorMessage>올바른 인증 코드를 입력하세요.</ErrorMessage>
      )}
    </div>
  );
}

export default VerificationCodeForm;
