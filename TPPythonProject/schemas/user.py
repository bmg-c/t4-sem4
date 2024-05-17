from pydantic import BaseModel, EmailStr
from field_types import Id, Nickname, Role


class GetUser(BaseModel):
    id: int = Id
    blocked: bool
    role: Role
    nickname: Nickname
    email: EmailStr
