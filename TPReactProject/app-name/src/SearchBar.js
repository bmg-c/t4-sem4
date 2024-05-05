import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearch = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
    this.props.onSearch(event.target.value);
  };

  render() {
    const inputStyle = {
      width: '521px',
      height: '50px',
      fontFamily: 'Arial',
      fontSize: '16px'
    };

    const containerStyle = {
      display: 'flex',
      position: 'fixed',
      top: '110px',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <div style={containerStyle}>
        <input
          style={inputStyle}
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
          placeholder="Поиск по названию товара..."
        />
      </div>
    );
  }
}

export default SearchBar;