from pydantic import BaseModel
from typing import Optional


class ProductAdd(BaseModel):
    # author_id: int
    vendor_code: int
    discipline: str
    name: str
    description: Optional[str] = None
    price: float
    # popularity: int


class ProductGet(BaseModel):
    id: int
    # author_id: int
    vendor_code: int
    discipline: str
    name: str
    description: Optional[str] = None
    price: float
    # popularity: int
