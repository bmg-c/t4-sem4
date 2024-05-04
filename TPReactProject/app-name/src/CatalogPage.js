import React, { useState } from 'react';
//import SearchComponent from './SearchComponent';
import FilterComponentDisciplines from './FilterComponentsDisciplines';
import SortingComponent from './SortingComponents';
import styled from 'styled-components';
import AllproductsCard from './ProductsCard';
import logo1 from './Logo.png';
import logo2 from './Logo2.png';
import Auth from './Auth';
import ContactSection from './UnderPanel';

const Logo = styled.img`
  height: 70px;
  width: 100px;
  margin-left: 10px;
  margin-top: 10px;
`;
const InlineText1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px; 
  
`;
const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 700px;
  margin-top: 15px;
`;
const PhoneNumber = styled.p`
  font-size: 16px;
  color: white;
  margin: 0px 0;
  margin-right: 10px;
`;

const ContactDetails = styled.p`
  font-size: 16px;
  color: white;
  margin: 0px 0;
`;
const Logo2 = styled.img`
  height: 30px; 
  margin-top: 50px;
  padding: 2px 2px;
  background-color: white;
`;


const customContainerStyle = {
  position: 'fixed',
  top: '70px',
  left: '45%',
};

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


function BlueRectangle1() {
  const [isAuthOpen, setIsAuthOpen] = useState(false); // Состояние для управления видимостью окна авторизации

  const toggleAuthModal = () => {
    setIsAuthOpen(!isAuthOpen); // Изменение состояния при нажатии на кнопку "Регистрация/вход"
  };

  return (
    <div style={{ width: '100%', height: '100px', backgroundColor: '#3C388D', position: 'fixed', top: 0, left: 0 }}>
      <InlineText1>
        <Logo src={logo1} alt="Логотип 1" />
        <Logo2 src={logo2} alt="Логотип 2" />
        <ContactInfoContainer>
          <ContactDetails>Контактные данные:</ContactDetails>
          <PhoneNumber>+88525485476</PhoneNumber>
        </ContactInfoContainer>
        {/* Кнопка Регистрация/вход */}
        <StyledButton onClick={toggleAuthModal}>Регистрация/вход</StyledButton>
      </InlineText1>
      {/* Отображение компонента авторизации в зависимости от состояния */}
      {isAuthOpen && <Auth />}
    </div>
  );
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
