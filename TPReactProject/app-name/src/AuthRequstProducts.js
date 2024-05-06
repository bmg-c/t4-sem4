import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const DetailsButton = styled(Button)`
  background-color: #EAEAEA;
  color: black;
`;

const CardText0 = styled.div`
  width: 100%;
  height: 200px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 12px;
`;

const SearchInput = styled.input`
  width: 521px;
  height: 50px;
  font-family: Arial;
  font-size: 16px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  position: fixed;
  top: 110px;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Поиск по названию товара..."
      />
    </SearchBarContainer>
  );
};

const SortMenuContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 165px;
  transform: translate(0, -50%);
  display: flex;
  align-items: center;
`;

const SortButton = styled.select`
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
`;

const SortOptions = styled.div`
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 12px 16px;
`;

const SortOption = styled.option`
  color: black;
  padding: 6px 0;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const SortMenu = ({ cardTitles, onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState('Дисциплина');

  const handleDisciplineSelect = (discipline) => {
    setSelectedDiscipline(discipline);
    onSort(discipline);
    setIsOpen(false);
  };

  return (
    <SortMenuContainer>
      <SortButton
        value={selectedDiscipline}
        onChange={(e) => handleDisciplineSelect(e.target.value)}
      >
        <SortOption value="Дисциплина">Дисциплина</SortOption>
        {cardTitles.map((title, index) => (
          <SortOption key={index} value={title}>
            {title}
          </SortOption>
        ))}
      </SortButton>
      {isOpen && (
        <SortOptions>
          <SortOption onClick={() => handleDisciplineSelect('Дисциплина')}>Все дисциплины</SortOption>
          {cardTitles.map((title, index) => (
            <SortOption key={index} onClick={() => handleDisciplineSelect(title)}>
              {title}
            </SortOption>
          ))}
        </SortOptions>
      )}
    </SortMenuContainer>
  );
};


// const ProductCard = ({ products }) => {
//   const navigate = useNavigate();

//   const handleDetailsClick = (product) => {
//     navigate(`/product/${product.id}`);
//   };

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', padding: '0 10px' }}>
//       {products.map((product) => {
//         const photoUrl = `http://127.0.0.1:8000/api/product/id/${product.id}/photo`

//         console.log('Photo URL:', photoUrl); // Добавляем console.log()
//         return (
//           <Card key={product.id} style={{ width: '20%', minHeight: '200px', marginBottom: '1rem' }}>
//             <CardText0 style={{ backgroundImage: `url(${photoUrl})` }} />
//             <CardContent>
//               <CardTitle>{product.name}</CardTitle>
//               <CardText>{product.description}</CardText>
//               <CardText>{product.discipline}</CardText>
//               <Price>{product.price}</Price>
//               <ButtonGroup>
//                 <Button>Оформить</Button>
//                 <DetailsButton onClick={() => handleDetailsClick(product)}>
//                   Подробнее
//                 </DetailsButton>
//               </ButtonGroup>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

const ProductCard = ({ products }) => {
  const navigate = useNavigate();

  const handleDetailCardClick = (product) =>  {
    navigate(`/productauth/${product.id}`);
  };

  
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', padding: '0 10px' }}>
      {products.map((product) => {
        const photoUrl = `http://127.0.0.1:8000/api/product/id/${product.id}/photo`;

        return (
          <Card key={product.id} style={{ width: '20%', minHeight: '200px', marginBottom: '1rem' }}>
            <CardText0 style={{ backgroundImage: `url(${photoUrl})` }} />
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <CardText>{product.description}</CardText>
              <CardText>{product.discipline}</CardText>
              <Price>{product.price}</Price>
              <ButtonGroup>
                <Button>Оформить</Button>
                <DetailsButton onClick={() => handleDetailCardClick(product)}>
                  Подробнее
                </DetailsButton>
              </ButtonGroup>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};


const ProductList1 = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState('Дисциплина');
  const [uniqueDisciplines, setUniqueDisciplines] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/product'); // Обновить путь к API
        setProducts(response.data);
        setFilteredProducts(response.data); // Устанавливаем начальное значение для фильтрации

        const uniqueDisciplines = [...new Set(response.data.map(product => product.discipline))];
        setUniqueDisciplines(uniqueDisciplines);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleDisciplineChange = (discipline) => {
    if (discipline === 'Дисциплина') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.discipline === discipline);
      setFilteredProducts(filtered);
    }
    setSelectedDiscipline(discipline === selectedDiscipline ? 'Дисциплина' : discipline);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SortMenu cardTitles={uniqueDisciplines} onSort={handleDisciplineChange} />
      <ProductCard products={filteredProducts} />
    </div>
  );
};

export default ProductList1;
