import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  display: flex;
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
    margin-top: 100px;
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
    margin-top: -45px;
    font-size: 16px;
    padding: 15px;
    width: 150px;
    margin-left: auto; /* Автоматический отступ слева для выравнивания справа */
    background-color: #EAEAEA;
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;
const CloseButton = styled.button`
    position: absolute;
    top: 180px;
    right: 10px;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
`;


const LoginFormContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
`;

const Auth = ({ onCloseModal }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:8000/api/auth/login', formData);
      console.log(response.data); // handle successful login
      navigate('/percacc'); // Переход на маршрут '/dashboard' после успешной авторизации
    } catch (error) {
      console.error(error); // handle login error
    }
  };

  return (
    <>
      <LoginFormContainer>
        <CardContainer>
          <CloseButton onClick={onCloseModal}>X</CloseButton> {/* Добавляем кнопку закрытия окна */}
          <ComponentKley>
            <CardText>Авторизация</CardText>
            <CardText1>Электронная почта</CardText1>
            <EmailInput type="email" name="email" placeholder="Почта" onChange={handleInputChange} />
            <CardText1>Пароль</CardText1>
            <EmailInput type="password" name="password" placeholder="Пароль" onChange={handleInputChange} />
            <Button type="submit" onClick={handleSubmit}>Авторизация</Button>
            <Button1>Регистрация</Button1>
          </ComponentKley>
        </CardContainer>
      </LoginFormContainer>
    </>
  );
};


export default Auth;
