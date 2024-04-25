from __future__ import annotations

from fastapi import APIRouter, File, UploadFile, status, HTTPException
from fastapi.responses import FileResponse
from schemas import AddProduct, AddProductInform, GetProduct
from services import Product
from typing import Optional

router = APIRouter(tags=["Product"], prefix="/product")


@router.post("/add", response_model=AddProductInform, status_code=status.HTTP_201_CREATED)
async def add_product(data: AddProduct):
    if not data.vendor_code.isnumeric():
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Vendor code should be a number")
    return await Product.add_product(data)


@router.put("/id/{product_id}/addphoto")
async def add_product_photo(product_id: int, photo: UploadFile = File(...)):
    return await Product.change_product_photo(product_id, photo)


@router.delete("/{product_id}/delete")
async def del_product(product_id: int):
    return await Product.del_product(product_id)


@router.get("/id/{product_id}", response_model=Optional[GetProduct])
async def get_product(product_id: int):
    return await Product.get_product(product_id)


@router.get("/vendor_code/{vendor_code}", response_model=Optional[GetProduct])
async def get_product_by_vendor_code(vendor_code: str):
    if not vendor_code.isnumeric():
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Vendor code should be a number")
    return await Product.get_product_by_vendor_code(vendor_code)


@router.get("/author_id/{author_id}", response_model=list[GetProduct])
async def get_product_by_author(author_id: int):
    return await Product.get_product_by_author(author_id)


@router.get("", response_model=list[GetProduct])
async def get_all_products():
    return await Product.get_all_products()


@router.get("/search_query", response_model=list[GetProduct])
async def get_all_products_by_search_query(search_query: str):
    return await Product.get_all_products_by_search_query(search_query)


@router.get("/search_query/sorted_by", response_model=list[GetProduct])
async def get_all_products_by_search_query_sorted_by(search_query: str, sort_by: str):
    return await Product.get_all_products_by_search_query_sorted_by(search_query, sort_by)


@router.get("/sort_by", response_model=list[GetProduct])
async def get_all_products_sorted_by(sort_by: str):
    return await Product.get_all_products_sorted_by(sort_by)


@router.get("/id/{product_id}/photo", response_class=FileResponse)
async def get_product_photo(product_id: int):
    return await Product.get_product_photo(product_id)

