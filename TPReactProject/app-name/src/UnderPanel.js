import React from 'react';
import styled from 'styled-components';
import bankLogo from './BankLogo1.png';
import bankLogo2 from './BankLogo2.png';
import bankLogo3 from './BankLogo3.png';
import messengLogo from './MassengLogo1.png';
import messengLogo2 from './MassengLogo2.png';


const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #3c388d;
  padding: 20px;
  width: 97.5%;
  color: white;
  border-radius: 8px;
  flex-grow: 1;
`;
//margin-bottom: 20px;
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
export default function ContactSection() {
  return (
    // <div style={{ height: '40vh', overflow: 'auto' }}>
    <div style={{ width: '100%', height: '120px', backgroundColor: '#3C388D', position: 'f', bottom: 0, left: 0, display: 'flex', justifyContent: 'space-between' }}>
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
    </div>
  );
}