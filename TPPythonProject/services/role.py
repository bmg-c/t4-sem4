from fastapi import HTTPException, status, Request
from database import new_session, UserModel
from schemas import Inform, ChangeRole, UserCookie, ChangeUserBlockStatus
from sqlalchemy import select
import jwt


class Role:
    @classmethod
    async def change_role(cls, request: Request, data: ChangeRole):
        token = request.cookies.get('token')
        if token is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Login cookie was not found"
            )
        key = 'manilovefishing'
        cookie_dict: dict = jwt.decode(token, key, algorithms=["HS256"])
        cookie: UserCookie = UserCookie(**cookie_dict)
        user_role = ""
        async with new_session() as session:
            query = select(UserModel).filter_by(email=cookie.email)
            result = await session.execute(query)
            user = result.scalars().first()
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User cookie is outdated"
                )
            user_role = user.role

        if user_role != "Админ":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User doesn't have sufficient rights for this action"
            )

        async with new_session() as session:
            query = select(UserModel).filter_by(email=data.email)
            result = await session.execute(query)
            user = result.scalars().first()
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this email does not exist"
                )
            user.role = data.new_role
            await session.flush()
            await session.commit()
            return Inform(detail="Successfully changed user role")

    @classmethod
    async def change_role_unsafe(cls, data: ChangeRole):
        async with new_session() as session:
            query = select(UserModel).filter_by(email=data.email)
            result = await session.execute(query)
            user = result.scalars().first()
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this email does not exist"
                )
            user.role = data.new_role
            await session.flush()
            await session.commit()
            return Inform(detail="Successfully changed user role")

    @classmethod
    async def change_user_block_status(cls, request: Request, data: ChangeUserBlockStatus):
        token = request.cookies.get('token')
        if token is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Login cookie was not found"
            )
        key = 'manilovefishing'
        cookie_dict: dict = jwt.decode(token, key, algorithms=["HS256"])
        cookie: UserCookie = UserCookie(**cookie_dict)
        user_role = ""
        async with new_session() as session:
            query = select(UserModel).filter_by(email=cookie.email)
            result = await session.execute(query)
            user = result.scalars().first()
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User cookie is outdated"
                )
            user_role = user.role

        if user_role != "Админ":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User doesn't have sufficient rights for this action"
            )

        async with new_session() as session:
            query = select(UserModel).filter_by(email=data.email)
            result = await session.execute(query)
            user = result.scalars().first()
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User with this email does not exist"
                )
            user.blocked = data.new_blocked
            await session.flush()
            await session.commit()
            return Inform(detail="Successfully changed user block status")

