import LoginFrom from "../components/form/LoginForm";

interface Props {
  theme: string;
}

const LoginPage = ({ theme }: Props) => {
  return <LoginFrom theme={theme} />;
};

export default LoginPage;
