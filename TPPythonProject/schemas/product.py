from pydantic import BaseModel, Field
from typing import Optional, Literal


disciplines = Literal["Математика", "Программирование", "ООП"]


class AddProduct(BaseModel):
    vendor_code: str
    discipline: disciplines
    name: str
    description: Optional[str] = None
    price: float = Field(ge=1.0, le=100000.0)



class AddProductInform(BaseModel):
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

