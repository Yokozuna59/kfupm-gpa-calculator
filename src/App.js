import React from "react";

import "./index.css";
import Calculator from "./Calculator";
import Footer from "./Footer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="text-center">GPA Calculator</h1>
        <div className="flex-wrapper">
          <Calculator></Calculator>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
