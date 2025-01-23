import React from 'react';
import BlueyQuiz from "./components/BlueyQuiz";
import Footer from './components/Footer';
import CookieConsent from "react-cookie-consent";

function App() {
  return (
    <div className="background">  
        <div className="container">
          <BlueyQuiz/>
          <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="myAwesomeCookieName2"
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150}>
            This website uses cookies to enhance the user experience.{" "}
            <span style={{ fontSize: "10px" }}>Click on button to accept the terms.</span>
          </CookieConsent>
        </div>
      <Footer/>    
    </div>
  );
}

export default App;
