import React from 'react';
import BlueyQuiz from "./components/BlueyQuiz";
import Footer from './components/Footer';

function App() {
  return (
    <div className="background">  
        <div className="container">
          <BlueyQuiz/>
        </div>
      <Footer/>    
    </div>
  );
}

export default App;
