from typing_extensions import Annotated
from pydantic import BaseModel, StringConstraints, EmailStr


PasswordStr = Annotated[str, StringConstraints(min_length=8, max_length=16,
                     pattern=r'^[A-Za-z0-9!#$%&*+-.<=>?@^_]+$')]


class UserCookie(BaseModel):
    id: int
    email: EmailStr
    blocked: bool
    role: str
    nickname: str


class Register(BaseModel):
    email: EmailStr = 'mail@email.com'
    password: PasswordStr = 'aoeuidhtn'
    re_password: PasswordStr = 'aoeuidhtn'


class Login(BaseModel):
    email: EmailStr = 'mail@email.com'
    password: PasswordStr = 'aoeuidhtn'


# class ValidateCode(BaseModel):
#     email: EmailStr = 'mail@email.com'
#     code: str
#
#
# class Recover(BaseModel):
#     email: EmailStr = 'mail@email.com'
#     code: str
#     new_password: PasswordStr = 'aoeuidhtn'
#     re_new_password: PasswordStr = 'aoeuidhtn'
