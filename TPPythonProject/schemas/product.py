from pydantic import BaseModel
from typing import Optional


class AddProduct(BaseModel):
    vendor_code: str
    discipline: str
    name: str
    description: Optional[str] = None
    price: float


class AddProductInform(BaseModel):
    status: bool
    product_id: int
    author_id: int


class GetProduct(BaseModel):
    photo: Optional[str]
    id: int
    author_id: int
    vendor_code: str
    discipline: str
    name: str
    description: Optional[str] = None
    price: float
