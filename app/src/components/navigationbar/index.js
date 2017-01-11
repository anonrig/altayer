import React, { Component } from 'react';

import './style.scss';


class NavigationBar extends Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.categories = [
      'CLOTHING',
      'TRAVEL',
      'NURSERY FURNITURE',
      'NURSERY INTERIORS',
      'PLAYTIME',
      'BATHTIME',
      'FEEDING',
      'GIFTS'
    ];
  }


  /**
   * Render search bar component
   */
  render() {
    return (
      <div id="navbar" className="row sub-menu on-web">
        {this.categories.map((category, index) => <a key={'category-' + index}>{category}</a>)}
      </div>
    );
  }
}

export default NavigationBar;
