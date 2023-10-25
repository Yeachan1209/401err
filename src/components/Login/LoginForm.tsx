import { Label, Input, Button } from '../../styles/Loginstyled';

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => void;
}

function LoginForm({ email, password, setEmail, setPassword, handleLogin }: LoginFormProps) {
  return (
    <div>
      <div>
        <Label>이메일</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label>비밀번호</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={handleLogin}>로그인</Button>
    </div>
  );
}

export default LoginForm;
