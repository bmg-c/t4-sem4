from pydantic import BaseModel


class GetUser(BaseModel):
    id: int
    role: str
    nickname: str
    email: str
