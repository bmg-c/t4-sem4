import React from 'react';
import styled from 'styled-components';
//import logo from './Logo.png'; // Импорт изображения логотипа
import ContactSection from './UnderPanel';
import logo1 from './Logo.png';
import logo2 from './Logo2.png';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  margin-top: -30px;
  display: flex;
  justify-content: space-between;
  width: ${({ cardWidth }) => cardWidth || '900px'};
  height: ${({ cardWidth }) => cardWidth || '700px'};
  background-color: #3c388d;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardTextContainer = styled.div`
  width: 50%;
  padding-left: 20px;
`;

const CardText0 = styled.p`
  font-size: 16px;
  width: 40%;
  height: 15%;
  color: black;
  padding: 120px 130px;
  background-color: #d9d9d9;
`;
const CardText1 = styled.p`
  margin-top: 280px;
  color: white;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 8px;
`;

const CardText = styled.p`
  font-size: 16px;
  color: white;
  margin-bottom: 12px;
`;

const Price = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-right: 220px; 
  color: white;
  text-align: right;
`;
const InlineText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 10px 16px;
  margin-right: 10px; 
  background-color: #55c75a;
  color: black;
  border: none;
  margin-top: 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 340px;
`;
const EmailInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;




function ProductCard({ cardWidth }) {
  const addToCart = () => {
    alert('Оформление товаров!');
  };

  return (
    <CardContainer>
      <Card>
        <CardTextContainer>
          <InlineText>
            <CardText>Дисциплина (тема)</CardText>
            <CardText>Артикул: 00010228</CardText>
          </InlineText>
          <CardTitle>Наименование продукта</CardTitle>
          <CardText0>Фото товара</CardText0>
          <CardText>Описание Предмета Описание Предмета Описание Предмета Описание Предмета Описание Предмета Описание Предмета Описание Предмета Описание Предмета Описание Предмета </CardText>
        </CardTextContainer>
        <CardContent>
          <Price>1 000 000 Р</Price>
          <EmailInput type="email" placeholder="Введите ваш email" />
          <Button onClick={addToCart}>Оформить</Button>
          <CardText1>Имя пользователя?</CardText1>
        </CardContent>
      </Card>
      
    </CardContainer>
  );
}



const StyledButton = styled.button`
font-size: 16px;
padding: 8px 12px;
background-color: transparent;
border: none;
color: white;
margin-right: 200px;
cursor: pointer;
padding: 10px 10px;
background-color: #36274C;
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
const Logo2 = styled.img`
  height: 30px; 
  margin-top: 50px;
  padding: 2px 2px;
  background-color: white;
`;
class BlueRectangleCard extends React.Component{
  render() {
    return (
      <div style={{width: '100%', height: '100px', backgroundColor: '#3C388D', position: 'fixed', top: 0, left: 0 }}>
        <InlineText1>
        <Logo src={logo1} alt="Логотип 1" />
        <Logo2 src={logo2} alt="Логотип 2" />
        <ContactInfoContainer>
        <ContactDetails>Контактные данные:</ContactDetails>
        <PhoneNumber>+88525485476</PhoneNumber>
        </ContactInfoContainer>
        <StyledButton>Регистрация/вход</StyledButton>
        </InlineText1>
      </div>
    );
  }
}



export default class BigCard extends React.Component{
  render(){
    return(
      <div style={{ paddingTop: '150px' }}>
      <BlueRectangleCard/>
      <ProductCard/>
      <ContactSection/>
      </div>
    );
  }
}
