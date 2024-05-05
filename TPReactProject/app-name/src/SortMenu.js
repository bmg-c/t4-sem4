import React, { useState } from 'react';
import styled from 'styled-components';

const SortMenuContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 165px;
  transform: translate(0, -50%);
  display: flex;
  align-items: center;
`;

const SortButton = styled.select`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
`;

const SortOptions = styled.div`
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 12px 16px;
`;

const SortOption = styled.option`
  color: black;
  padding: 6px 0;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const SortMenu = ({ cardTitles, onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState('Дисциплина');

  const handleDisciplineSelect = (discipline) => {
    setSelectedDiscipline(discipline);
    onSort(discipline);
    setIsOpen(false);
  };

  return (
    <SortMenuContainer>
      <SortButton
        value={selectedDiscipline}
        onChange={(e) => handleDisciplineSelect(e.target.value)}
      >
        <SortOption value="Дисциплина">Дисциплина</SortOption>
        {cardTitles.map((title, index) => (
          <SortOption key={index} value={title}>
            {title}
          </SortOption>
        ))}
      </SortButton>
      {isOpen && (
        <SortOptions>
          <SortOption onClick={() => handleDisciplineSelect('Дисциплина')}>Все дисциплины</SortOption>
          {cardTitles.map((title, index) => (
            <SortOption key={index} onClick={() => handleDisciplineSelect(title)}>
              {title}
            </SortOption>
          ))}
        </SortOptions>
      )}
    </SortMenuContainer>
  );
};

export default SortMenu;
