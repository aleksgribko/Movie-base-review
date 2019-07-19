import React from 'react';
import Nav from './components/Nav.js'
import Main from './components/Main.js'
import Footer from './components/Footer.js'
import './App.css';

//import { connect } from 'react-redux'
//import { updateUser } from './actions/action-2.js';


function App() {  
  return (
    <div className="App">
      <Nav />
      <Main />
      <Footer />
    </div>
  );
}

/*
const mapStateToProps = state => ({
  products: state.products,
  users: state.users
})

const mapActionToProps = state => {
  onUpdateUser: updateUser
}
*/
//connect(mapStateToProps, mapActionToProps)
export default App;

//mapStateToProps - state of the store for use