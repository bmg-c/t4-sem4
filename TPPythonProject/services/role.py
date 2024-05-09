from fastapi import HTTPException, status, Request
from database import ProductModel, new_session, UserModel
from schemas import Inform, ChangeRole, UserCookie, ChangeUserBlockStatus
from sqlalchemy import select
import jwt

from schemas.role import ChangeProductContents


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

    @classmethod
    async def change_product_contents(cls, request: Request, data: ChangeProductContents):
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
            user_id = user.id

        if user_role == "Студент":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User doesn't have sufficient rights for this action"
            )

        async with new_session() as session:
            query = select(ProductModel).filter_by(id=data.product_id)
            result = await session.execute(query)
            product = result.scalars().first()
            if product is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Product with this id does not exist"
                )
            author_id = product.author_id

            if author_id != user_id and user_role != "Админ":
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="User doesn't have sufficient rights for this action"
                )

            product.price = data.price
            product.name = data.name
            product.discipline = data.discipline
            product.description = data.description
            
            await session.flush()
            await session.commit()
            return Inform(detail="Successfully changed product contents")

