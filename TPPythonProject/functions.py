from fastapi import HTTPException, status, Request
from database import new_session, UserModel
from schemas import UserCookie
from sqlalchemy import select
import jwt


class Functions:
    @classmethod
    async def get_user_id_and_role(cls, request: Request):
        token = request.cookies.get("token")
        if token is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Login cookie was not found",
            )
        key = "manilovefishing"
        cookie_dict: dict = jwt.decode(token, key, algorithms=["HS256"])
        cookie: UserCookie = UserCookie(**cookie_dict)
        async with new_session() as session:
            query = select(UserModel).filter_by(email=cookie.email)
            result = await session.execute(query)
            user = result.scalars().first()
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User cookie is outdated",
                )
            user_role = user.role
            user_id = user.id
            acc_info = {"user_role": user_role, "user_id": user_id}
        return acc_info
