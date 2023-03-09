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
import load_config from './modules/load_config';

/* App */

class App extends Component {

  constructor (props){
    super(props);

    load_theme();
    const config = load_config();
    this.state = {
      cookiesAccepted: Cookies.get('accepted_policy') ? true : false,
      config : config
    }
  }


  acceptCookies = () => {
    Cookies.set('accepted_policy', true, { expires: 365 });
    this.setState({ cookiesAccepted: true });
  }
  refuseCookies = () => {
    this.setState({ cookiesAccepted: true });
  }

  updateConfig = (config) => {
    this.setState({ config: config });
  }
  updateTheme = (theme) => {
    for(const [key, value] of Object.entries(theme)){
      document.documentElement.style.setProperty(`--${key}`, value);
    }
  }


  
  render(){
    const data = {
      menus: [
        { link: '/', name: 'Home', element: <Home config={this.state.config}/>, appearsInNav: true },
        { link: '/theme', name: 'Theme', element: <Theme config={this.state.config}/>, appearsInNav: true },
        { link: '/settings', name: 'Settings', element: <Settings config={this.state.config} updateConfig={this.updateConfig}/>, appearsInNav: true },
        { link: '/login', name: 'Login', element: <Login config={this.state.config} updateConfig={this.updateConfig} updateTheme={this.updateTheme}/>, appearsInNav: true },
        { link: '/cookie-policy', name: 'Cookies', element: <FullCookiePolicy config={this.state.config} />, appearsInNav: false}
      ]
    }
      
    return (

      <Router>
        <Header menus={data.menus}/>
        <Main routes={data.menus} config={this.state.config}/>
        <Footer />
        {this.state.cookiesAccepted||window.location.pathname === "/cookie-policy" ? '' : <CookiePolicy accept={this.acceptCookies} refuse={this.refuseCookies}/>}
      </Router>
    );
  }
}

export default App;
