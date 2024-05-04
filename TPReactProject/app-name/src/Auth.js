import styled from 'styled-components';
import React from 'react';

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
  margin-top: 4px; /*-20*/
`;
const CardText1 = styled.p`
  font-size: 12px;
  color: white;
  margin-left: 23px;
  margin-top: 20px;
`;

const ComponentKley  = styled.p`
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
    margin-left: 23px;
    margin-top: 25px;
    font-size: 16px;
    padding: 15px;
    width: 150px;
    margin-left: 47px;
    background-color: #EAEAEA
    color: black;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 8px;
`;
class Authoriz extends React.Component{
    render() {
      return (
        <CardContainer>
            <ComponentKley>     
                <CardText>Авторизация</CardText>
                <CardText1>Электронная почта</CardText1>
                <EmailInput type="email" placeholder="Почта" />
                <CardText1>Пароль</CardText1>
                <EmailInput type="Пароль" placeholder="Пароль" />
                <Button>Вход</Button>
                <Button1>Регистрация</Button1>
            </ComponentKley>  
        </CardContainer>
      );
    }
  }

export default class Auth extends React.Component{
    render(){
      return(
        <div style={{  }}>
        <Authoriz/>
        </div>
      );
    }
  }
  