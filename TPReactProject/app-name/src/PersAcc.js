import React from 'react';
import styled from 'styled-components';
import ContactSection from './UnderPanel';
import logo1 from './Logo.png';
import { useNavigate } from 'react-router-dom';


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
// const StyledButton2 = styled.button`
// font-size: 16px;
// background-color: transparent;
// border: none;
// color: white;
// margin-right: 270px;
// margin-top: 15px;
// white-space: nowrap;
// cursor: pointer;
// border-radius: 4px;
// padding: 10px 10px;
// background-color: #36274C;
// `;

const StyledButton2 = styled.button`
  font-size: 16px;
  background-color: transparent;
  border: none;
  color: white;
  margin-right: 150px;
  margin-top: 50px;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 4px;
  padding: 10px 10px;
  background-color: #36274C;
  margin-left: 80px; /* Added margin-left to move the buttons to the right */
`;


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

const InlineText2 = styled.div`
  display: flex;
  justify-content: flex-start;
  
  
`;
function BlueRectangleCardLC(){
    const navigate = useNavigate();
    const handleLogoClick = () => {
      navigate('/catalog');
    };
    const handlePersAccClick = () => {
      navigate('/percacc');
    };
    return (
      <div style={{width: '100%', height: '150px', backgroundColor: '#3C388D', position: 'fixed', top: 0, left: 0 }}>
        <InlineText1>
        <Logo src={logo1} alt="Логотип 1" onClick={handleLogoClick} />
        <ContactInfoContainer>
        <ContactDetails>Контактные данные:</ContactDetails>
        <PhoneNumber>+88525485476</PhoneNumber>
        </ContactInfoContainer>
        <div><StyledButton onClick={handlePersAccClick}>Личный кабинет</StyledButton></div>
        </InlineText1>
        <InlineText2>
        <div><StyledButton2>Личные данные</StyledButton2></div>
        <div><StyledButton2>История покупок</StyledButton2></div>
        <div><StyledButton2>Мои услуги</StyledButton2></div>
        <div><StyledButton2>Выход из аккаунта</StyledButton2></div>
        </InlineText2>
      </div>
    );
}


const CardContainer = styled.div`
    background-color: #3C388D;
    width: 700px;
    height: 300px;
    margin-top: -410px;
    margin-left: auto;
    margin-right: 100px;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;   
`;
const CardText0 = styled.p`
  font-size: 16px;
  width: 400px;
  height: 400px;
  color: black;
  margin-left: 200px;
  display: flex;
  justify-content: center; 
  align-items: center;
  background-color: #d9d9d9;
`;
const EmailInput = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: 23px;
  
  margin-top: 20px;
  width: 620px;
  height: 20px;
`;
const StyledButton3 = styled.button`
font-size: 16px;
background-color: transparent;
border: none;
color: white;
margin-left: 950px;
margin-top: 15px;
white-space: nowrap;
cursor: pointer;
border-radius: 4px;
padding: 10px 10px;
background-color: #36274C;
`;
const Button = styled.button`
  font-size: 16px;
  padding: 10px;
  margin-left: 60px;
  margin-right: 60px;
  background-color: #55c75a;
  color: white;
  border: none;
  margin-top: 70px;
  border-radius: 4px;
  cursor: pointer;
  width: 260px;
  height: 50px;
`;
const Inline= styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;


const ContactSectionContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
class LCData extends React.Component{
  render() {
    return (
      <div style={{width: '100%', height: '100px', position: 'fixed', top: 150, left: 0 }}>
      <CardText0>Фото товара</CardText0>
      <CardContainer>
        <EmailInput type="email" placeholder="Имя" />
        <EmailInput type="email" placeholder="Почта" />
        <Inline>
        <Button>Изменение личных данных</Button>
        <Button>Изменение пароля</Button>
        </Inline>
      </CardContainer>
      <StyledButton3>Пройти верификацию на тьютора</StyledButton3>
      
      </div>
    );
  }
}


export default class Percacc extends React.Component{
    render(){
      return(
        <div style={{ paddingTop: '150px' }}>
          <BlueRectangleCardLC/>
          <LCData/>
        <ContactSectionContainer>
          <ContactSection/>
        </ContactSectionContainer>
        </div>
      );
    }
  }