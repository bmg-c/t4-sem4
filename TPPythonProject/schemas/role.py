from pydantic import BaseModel, EmailStr
from field_types import Id, ProductDescrition, ProductName, Role, Price, Discipline


class ChangeRole(BaseModel):
    email: EmailStr
    new_role: Role


class ChangeUserBlockStatus(BaseModel):
    email: EmailStr
    new_blocked: bool


class ChangeProductContents(BaseModel):
    product_id: int = Id
    price: float = Price
    name: ProductName
    description: ProductDescrition
    discipline: Discipline
