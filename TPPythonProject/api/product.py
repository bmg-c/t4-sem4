from fastapi import APIRouter
from schemas import AddProduct, AddProductInform, GetProduct, Inform
from services import Product
from typing import Optional

router = APIRouter(tags=["Product"], prefix="/product")


@router.post("/add", response_model=AddProductInform)
async def add_product(data: AddProduct):
    return await Product.add_product(data)


@router.delete("/{product_id}/delete", response_model=Inform)
async def del_product(product_id: int):
    return await Product.del_product(product_id)


@router.get("/id/{product_id}", response_model=Optional[GetProduct])
async def get_product(product_id: int):
    return await Product.get_product(product_id)


@router.get("/vendor_code/{vendor_code}", response_model=Optional[GetProduct])
async def get_product_by_vendor_code(vendor_code: int):
    return await Product.get_product_by_vendor_code(vendor_code)


@router.get("/author_id/{author_id}", response_model=list[GetProduct])
async def get_product_by_author(author_id: int):
    return await Product.get_product_by_author(author_id)


@router.get("", response_model=list[GetProduct])
async def get_all_products():
    return await Product.get_all_products()
