import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import SortMenu from './SortMenu';

const Card = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 10px;
`;

const CardText0 = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 12px;
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

const DetailsButton = styled(Button)`
  background-color: #EAEAEA;
  color: black;
`;

const ProductCard = ({ products }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', padding: '0 10px' }}>
      {products.map((product, index) => (
        <Card key={index} style={{ width: '20%', minHeight: '200px', marginBottom: '1rem' }}>
          <CardText0 style={{ backgroundImage: `url(${product.photo_url})` }} />
          <CardContent>
            <CardTitle>{product.name}</CardTitle>
            <CardText>{product.description}</CardText>
            <CardText>{product.discipline}</CardText>
            <Price>{product.price}</Price>
            <ButtonGroup>
              <Button>Оформить</Button>
              <Link to={`/product/${product.id}`}>
                <DetailsButton>Подробнее</DetailsButton>
              </Link>
            </ButtonGroup>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('Дисциплина');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product'); // Обновить путь к API
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (discipline) => {
    setSelectedDiscipline(discipline);
    setSearchTerm('');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const disciplineFilteredProducts = filteredProducts.filter(product => {
    if (selectedDiscipline === 'Дисциплина') {
      return true; // Показывать все карточки при выборе "Дисциплина"
    } else {
      return product.discipline === selectedDiscipline;
    }
  });

  const cardTitles = [...new Set(products.map(product => product.discipline))];

  return (
    <div>
      <h1>Product List</h1>
      <SearchBar onSearch={handleSearch} />
      <SortMenu cardTitles={cardTitles} onSort={handleSort} />
      <ProductCard products={disciplineFilteredProducts} />
    </div>
  );
};

export default ProductList;