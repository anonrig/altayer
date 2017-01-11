import React, { Component } from 'react';
import './style.scss';

import SearchBar from '../searchbar';
import Carousel from '../carousel';
import NavigationBar from '../navigationbar';

class Header extends Component {
  /**
   * Renders header component.
   */
  render() {
    return (
      <div>
        <nav className="navbar navbar-fixed-top menu">
          <div className="row top-menu">
              <div className="col-md-5 col-sm-5 col-xs-5 menu-part left">
                <div className="icon icon-menu navbar-toggle"></div>
              </div>
              <div className="col-md-2 col-sm-2 col-xs-2 menu-part center">
                  <a className="header item" href="/">
                    <div className="icon icon-logo"></div>
                  </a>
              </div>
              <div className="col-md-5 col-sm-5 col-xs-5 menu-part right text-right on-mobile">
                  <a className="shopping-bag icon-bag"></a>
              </div>
              <div className="col-md-5 col-sm-5 col-xs-5 menu-part right text-container">
                  <a className="link" href=""> Sign In/Register </a> <div className="pipe"></div>
                  <a className="link" href=""> Stores <span className="on-web">/Stockists</span> </a> <div className="pipe on-web"></div>
                  <a className="link on-web" href=""> Your bag (2) </a>
              </div>
          </div>
          <NavigationBar />
          <SearchBar/>
        </nav>
        <Carousel />
      </div>
    );
  }
}

export default Header;
