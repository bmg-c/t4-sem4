from pydantic import BaseModel
from typing import Optional
from .field_types import Discipline, Price



class AddProduct(BaseModel):
    vendor_code: str
    discipline: Discipline
    name: str
    description: Optional[str] = None
    price: float = Price


class AddProductInform(BaseModel):
    product_id: int
    author_id: int


class GetProduct(BaseModel):
    photo: Optional[str]
    id: int
    author_id: int
    blocked: bool
    vendor_code: str
    discipline: Discipline
    name: str
    description: Optional[str] = None
    price: float = Price

