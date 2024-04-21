import React from 'react';
import styled from 'styled-components';
import logo from './Logo.png'; // Импорт изображения логотипа
import bankLogo from './BankLogo1.png';
import bankLogo2 from './BankLogo2.png';
import bankLogo3 from './BankLogo3.png';
import messengLogo from './MassengLogo1.png';
import messengLogo2 from './MassengLogo2.png';

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
      height: '35px',
      fontFamily: 'Arial',
      fontSize: '16px',
      margin: '5px auto', // Центрирование и добавление верхнего отступа
    };

    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <div style={containerStyle}>
        <div>
          <input
            style={inputStyle}
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Введите запрос для поиска"
          />
          <div>{this.state.searchResults}</div>
        </div>
      </div>
    );
  }
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: relative; /* Добавляем позиционирование */
`;

const Card = styled.div`
  margin-top: 30px;
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

const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #3c388d;
  padding: 20px;
  width: 97,5%;
  color: white;
  border-radius: 8px;
  flex-grow: 1; 
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-right: 130px;
`;

const ContactHeader = styled.p`
  font-size: 16px;
  margin-left: 600px;
  white-space: nowrap;
`;

const ContactItem = styled.p`
  font-size: 16px;
  margin: 0px 0; /* Уменьшаем верхний и нижний отступы между элементами контактной информации */
`;
const ContactContainer0 = styled.div`

  align-items: center;
  
`;
const ContactContainer1 = styled.div`
  display: flex;
  align-items: center;
  margin-left: 520px;
  
`;
const LogoBank = styled.img`
  width: 50px; 
  height: auto; 
  margin-left: 10px;
`;
const Logomesseng = styled.img`
  width: 50px; 
  height: auto; 
  margin-left: 10px;
`;
const SmallLogo = styled.img`
  width: 40px;
  height: auto;
`;
const PhoneNumber = styled(ContactItem)`
  margin-right: 10px; /* Устанавливаем отступ справа для номера телефона */
`;
function ContactSection() {
  return (
    <ContactContainer>
        <ContactInfo>
          <ContactItem>Контактная информация: </ContactItem>
          <ContactContainer0>
          <PhoneNumber>+7(950)-590-90-30</PhoneNumber>
          <ContactItem>generalTutor@yandex.ru</ContactItem>
          <SmallLogo src={messengLogo} alt="Логотип 1" />
          <Logomesseng src={messengLogo2} alt="Логотип 2" />
          </ContactContainer0>
        </ContactInfo>
        <ContactInfo>
          <ContactHeader>Информация о способах оплаты</ContactHeader>
          <ContactContainer1>
          <LogoBank src={bankLogo} alt="Логотип 1" />
          <LogoBank src={bankLogo2} alt="Логотип 2" />
          <LogoBank src={bankLogo3} alt="Логотип 3" />
          </ContactContainer1>
        </ContactInfo>
      </ContactContainer>
  );
}
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
const Logo = styled.img`
  width: 100px; // Устанавливаем ширину логотипа
  height: auto; // Автоматически рассчитываем высоту
  margin-left: 20px; // Устанавливаем отступ слева
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px; // Устанавливаем отступ справа для кнопки
`;
const BlueRectangle1Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 0;
`;

const StyledButton = styled.button`
  font-size: 16px;
  padding: 8px 12px; // Устанавливаем отступы для кнопки
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px 10px;
  background-color: #36274C;
`;


class BlueRectangle2 extends React.Component {
  render() {
    return (
      <BlueRectangle1Container>
        <div style={{ width: '100%', height: '75px', backgroundColor: '#3C388D', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}> {/* Убираем position: fixed; и добавляем zIndex */}
          <div>
            <Logo src={logo} alt="Логотип" />
          </div>
          <SearchComponent />
          <ButtonContainer>
            <StyledButton>Регистрация/вход</StyledButton>
          </ButtonContainer>
        </div>
        <ProductCard cardWidth="1009px" />
        <ContactSection />
      </BlueRectangle1Container>
      
    );
  }
}

export default BlueRectangle2;
