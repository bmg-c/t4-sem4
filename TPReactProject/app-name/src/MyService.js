import { useNavigate, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ContactSection from './UnderPanel';
import logo1 from './Logo.png';

const Card = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h2`
  font-size: 16px;
  color: #4236CF;
  margin-bottom: 8px;
`;

const CardText = styled.p`
  font-size: 16px;
  color: black;
  margin-bottom: 12px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
`;

const Button = styled.button`
  flex-grow: 1;
  font-size: 16px;
  padding: 10px 14px;
  background-color: #55C75A;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
`;


const CardText0 = styled.div`
  width: 100%;
  height: 200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 12px;
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
const ProductName = styled.h2`
  margin-right: 8px;
`;

const VendorCode = styled.span`
  font-size: 14px;
  color: #666;
`;

const ProductCard = ({ products}) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', padding: '0 10px' }}>
      {products.map((product) => {
        const photoUrl = `http://127.0.0.1:8000/api/product/id/${product.id}/photo`;

        return (
          <Card key={product.id} style={{ width: '20%', minHeight: '200px', marginBottom: '1rem' }}>
            <CardText0 style={{ backgroundImage: `url(${photoUrl})` }} />
            <CardContent>
            <CardTitle>
              <ProductName>{product.name}</ProductName>
              <VendorCode>Артикул: {product.vendor_code}</VendorCode>
            </CardTitle>
              <CardText>{product.description}</CardText>
              <CardText>{product.discipline}</CardText>
              <Price>{product.price}</Price>
              <ButtonGroup>
                <Button>Редактировать</Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};


const MyProductList = () => {
  const { userId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/author_id/${userId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [userId]);
  return (
    <div>
      <ProductCard products={products}/>
    </div>
  );
};


const BlueRectangleCardLC = ({ userId}) => {
  const navigate = useNavigate();
  console.log(userId)
  const handleLogoClick = () => {
    navigate(`/catalog/${userId}`);
  };
  const handleLogoutClick = () =>{
    navigate('/');
  };
    return (
      <div style={{width: '100%', height: '150px', backgroundColor: '#3C388D', position: 'fixed', top: 0, left: 0 }}>
        <InlineText1>
        <Logo src={logo1} alt="Логотип 1" onClick={handleLogoClick} />
        <ContactInfoContainer>
        <ContactDetails>Контактные данные:</ContactDetails>
        <PhoneNumber>+88525485476</PhoneNumber>
        </ContactInfoContainer>
        <div><StyledButton>Личный кабинет</StyledButton></div>
        </InlineText1>
        <InlineText2>
        <div><StyledButton2>Личные данные</StyledButton2></div>
        <div><StyledButton2>История покупок</StyledButton2></div>
        <div><StyledButton2>Мои услуги</StyledButton2></div>
        <div><StyledButton2 onClick= {handleLogoutClick}>Выход из аккаунта</StyledButton2></div>
        </InlineText2>
      </div>
    );
}

const MyServicesPage = () => {
  const { userId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [newProduct, setNewProduct] = useState({
    vendor_code: '',
    discipline: '',
    name: '',
    description: '',
    price: 0,
  });

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSaveProduct = async () => {
    console.log(photo);
    console.log(photo?.name);
    try {
      await axios.post('http://localhost:8000/api/product/add', JSON.stringify(newProduct), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Новый товар сохранен:', newProduct.vendor_code);
      if (photo) {
        const formData = new FormData();
        formData.append('photo', photo);
        const photoResponse = await axios.put(`http://127.0.0.1:8000/api/product/id/${newProduct.vendor_code}/addphoto`, formData);
        console.log('Фото добавлено:', photoResponse.data);
      } else {
        throw new Error('Товар не может быть сохранен без фото');
      }

      setShowModal(false);
      alert('Товар сохранен!');
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div style={{ paddingTop: '150px' }}>
      <BlueRectangleCardLC userId={userId} />
      <div style={{ fontWeight: 'bold', fontSize: '24px', marginLeft: '20px', marginTop: '20px' }}>Список моих товаров</div>
      <button style={{ fontSize: '16px', padding: '10px 20px', backgroundColor: '#55C75A', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '1200px', marginTop: '-30px' }} onClick={handleAddProduct}>Добавить товар</button>
      <MyProductList />
      <ContactSection />

      {showModal && (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ width: '50%', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '24px', color: '#4236CF', marginBottom: '16px' }}>Добавить новый товар</h2>
      <form>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="vendor_code" style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Артикул:</label>
          <input type="text" id="vendor_code" name="vendor_code" value={newProduct.vendor_code} onChange={handleInputChange} style={{ width: '90%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="discipline" style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Дисциплина:</label>
          <input type="text" id="discipline" name="discipline" value={newProduct.discipline} onChange={handleInputChange} style={{ width: '90%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="name" style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Название:</label>
          <input type="text" id="name" name="name" value={newProduct.name} onChange={handleInputChange} style={{ width: '90%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="description" style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Описание:</label>
          <textarea id="description" name="description" value={newProduct.description} onChange={handleInputChange} style={{ width: '90%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}></textarea>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="price" style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Цена:</label>
          <input type="number" id="price" name="price" value={newProduct.price} onChange={handleInputChange} step="1" style={{ width: '90%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <button type="button" onClick={handleCloseModal} style={{ marginRight: '16px', fontSize: '16px', padding: '8px 12px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Отмена</button>
          <button type="button" onClick={handleSaveProduct} style={{ fontSize: '16px', padding: '8px 12px', backgroundColor: '#55C75A', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Сохранить</button>
        </div>
        <div style={{ marginTop: '16px' }}>
          <label htmlFor="photo" style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Фото:</label>
          <input type="file" id="photo" name="photo" onChange={(e) => setPhoto(e.target.files[0])} style={{ width: '90%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
      </form>
    </div>
  </div>
    )}
    </div>
  );
};
export default MyServicesPage;



