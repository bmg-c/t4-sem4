from fastapi import UploadFile, HTTPException, status
from fastapi.responses import FileResponse
from database import new_session, UserModel
from schemas import AddUser, GetUser
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete, Select
from uuid import uuid4
import shutil
import os


class User:
    @classmethod
    async def add_user(cls, data: AddUser):
        async with new_session() as session:
            data_dict = data.model_dump()
            user_field = UserModel(nickname=data_dict["nickname"], email=data_dict["email"],
                                   password=data_dict["password"], blocked=False, role="Студент")
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
    async def change_user_nickname(cls, user_id: int, nickname: str):
        async with new_session() as session:
            query = select(UserModel).filter_by(id=user_id)
            result = await session.execute(query)
            user_field = result.scalars().first()
            if user_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="User with this user id does not exist")
            user_field.nickname = nickname
            await session.flush()
            await session.commit()
            return {}

    @classmethod
    async def change_user_photo(cls, user_id: int, photo: UploadFile):
        if photo.content_type != "image/png" and photo.content_type != "image/jpeg":
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                                detail="File should be one of these image types: png, jpg, jpeg")

        if photo.content_type == "image/png":
            photo.filename = str(uuid4()) + ".png"
        else:
            photo.filename = str(uuid4()) + ".jpg"
        path = f"media/{photo.filename}"

        async with new_session() as session:
            query = select(UserModel).filter_by(id=user_id)
            result = await session.execute(query)
            user_field = result.scalars().first()
            if user_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="User with this user id does not exist")
            if user_field.photo is not None:
                os.remove("./" + user_field.photo)
            with open(path, "wb+") as buffer:
                shutil.copyfileobj(photo.file, buffer)
            user_field.photo = path
            await session.flush()
            await session.commit()
            return {}

    @classmethod
    async def change_user_password(cls, user_id: int, password: str):
        async with new_session() as session:
            query = select(UserModel).filter_by(id=user_id)
            result = await session.execute(query)
            user_field = result.scalars().first()
            if user_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="User with this user id does not exist")
            user_field.password = password
            await session.flush()
            await session.commit()
            return {}

    @classmethod
    async def change_user_block_status(cls, user_id: int, blocked: bool):
        async with new_session() as session:
            query = select(UserModel).filter_by(id=user_id)
            result = await session.execute(query)
            user_field = result.scalars().first()
            if user_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="User with this user id does not exist")
            user_field.blocked = blocked
            await session.flush()
            await session.commit()
            return {}

    @classmethod
    async def get_user(cls, user_id: int):
        async with new_session() as session:
            query = select(UserModel).filter_by(id=user_id)
            result = await session.execute(query)
            user_field = result.scalars().first()
            if user_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="User with this user id does not exist")
            return GetUser(id=user_id, blocked=user_field.blocked, role=user_field.role,
                           nickname=user_field.nickname, email=user_field.email)

    @classmethod
    async def get_user_photo(cls, user_id: int):
        async with new_session() as session:
            query = select(UserModel).filter_by(id=user_id)
            result = await session.execute(query)
            user_field = result.scalars().first()
            if user_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="User with this user id has not been found")
            if user_field.photo is None:
                return FileResponse("media/nophoto.jpg")
            else:
                return FileResponse(user_field.photo)
