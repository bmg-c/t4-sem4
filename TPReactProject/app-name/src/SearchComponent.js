import React from 'react';


export default class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
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
        const results = this.state.searchResults;
        this.props.onChange(this.state.searchTerm); // Передача обновленного запроса в родительский компонент
        this.setState({
          searchResults: results,
        });
      } else {
        this.setState({
          searchResults: [],
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
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      top: '10px', // Set height to full viewport height
    };
    return (
      <div style={containerStyle}>
        <input
          style={inputStyle}
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="Введите запрос для поиска"
        />
        <div>
          {this.state.searchResults.map((result, index) => (
            <div key={index}>{result}</div>
          ))}
        </div>
      </div>
    );
  }
}