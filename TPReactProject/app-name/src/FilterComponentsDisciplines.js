import React from 'react';




export default class FilterComponentDisciplines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDisciplines: ['Дисциплина', 'Математика', 'Программирование', 'Иностранный язык'],
      selectedDiscipline: 'Выбрать дисциплину',
      disciplines: ['Дисциплина', 'Математика', 'Программирование', 'Иностранный язык'],
    };
  }

  handleDisciplineSelect = (discipline) => {
    if (this.state.selectedDisciplines.includes(discipline)) {
      const newSelectedDisciplines = this.state.selectedDisciplines.filter((item) => item !== discipline);
      this.setState({
        selectedDisciplines: newSelectedDisciplines,
        selectedDiscipline: discipline,
      });
    } else {
      this.setState({
        selectedDisciplines: [...this.state.selectedDisciplines, discipline],
        selectedDiscipline: discipline,
      });
    }
  };

  render() {
    const { customContainerStyle } = this.props;
    return (
      <div style={customContainerStyle}>
        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column' }}>
          <select
            style={{
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px',
              width: '100%',
              textAlign: 'left',
            }}
            className="discipline-select"
            value={this.state.selectedDiscipline}
            onChange={(e) => this.handleDisciplineSelect(e.target.value)}
          >
            {this.state.disciplines.map((discipline) => (
              <option key={discipline} value={discipline}>
                {discipline}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}