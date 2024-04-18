import React,{ useState } from 'react';
import ReactDOM from 'react-dom';
//import SearchComponent from './SearchComponent';
//import FilterComponent from './FilterComponent';

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: 'Вы ничего не нашли',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (this.state.searchTerm) {
        this.setState({
          searchResults: this.state.searchTerm,
        });
      } else {
        this.setState({
          searchResults: 'Вы ничего не нашли',
        });
      }
    }
  };

  render() {
    const inputStyle = {
      width: '521px', 
      height: '50px',
      fontFamily:'Arial',
      fontSize:'16px'
    }
    return (
      <div>
        <input
          style={inputStyle}
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          placeholder="Введите запрос для поиска"
        />
        <div>
          {this.state.searchResults}
        </div>
      </div>
    );
  }
}




const containerStyle = {
  position: 'fixed',
  top: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
};


const root = ReactDOM.createRoot(document.getElementById('root'));


// Добавляем SearchComponent в текущий контейнер
root.render(
  <div style={containerStyle}>
    <SearchComponent />
  </div>
);