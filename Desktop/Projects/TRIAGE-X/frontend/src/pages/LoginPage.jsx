import LoginHeader from "../components/LoginPage/LoginHeader";
import LoginHero from "../components/LoginPage/LoginHero";
import LoginFooter from "../components/LoginPage/LoginFooter";
import "./LoginPage.css";
const LoginPage = () => {
    return (
      <div className="login-page">
        <LoginHeader />
        <LoginHero />
        <LoginFooter />
      </div>
    );
  };
  export default LoginPage;