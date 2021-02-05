import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter,Link,Route} from 'react-router-dom';
import './App.css';
import HomeScreen from './screen/HomeScreen';
import RegisterScreen from './screen/RegisterScreen';
import SigninScreen from './screen/SigninScreen';

function App() {
    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo}=userSignin;
  return (
      <BrowserRouter>
    <div className="grid-container">
            <header className="header">
                <div className="brand">
                    <Link to="/">Sign In</Link>
                </div>
                <div className="header-links">
                    
                    
                    
                    
                </div>
            </header>
            <aside className="sidebar">

            </aside>
            <main className="main">
                <div className="content">
                    <Route path="/" exact={true} component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/users" component={HomeScreen} />
                    
                </div>
                
            </main>
            <footer className="footer">
                All rights reserved
            </footer>
  </div>
  </BrowserRouter>
  );
}

export default App;
