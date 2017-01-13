import React, { Component } from 'react';
import ClickOutside from 'react-click-outside';
import api from '../../lib/api';


class Header extends Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      searchResult: null,
      showDropdown: false,
      showLoading: false
    };
  }


  /**
   * Debounce render dropdown method for 200ms.
   */
  componentWillMount() {
    // this.renderDropdown = debounce(this.renderDropdown, 200);
  }


  /**
   * Function is triggered when keyword is changed.
   */
  keywordChanged(event) {
    const keyword = event.target.value;
    let state = {};

    if (keyword.length >= 3) {
      state.showDropdown = true;
      state.showLoading = true;

      api.killAll()
      .then(_ => api.search(keyword))
      .then((response) => {
        this.setState({
          searchResult: response,
          showLoading: false,
          showDropdown: true
        });
      })
      .catch(_ => {
        this.setState({
          searchResult: [],
          showLoading: false,
          showDropdown: false
        });
      })
    }

    this.setState(state);
  }


  /**
   * Handle click outside events.
   */
  handleClickOutside() {
    this.setState({
      showDropdown: false,

    });
  }


  /**
   * Render dropdown.
   */
  renderDropdown() {
    const { showDropdown, searchResult, showLoading } = this.state;

    let animation = null;

    if (!showDropdown)
      return null;

    if (showLoading)
      animation = (<img src="/images/loading.gif" alt="Loading..." />);

    return (
      <div className="search-results">
        {animation}
        {searchResult ? searchResult.map((r, index) => (<a key={`result-${index}`}>{r.name}</a>)) : null}
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
