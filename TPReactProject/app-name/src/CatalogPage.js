import React from 'react';
import SearchComponent from './SearchComponent';
import FilterComponentDisciplines from './FilterComponentsDisciplines';
import SortingComponent from './SortingComponents';
import styled from 'styled-components';
import AllproductsCard from './ProductsCard';
import ContactSection from './UnderPanel';




const customContainerStyle = {
  position: 'fixed',
  top: '70px',
  left: '45%',
};

const ButtonContainer = styled.div`
display: flex;
margin-left: 1200px;
margin-top: -60px;
`;
const StyledButton = styled.button`
font-size: 16px;
padding: 8px 12px;
background-color: transparent;
border: none;
color: white;
cursor: pointer;
padding: 10px 10px;
background-color: #36274C;
`;


class BlueRectangle1 extends React.Component{
  render() {
    return (
      <div style={{width: '100%', height: '75px', backgroundColor: '#3C388D', position: 'fixed', top: 0, left: 0 }}>
        <SearchComponent/>
        <ButtonContainer>
        <StyledButton>Регистрация/вход</StyledButton>
        </ButtonContainer>
      </div>
    );
  }
}


class BlueRectangle extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', height: '50px', backgroundColor: '#3C388D', position: 'fixed', top: 75, left: 0 }}>
        <SortingComponent />
        <FilterComponentDisciplines customContainerStyle={customContainerStyle} />
      </div>
    );
  }
}

export default class CatalogPage extends React.Component{
  render(){
    return(
      <div style={{ paddingTop: '150px' }}>
      <BlueRectangle1/>
      <BlueRectangle/>
      <AllproductsCard/>
      <ContactSection/>
      </div>
    );
  }
}