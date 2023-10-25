import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.h1`
  color: #0074e4;
  text-align: center;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #0074e4;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s;
  &:focus {
    border-color: #0074e4;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #0074e4;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  text-align: center;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SignupPage = styled.div`
  text-align: center;
  margin-top: 16px;
`;