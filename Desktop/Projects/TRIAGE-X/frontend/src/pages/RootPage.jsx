import Header from "../components/RootPage/Header";
import Hero from "../components/RootPage/Hero";
import Footer from "../components/RootPage/Footer";
import "./RootPage.css";

const RootPage = () => {
    return (
      <div className="root-page">
        <Header />
        <Hero />
        <Footer />
      </div>
    );
  };
  
export default RootPage;