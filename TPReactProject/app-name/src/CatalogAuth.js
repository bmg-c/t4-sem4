import React from 'react';
import styled from 'styled-components';
import ProductList1 from './AuthRequstProducts';
import logo1 from './Logo.png';
import { useNavigate } from 'react-router-dom';
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

const ContactInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1075px; /* Уменьшаем отступ справа */
  margin-top: 15px;
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
  position: fixed;
  top: 30px; /* Изменяем значение top, чтобы кнопка была ровно над SortMenuContainer */
  right: 185px;
  transform: translate(0, -50%);
`;

function BlueRectangle1() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate('/catalog');
  };
  const handlePersAccClick = () => {
    navigate('/percacc');
  };
  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div style={{ width: '100%', height: '150px', backgroundColor: '#3C388D', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        <InlineText1>
          <Logo src={logo1} alt="Логотип 1" onClick={handleLogoClick} />
          <ContactInfoContainer>
            <ContactDetails>Контактные данные:</ContactDetails>
            <PhoneNumber>+88525485476</PhoneNumber>
          </ContactInfoContainer>
          <div><StyledButton onClick={handlePersAccClick}>Личный кабинет</StyledButton></div>
        </InlineText1>
      </div>
    </div>
  );
}


export default class CatalogPageAuth extends React.Component{
  render(){
    return(
      <div style={{ paddingTop: '150px' }}>
      <BlueRectangle1 />
      <ProductList1 />
      <ContactSection/>
      </div>
    );
  }
}