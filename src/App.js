/* Libraries */

import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Cookies from 'js-cookie'

/* Components */

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import CookiePolicy from './components/CookiePolicy';

import Home from './components/Home';
import Theme from './components/Theme';
import Settings from './components/Settings';
import Login from './components/Login';
import FullCookiePolicy from './components/FullCookiePolicy';

/* Styles */

import './styles/App.css';

/* Modules */

import load_theme from './modules/load_theme';

/* App */

class App extends Component {
  state = {
    cookiesAccepted: Cookies.get('accepted_policy') ? true : false
  }

  acceptCookies = () => {
    Cookies.set('accepted_policy', true, { expires: 365 });
    this.setState({ cookiesAccepted: true });
  }
  refuseCookies = () => {
    this.setState({ cookiesAccepted: true });
  }

  componentDidMount(){
    load_theme();
  }

  render(){
    const data = {
      menus: [
        { link: '/', name: 'Home', element: <Home />, appearsInNav: true },
        { link: '/theme', name: 'Theme', element: <Theme />, appearsInNav: true },
        { link: '/settings', name: 'Settings', element: <Settings />, appearsInNav: true },
        { link: '/login', name: 'Login', element: <Login />, appearsInNav: true },
        { link: '/cookie-policy', name: 'Cookies', element: <FullCookiePolicy />, appearsInNav: false}
      ]
    }
      
    return (

      <Router>
        <Header menus={data.menus}/>
        <Main routes={data.menus}/>
        <Footer />
        {this.state.cookiesAccepted ? '' : <CookiePolicy accept={this.acceptCookies} refuse={this.refuseCookies}/>}
      </Router>
    );
  }
}

export default App;
