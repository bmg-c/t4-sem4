import React from 'react';
import { FaFilter } from 'react-icons/fa';


export default class SortingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      priceOrder: null,
      serviceOrder: null,
      nameOrder: null,
      isOpen: false
    };
  }

  handleOptionClick = (option, order = null) => {
    if (option === 'Сортировка по цене') {
      this.setState((prevState) => ({
        priceOrder: order,
        selectedOption: option
      }));
    } else if (option === 'Сортировка по типу услуги') {
      this.setState((prevState) => ({
        serviceOrder: order,
        selectedOption: option
      }));
    } else if (option === 'Сортировка по названию') {
      this.setState((prevState) => ({
        nameOrder: order,
        selectedOption: option
      }));
    }
  };

  toggleSortingBox = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { priceOrder, serviceOrder, nameOrder, isOpen } = this.state;

    return (
      <div className="sorting-container" style={{ position: 'fixed', top: '87px', right: '300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <button className="square-button" style={{ width: '25px', height: '25px', backgroundColor: 'white', position: 'relative' }} onClick={this.toggleSortingBox}>
          <FaFilter style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} /> {/* Filter icon */}
        </button>
        {isOpen && (
          <div className="sorting-box" style={{ width: '200px', background: '#f0f0f0', padding: '10px', border: '1px solid #ccc' }}>
            <div className="sorting-option">
              <label className="sorting-label-large">Сортировка по цене</label>
            </div>
            <div className="sorting-suboptions">
              <hr />
              <div className="sorting-suboption">
                <input
                  type="checkbox"
                  className={`checkbox ${priceOrder === 1 ? 'active' : ''}`}
                  onClick={() => this.handleOptionClick('Сортировка по цене', 1)}
                />
                <label>По убыванию</label>
              </div>
              <div className="sorting-suboption">
                <input
                  type="checkbox"
                  className={`checkbox ${priceOrder === -1 ? 'active' : ''}`}
                  onClick={() => this.handleOptionClick('Сортировка по цене', -1)}
                />
                <label>По возрастанию</label>
                <hr />
              </div>
            </div>
            <div className="sorting-option">
              <label className="sorting-label-large">Сортировка по типу услуги</label>
              <hr />
            </div>
            <div className="sorting-suboptions">
              <div className="sorting-suboption">
                <input
                  type="checkbox"
                  className={`checkbox ${serviceOrder === 1 ? 'active' : ''}`}
                  onClick={() => this.handleOptionClick('Сортировка по типу услуги', 1)}
                />
                <label>Репетиторство</label>
              </div>
              <div className="sorting-suboption">
                <input
                  type="checkbox"
                  className={`checkbox ${serviceOrder === -1 ? 'active' : ''}`}
                  onClick={() => this.handleOptionClick('Сортировка по типу услуги', -1)}
                />
                <label>Справочные материалы</label>
                <hr />
              </div>
            </div>
            <div className="sorting-option">
              <label className="sorting-label-large">Сортировка по названию</label>
            </div>
            <div className="sorting-suboptions">
              <hr />
              <div className="sorting-suboption">
                <input
                  type="checkbox"
                  className={`checkbox ${nameOrder === 1 ? 'active' : ''}`}
                  onClick={() => this.handleOptionClick('Сортировка по названию', 1)}
                />
                <label>По алфавиту (от А до Я)</label>
              </div>
              <div className="sorting-suboption">
                <input
                  type="checkbox"
                  className={`checkbox ${nameOrder === -1 ? 'active' : ''}`}
                  onClick={() => this.handleOptionClick('Сортировка по названию', -1)}
                />
                <label>По алфавиту (от Я до А)</label>
                <hr />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
