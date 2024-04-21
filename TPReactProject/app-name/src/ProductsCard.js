import React from 'react';
import styled from 'styled-components';


// const CardContainer = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// height: 100vh;
// `;

const Card = styled.div`
width: 300px;
border: 1px solid #ccc;
border-radius: 8px;
padding: 16px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
margin: 0 10px;
`;

const CardText0 = styled.p`
font-size: 16px;
color: black;
justify-content: center;
padding: 60px 20px;
background-color: #D9D9D9;
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
width: 100%; /* Чтобы кнопки занимали всю доступную ширину */
`;

const Button = styled.button`
flex-grow: 1; /* Кнопка будет расширяться на всю доступную ширину */
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


class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  addToCart = () => {
    alert('Товар добавлен в корзину!');
    // Дополнительный код для добавления товара в корзину
  };

  showDetails = () => {
    alert('Товар добавлен в корзину!');
  };

  getCardTitles = () => {
    return this.props.products.map(product => product.CardTitle);
  }

  render() {
    const filteredProducts = this.props.products.filter(product =>
      product.CardTitle.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {filteredProducts.map((product, index) => (
          <Card key={index} style={{ width: '20%', minHeight: '200px', marginBottom: '1rem' }}>
            <CardText0>Фото товара</CardText0>
            <CardContent>
              <CardTitle>{product.CardTitle}</CardTitle>
              <CardText>{product.CardText}</CardText>
              <CardText>{product.CardText2}</CardText>
              <Price>{product.Price}</Price>
              <ButtonGroup>
                <Button onClick={() => this.addToCart(product)}>Оформить</Button>
                <DetailsButton onClick={() => this.showDetails(product)}>Подробнее</DetailsButton>
              </ButtonGroup>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

const products = [
  {
    CardTitle: 'Математика',
    CardText: 'Description of Product 1',
    CardText2: 'Additional Description of Product 1',
    Price: '1000'
  },
  {
    CardTitle: 'Математика',
    CardText: 'Description of Product 2',
    CardText2: 'Additional Description of Product 2',
    Price: '2000'
  },
  {
    CardTitle: 'Программирование',
    CardText: 'Description of Product 3',
    CardText2: 'Additional Description of Product 3',
    Price: '3000'
  },
  {
    CardTitle: 'Программирование',
    CardText: 'Description of Product 1',
    CardText2: 'Additional Description of Product 1',
    Price: '1000'
  },
  {
    CardTitle: 'Программирование',
    CardText: 'Description of Product 2',
    CardText2: 'Additional Description of Product 2',
    Price: '2000'
  },
  {
    CardTitle: 'Иностранный язык',
    CardText: 'Description of Product 3',
    CardText2: 'Additional Description of Product 3',
    Price: '3000'
  },
  {
    CardTitle: 'Иностранный язык',
    CardText: 'Description of Product 1',
    CardText2: 'Additional Description of Product 1',
    Price: '1000'
  },
  {
    CardTitle: 'Программирование',
    CardText: 'Description of Product 2',
    CardText2: 'Additional Description of Product 2',
    Price: '2000'
  }
];

const AllproductsCard = () => {
  return (
    <div>
      <ProductCard products={products} />
    </div>
  );
};

export default AllproductsCard