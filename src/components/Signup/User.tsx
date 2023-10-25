import React from 'react';
import { Input, Label, ErrorMessage } from '../../styles/Signupstyled';

type UserFormProps = {
  user: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isPasswordsMatching: boolean;
};

const UserForm: React.FC<UserFormProps> = ({ user, handleInputChange, isEmailValid, isPasswordValid, isPasswordsMatching }) => {
  return (
    <div>
      <div>
        <Label htmlFor="email">이메일</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleInputChange}
        />
        {!isEmailValid && (
          <ErrorMessage>유효한 이메일을 입력하세요.</ErrorMessage>
        )}
      </div>
      <div>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleInputChange}
        />
        {!isPasswordValid && (
          <ErrorMessage>최소 8자, 영문과 숫자를 포함해야 합니다.</ErrorMessage>
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={user.confirmPassword}
          onChange={handleInputChange}
        />
        {!isPasswordsMatching && (
          <ErrorMessage>비밀번호와 비밀번호 확인이 일치하지 않습니다.</ErrorMessage>
        )}
      </div>
      <div>
        <Label htmlFor="username">닉네임</Label>
        <Input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default UserForm;
