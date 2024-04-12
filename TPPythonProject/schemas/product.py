from pydantic import BaseModel
from typing import Optional


class AddProduct(BaseModel):
    vendor_code: int
    discipline: str
    name: str
    description: Optional[str] = None
    price: float


class AddProductInform(BaseModel):
    status: bool
    product_id: int
    author_id: int


class GetProduct(BaseModel):
    id: int
    author_id: int
    vendor_code: int
    discipline: str
    name: str
    description: Optional[str] = None
    price: float
