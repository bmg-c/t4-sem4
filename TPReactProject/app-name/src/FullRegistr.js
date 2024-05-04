import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const CardContainer = styled.div`
    background-color: #3C388D;
    width: 400px;
    height: 400px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    border-radius: 4px;   
`;

const CardText = styled.p`
  font-size: 16px;
  color: white;
  font-weight: bold;
  margin-left: 23px;
  margin-top: 4px;
`;

const CardText1 = styled.p`
  font-size: 12px;
  color: white;
  margin-left: 23px;
  margin-top: 20px;
`;

const ComponentKley = styled.div`
    flex-direction: column;
`;

const EmailInput = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: 23px;
  width: 330px;
`;

const Button = styled.button`
    margin-left: 23px;
    margin-top: 25px;
    font-size: 16px;
    padding: 15px;
    width: 150px;
    background-color: #55C75A;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 8px;
`;

const Button1 = styled.button`
    margin-left: 23px;
    margin-top: 25px;
    font-size: 16px;
    padding: 15px;
    width: 150px;
    margin-left: 47px;
    background-color: #EAEAEA;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 8px;
`;

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', formData);
      console.log(response.data); // handle successful registration
    } catch (error) {
      console.error(error); // handle registration error
    }
  };

  return (
    <CardContainer>
      <ComponentKley>     
        <CardText>Регистрация</CardText>
        <CardText1>Электронная почта</CardText1>
        <EmailInput type="email" placeholder="Почта" onChange={handleInputChange} name="email" />
        <CardText1>Пароль</CardText1>
        <EmailInput type="password" placeholder="Пароль" onChange={handleInputChange} name="password" />
        <CardText1>Повторение пароля</CardText1>
        <EmailInput type="password" placeholder="Повторение пароля" onChange={handleInputChange} name="passwordConfirm" />
        <Button onClick={handleSubmit}>Регистрация</Button>
        <Button1>Авторизация</Button1>
      </ComponentKley>  
    </CardContainer>
  );
};

export default RegistrationForm;
