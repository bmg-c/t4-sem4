from pydantic import BaseModel


class AddUser(BaseModel):
    nickname: str
    email: str
    password: str
    repeat_password: str


class GetUser(BaseModel):
    id: int
    blocked: bool
    role: str
    nickname: str
    email: str
