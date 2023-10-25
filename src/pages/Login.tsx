import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Header, SignupPage } from '../styles/Loginstyled';
import LoginForm from '../components/Login/LoginForm';
import styled from 'styled-components';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; email: string } | null>(null);

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await axios.post('http://localhost:3002/login', { email, password });

        if (response.status === 200) {
          const token = response.data.token;

          if (token) {
            localStorage.setItem('userToken', token);

            console.log('로그인 성공.');
            navigate('/'); 
          } else {
            alert('이메일 또는 비밀번호가 잘못되었습니다.');
          }
        } else {
          alert('이메일 또는 비밀번호가 잘못되었습니다.');
        }
      } catch (error) {
        console.error('로그인 중 오류:', error);
        alert('로그인 중 오류가 발생했습니다.');
      }
    } else {
      alert('이메일과 비밀번호를 입력해주세요.');
    }
  }

  const HomeLink = styled(Link)`
    text-decoration: none; 
    color: inherit; 
  `;

  return (
    <Container>
      <Header>
        <HomeLink to="/">우리 학교 알리미</HomeLink>
        <br />로그인
      </Header>
      <LoginForm
        email={email}
        password={password}
        setEmail={(value) => setEmail(value)} 
        setPassword={(value) => setPassword(value)}
        handleLogin={handleLogin}
      />
      <SignupPage>아직 계정이 없으신가요? <Link to="/Signup">회원가입</Link></SignupPage>

      {loggedInUser && loggedInUser.username ? (
        <div>
          <p>로그인 성공! 사용자 정보: {loggedInUser.username} ({loggedInUser.email})</p>
        </div>
      ) : null}
    </Container>
  );
}

export default LoginPage;
