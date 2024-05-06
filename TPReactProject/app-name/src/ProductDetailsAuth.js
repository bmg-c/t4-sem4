import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContactSection from './UnderPanel';
import logo1 from './Logo.png';



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
  height: ${({ cardWidth }) => cardWidth || '550px'};
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

const CardText0 = styled.div`
  font-size: 16px;
  width: 40%;
  height: 15%;
  color: black;
  padding: 120px 130px;
  background-color: #d9d9d9;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
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
const EmailInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
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


function BlueRectangleCard() {

  const handlePersAccClick = () => {
    navigate('/percacc');
  };
  const navigate=useNavigate()
  const handleLogoClick = () => {
    navigate('/catalog');
  };

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <div style={{ width: '100%', height: '75px', backgroundColor: '#3C388D', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        <InlineText1>
          <Logo src={logo1} alt="Логотип 1" onClick={handleLogoClick} />
          <ContactInfoContainer>
            <ContactDetails>Контактные данные:</ContactDetails>
            <PhoneNumber>+88525485476</PhoneNumber>
          </ContactInfoContainer>
          <StyledButton onClick={handlePersAccClick}>Личный кабинет</StyledButton>
        </InlineText1>
      </div>
    </div>
  );
}

const ProductDetailsAuth = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = () => {
    alert('Оформление товаров!');
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/id/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ paddingTop: '150px' }}>
      <BlueRectangleCard />
      <CardContainer>
        <Card>
          <CardTextContainer>
            <InlineText>
              <CardText>Дисциплина: {product.discipline}</CardText>
              <CardText>Артикул: {product.vendor_code}</CardText>
            </InlineText>
            <CardTitle>{product.name}</CardTitle>
            <CardText0 style={{ backgroundImage: `url(http://127.0.0.1:8000/api/product/id/${product.id}/photo)` }} />
            <CardText>{product.description}</CardText>
          </CardTextContainer>
          <CardContent>
            <Price>{product.price}</Price>
            <EmailInput type="email" placeholder="Введите ваш email" />
            <Button onClick={addToCart}>Оформить</Button>
            <CardText1>Имя пользователя?</CardText1>
          </CardContent>
        </Card>
      </CardContainer>
      <div style={{ marginTop: '-100px' }}>
        <ContactSection />
      </div>
    </div>
  );
};

export default ProductDetailsAuth;