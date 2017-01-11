import React, { Component } from 'react';
import ClickOutside from 'react-click-outside';
import { debounce } from 'lodash';


class Header extends Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      keyword: null,
      searchResult: null,
      showDropdown: false
    };
  }


  /**
   * Debounce render dropdown method for 200ms.
   */
  componentWillMount() {
    this.renderDropdown = debounce(this.renderDropdown, 200);
  }


  /**
   * Function is triggered when keyword is changed.
   */
  keywordChanged(event) {
    let state = {
      keyword: event.target.value
    };

    if (event.target.value.length >= 3)
      state.showDropdown = true;

    this.setState(state);
  }


  /**
   * Handle click outside events.
   */
  handleClickOutside() {
    this.setState({
      showDropdown: false
    });
  }

  renderDropdown() {
    const { showDropdown, searchResult, keyword } = this.state;

    let animation = null;

    if (!keyword || keyword.length < 3 || !showDropdown)
      return null;

    if (!searchResult)
      animation = (<img src="/images/loading.gif" alt="Loading..." />);

    return (
      <div className="search-results">
        {animation}
        {searchResult ? searchResult.map((r, index) => (<a key={`result-${index}`}>{r}</a>)) : null}
      </div>
    )
  }


  /**
   * Render search bar component
   */
  render() {
    return (
      <div className="row row search-menu">
        <div className="search-input">
          <input
            type="text"
            placeholder="Hello, I'm looking for..."
            onChange={this.keywordChanged.bind(this)} />
          <span className="search-button icon-search"></span>
        </div>
        {this.renderDropdown()}
      </div>
    );
  }
}

export default ClickOutside(Header);
