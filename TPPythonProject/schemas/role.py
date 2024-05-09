from typing import Optional
from pydantic import BaseModel, EmailStr
from .field_types import Role, Price, Discipline


class ChangeRole(BaseModel):
    email: EmailStr
    new_role: Role


class ChangeUserBlockStatus(BaseModel):
    email: EmailStr
    new_blocked: bool


class ChangeProductContents(BaseModel):
    product_id: int
    price: float = Price
    name: str
    description: Optional[str]
    discipline: Discipline

