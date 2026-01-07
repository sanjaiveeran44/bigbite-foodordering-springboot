import RegisterHeader from "../components/RegisterPage/RegisterHeader";
import RegisterHero from "../components/RegisterPage/RegisterHero";
import RegisterFooter from "../components/RegisterPage/RegisterFooter";
import "./RegisterPage.css";
const RegisterPage = () => {
    return (
      <div className="register-page">
        <RegisterHeader />
        <RegisterHero />
        <RegisterFooter />
      </div>
    );
  };
  
  export default RegisterPage;