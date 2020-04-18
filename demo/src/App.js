import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Content from './Content';
import 'bulma/css/bulma.css'
import './App.css'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
