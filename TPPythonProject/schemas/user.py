from pydantic import BaseModel


class GetUser(BaseModel):
    id: int
    blocked: bool
    role: str
    nickname: str
    email: str
