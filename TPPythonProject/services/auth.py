from fastapi import UploadFile, HTTPException, status, Response, Request
from fastapi.responses import FileResponse, JSONResponse
from database import new_session, UserModel
from schemas import Register, GetUser, Login, UserCookie, Inform
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete, Select
from uuid import uuid4
import jwt


class Auth:
    @classmethod
    async def register(cls, data: Register):
        async with new_session() as session:
            user_field = UserModel(nickname="", email=data.email,
                                   password=data.password, blocked=False, role="Студент")
            session.add(user_field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(status.HTTP_400_BAD_REQUEST,
                                    "Can't add user to the database, possible: email exists")
            await session.commit()
            return GetUser(id=user_field.id, blocked=user_field.blocked, role=user_field.role,
                           nickname=user_field.nickname, email=user_field.email)
    
    @classmethod
    async def login(cls, data: Login):
        async with new_session() as session:
            query = select(UserModel).filter_by(email=data.email, password=data.password)
            result = await session.execute(query)
            user = result.scalars().first()
            if user is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="This user does not exist")

            key = 'manilovefishing'
            response = JSONResponse(GetUser(id=user.id, blocked=user.blocked, role=user.role,
                           nickname=user.nickname, email=user.email).model_dump(), 200)
            response.set_cookie(
                key='token',
                value=jwt.encode(
                    payload=UserCookie(
                        id=user.id,
                        blocked=user.blocked,
                        role=user.role,
                        nickname=user.nickname,
                        email=user.email).model_dump(), 
                    key=key,
                    algorithm='HS256'
                )
            )
            return response

    @classmethod
    async def logout(cls, request: Request, response: Response):
        token = request.cookies.get('token')
        if token is None:
            return JSONResponse(Inform(detail="Logged out").model_dump(), 200)
        response = JSONResponse(Inform(detail="Logged out").model_dump(), 200)
        response.delete_cookie('token')
        return response

    @classmethod
    async def get_user_cookie_contents(cls, request: Request):
        token = request.cookies.get('token')
        if token is None:
            return JSONResponse(Inform(detail="Login cookie was not found").model_dump(), 400)
        key = 'manilovefishing'
        cookie: UserCookie = jwt.decode(token, key, algorithms=["HS256"])
        return cookie
