import React from "react";

import "./search-pannel.css";

export default class SearchPanel extends React.Component {
  state = {
    term: ""
  };

  handleSearch = e => {
    this.setState({
      term: e.target.value
    });
    this.props.searchField(e.target.value);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.handleSearch}
        value={this.state.search}
      />
    );
  }
}
