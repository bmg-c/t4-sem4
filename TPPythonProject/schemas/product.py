from pydantic import BaseModel
from .field_types import Discipline, Id, PhotoPath, Price, ProductDescrition, ProductName, VendorCode



class AddProduct(BaseModel):
    vendor_code: VendorCode
    discipline: Discipline
    name: ProductName
    description: ProductDescrition = None
    price: float = Price


class AddProductInform(BaseModel):
    product_id: int = Id
    author_id: int = Id


class GetProduct(BaseModel):
    photo: PhotoPath
    id: int = Id
    author_id: int = Id
    blocked: bool
    vendor_code: VendorCode
    discipline: Discipline
    name: ProductName
    description: ProductDescrition = None
    price: float = Price

