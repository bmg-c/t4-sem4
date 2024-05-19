//import React, { useEffect, useRef} from 'react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ContactSection from './UnderPanel';
import logo1 from './Logo.png';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


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
// const StyledButton2 = styled.button`
// font-size: 16px;
// background-color: transparent;
// border: none;
// color: white;
// margin-right: 270px;
// margin-top: 15px;
// white-space: nowrap;
// cursor: pointer;
// border-radius: 4px;
// padding: 10px 10px;
// background-color: #36274C;
// `;

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
const FileInput = styled.input`
  margin: 20px 0;
  margin-left: 23px;
  margin-top: 20px;
  height: 20px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 620px;
  background-color: white;
  color: black;
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

const CardContainer = styled.div`
    background-color: #3C388D;
    width: 700px;
    height: 300px;
    margin-top: -410px;
    margin-left: auto;
    margin-right: 100px;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;   
`;
const CardText0 = styled.p`
  width: 400px;
  height: 400px;
  margin-left: 200px;
  display: flex;
  justify-content: center; 
  align-items: center;
  
`;
const EmailInput = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: 23px;
  
  margin-top: 20px;
  width: 620px;
  height: 20px;
`;
const StyledButton3 = styled.button`
font-size: 16px;
background-color: transparent;
border: none;
color: white;
margin-left: 950px;
margin-top: 15px;
white-space: nowrap;
cursor: pointer;
border-radius: 4px;
padding: 10px 10px;
background-color: #36274C;
`;
const Button = styled.button`
  font-size: 16px;
  padding: 10px;
  margin-left: 60px;
  margin-right: 60px;
  background-color: #55c75a;
  color: white;
  border: none;
  margin-top: 70px;
  border-radius: 4px;
  cursor: pointer;
  width: 260px;
  height: 50px;
`;
const Inline= styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;


const ContactSectionContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const BlueRectangleCardLC = ({ userData }) => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate(`/catalog/${userData.id}`);
  };
  const handleLogoutClick = () =>{
    navigate('/');
  };
  const handleMyServicesClick = () => {
    navigate(`/myservices/${userData.id}`);
  };
  const handlePersonalDataClick = () => {
    navigate(`/percacc/${userData.id}`);
  };

  return (
    <div style={{ width: '100%', height: '150px', backgroundColor: '#3C388D', position: 'fixed', top: 0, left: 0 }}>
      <InlineText1>
        <Logo src={logo1} alt="Логотип 1" onClick={handleLogoClick} />
        <ContactInfoContainer>
          <ContactDetails>Контактные данные:</ContactDetails>
          <PhoneNumber>+88525485476</PhoneNumber>
        </ContactInfoContainer>
        <div><StyledButton>Личный кабинет</StyledButton></div>
      </InlineText1>
      <InlineText2>
        <div><StyledButton2 onClick={handlePersonalDataClick}>Личные данные</StyledButton2></div>
        <div><StyledButton2>История покупок</StyledButton2></div>
        {userData.role === "Тьютор" && <div><StyledButton2 onClick={handleMyServicesClick}>Мои услуги</StyledButton2></div>}
        <div><StyledButton2 onClick={handleLogoutClick}>Выход из аккаунта</StyledButton2></div>
      </InlineText2>
    </div>
  );
}
  const LCData = ({ userData, userEmail, userName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userPhoto, setUserPhoto] = useState(`http://127.0.0.1:8000/api/user/id/${userData.id}/photo`);
    useEffect(() => {
      const fetchUserPhoto = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/user/id/${userData.id}/photo`);
          setUserPhoto(response.data); // Устанавливаем фото пользователя из ответа
        } catch (error) {
          console.error('Ошибка при получении фотографии пользователя:', error);
        }
      };

      fetchUserPhoto();
    }, [userData.id]); // Запрос фотографии при изменении данных пользователя

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleSaveClick = async () => {
      try {
        // Обновление никнейма
        const responseNickname = await axios.put(`http://127.0.0.1:8000/api/user/id/${userData.id}/change_nickname?nickname=${newUserName}`, {
          nickname: newUserName
        });

        console.log('Response (Nickname):', responseNickname);

        // Обновление фото
        if (selectedFile) {
          const formData = new FormData();
          formData.append('photo', selectedFile);

          const responsePhoto = await axios.put(`http://127.0.0.1:8000/api/user/id/${userData.id}/change_photo`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          console.log('Response (Photo):', responsePhoto);
        }

        if (responseNickname.status === 200) {
          alert('Данные успешно обновлены');
          window.location.reload();
        } else {
          console.error('Ошибка обновления данных:', responseNickname.data);
          alert('Ошибка обновления данных');
        }
      } catch (error) {
        console.error('Error updating user data:', error.response ? error.response.data : error.message);
        alert('Ошибка при обновлении данных пользователя. Попробуйте еще раз.');
      }

      setIsEditing(false);
    };

    const handleNameChange = (e) => {
      setNewUserName(e.target.value);
    };

    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };

    return (
      <div style={{ width: '100%', height: '100px', position: 'fixed', top: 150, left: 0 }}>
        <CardText0>
          <img src={userPhoto} alt="User" style={{ width: '400px', height: '400px', objectFit: 'cover' }} />
        </CardText0>
        <CardContainer>
          {isEditing ? (
            <>
              <EmailInput type="text" placeholder="Имя" value={newUserName} onChange={handleNameChange} />
              <FileInput type="file" onChange={handleFileChange} />
              <Button onClick={handleSaveClick}>Сохранить изменения</Button>
            </>
          ) : (
            <>
              <EmailInput type="text" placeholder="Имя" value={userName} readOnly />
              <EmailInput type="email" placeholder="Почта" value={userEmail} readOnly />
              <Inline>
                <Button onClick={handleEditClick}>Изменение личных данных</Button>
                <Button>Изменение пароля</Button>
              </Inline>
            </>
          )}
        </CardContainer>
        {userData.role === "Тьютор" ? (
          <StyledButton3>Вы являетесь тьютором</StyledButton3>
        ) : (
          <StyledButton3>Пройти верификацию на тьютора</StyledButton3>
        )}
      </div>
    );
  };

  const Percacc = () => {
    const { userId } = useParams(); 
    const [userData, setUserData] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/user/id/${userId}`);
          const userDataFromAPI = response.data;
          const userEmailFromAPI = response.data.email;
          const userNickFromAPI = response.data.nickname;
          setUserName(userNickFromAPI);
          setUserData(userDataFromAPI);
          setUserEmail(userEmailFromAPI);
          
          
        } catch (error) {
          console.error('Ошибка при получении данных пользователя:', error);
        }
      };

      fetchUserData();
    }, [userId]);

    return (
      <div style={{ paddingTop: '150px' }}>
        {userData ? (
          <>
            <BlueRectangleCardLC userData={userData} />
            {/* Pass userPhoto state to LCData component */}
            <LCData userData={userData} userEmail={userEmail} userName={userName} />
          </>
        ) : (
          <p>Загрузка данных...</p>
        )}
        <ContactSectionContainer>
          <ContactSection />
        </ContactSectionContainer>
      </div>
    );
  };
  export default Percacc;



