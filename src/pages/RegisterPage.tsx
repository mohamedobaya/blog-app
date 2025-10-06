import RegisterFrom from "../components/form/RegisterForm";

interface Props {
  theme: string;
}

const RegisterPage = ({ theme }: Props) => {
  return <RegisterFrom theme={theme} />;
};

export default RegisterPage;
