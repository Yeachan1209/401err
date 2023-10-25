import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../components/Signup/User';
import VerificationCodeForm from '../components/Signup/Verification';
import { Container, Header, SuccessMessage, Button, LoginBack } from '../styles/Signupstyled';
import axios from 'axios';
import styled from 'styled-components';

type User = {
  confirmPassword: any;
  email: string;
  password: string;
  username: string;
};

function Signup() {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordsMatching, setIsPasswordsMatching] = useState(true);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationCodeValid, setIsVerificationCodeValid] = useState(false);
  const [verificationRequested, setVerificationRequested] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    if (name === 'email') {
      setIsEmailValid(validateEmail(value));
    }
    if (name === 'password') {
      setIsPasswordValid(validatePassword(value));
      if (user.confirmPassword) {
        setIsPasswordsMatching(user.confirmPassword === value);
      }
    }
    if (name === 'confirmPassword') {
      if (user.password) {
        setIsPasswordsMatching(user.password === value);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('http://localhost:3002/send-verification-email', { email: user.email });
      if (response.status === 200) {
        setVerificationRequested(true);
      }
    } catch (error) {
      console.error('이메일 전송 오류:', error);
    }
  };

  const checkDuplicate = async () => {
    try {
      const response = await axios.post('http://localhost:3002/check-duplicate', {
        email: user.email,
        username: user.username,
      });

      if (response.status === 200) {
        const { emailExists, usernameExists } = response.data;

        if (emailExists) {
          alert('이미 동일한 이메일이 존재합니다.');
        }
        if (usernameExists) {
          alert('이미 동일한 닉네임이 존재합니다.');
        }

        if (!emailExists && !usernameExists) {
          handleSignUp();
        }
      } else {
        console.error('중복 확인 오류:', response.data.error);
        alert('중복 확인 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('중복 확인 중 오류:', error);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSignUp = async () => {
    if (isEmailValid && isPasswordValid && isPasswordsMatching && user.email && user.password) {
      try {
        const response = await axios.post('http://localhost:3002/signup', user);

        if (response.status === 200) {
          setIsSignUpSuccessful(true);
          alert('회원가입이 완료되었습니다.');
        } else {
          console.error('회원가입 오류:', response.data.error);
          alert('회원가입 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('회원가입 중 오류:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      }
    } else {
      alert('양식을 올바르게 작성해주세요.');
    }
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setVerificationCode(code);
    setIsVerificationCodeValid(true);
  };

  const HomeLink = styled(Link)`
    text-decoration: none;
    color: inherit;
  `;

  return (
    <Container>
      <Header>
        <HomeLink to="/">우리 학교 알리미</HomeLink>
        <br />회원가입
      </Header>
      {isSignUpSuccessful ? (
        <SuccessMessage>회원가입 완료<br/><Link to="/login">로그인 창으로</Link></SuccessMessage>
      ) : (
        <div>
          <UserForm
            user={user}
            handleInputChange={handleInputChange}
            isEmailValid={isEmailValid}
            isPasswordValid={isPasswordValid}
            isPasswordsMatching={isPasswordsMatching}
          />
          {verificationRequested ? (
            <VerificationCodeForm
              verificationRequested={verificationRequested}
              verificationCode={verificationCode}
              handleVerificationCodeChange={handleVerificationCodeChange}
              isVerificationCodeValid={isVerificationCodeValid}
            />
          ) : (
            <VerificationCodeForm
              verificationRequested={verificationRequested}
              verificationCode={verificationCode}
              handleVerificationCodeChange={handleVerificationCodeChange}
              isVerificationCodeValid={isVerificationCodeValid}
            />
          )}
          <Button onClick={sendVerificationCode}>
            인증번호 요청
          </Button>
          <Button onClick={checkDuplicate}>
            회원가입
          </Button>
          <LoginBack>
            <br />
            이미 계정이 있으신가요? <Link to="/Login">로그인</Link>
          </LoginBack>
        </div>
      )}
    </Container>
  );
}

export default Signup;
