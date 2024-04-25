import os
from typing import Sequence
from fastapi import UploadFile, HTTPException, status
from fastapi.responses import FileResponse
from database import new_session, ProductModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete, Select
from schemas import AddProduct, AddProductInform
from uuid import uuid4
import shutil


def get_select_sorted_by(sel: Select, sort_by: str) -> Select:
    match sort_by:
        case "ascending_price":
            return sel.order_by(ProductModel.price)
        case "descending_price":
            return sel.order_by(ProductModel.price.desc())
        case "name" | _:
            return sel.order_by(ProductModel.name)



class Product:
    @classmethod
    async def add_product(cls, data: AddProduct):
        async with new_session() as session:
            data_dict = data.model_dump()
            product_field = ProductModel(**data_dict, author_id=1, blocked=False)  # добавить author_id после добавления пользователей
            session.add(product_field)
            try:
                await session.flush()
            except IntegrityError:
                raise HTTPException(status.HTTP_400_BAD_REQUEST, "Can't add product to the database, possible: vendor_code exists")
            await session.commit()
            return AddProductInform(product_id=product_field.id, author_id=product_field.author_id)

    @classmethod
    async def change_product_photo(cls, product_id: int, photo: UploadFile):
        if photo.content_type != "image/png" and photo.content_type != "image/jpeg":
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="File should be one of these image types: png, jpg, jpeg")

        if photo.content_type == "image/png":
            photo.filename = str(uuid4()) + ".png"
        else:
            photo.filename = str(uuid4()) + ".jpg"
        path = f"media/{photo.filename}"

        async with new_session() as session:
            query = select(ProductModel).filter_by(id=product_id)
            result = await session.execute(query)
            product_field = result.scalars().first()
            if product_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product with this product id does not exist")
            if product_field.photo is not None:
                os.remove("./" + product_field.photo)
            with open(path, "wb+") as buffer:
                shutil.copyfileobj(photo.file, buffer)
            product_field.photo = path
            await session.flush()
            await session.commit()
            return {}

    @classmethod
    async def change_product_block_status(cls, product_id: int, blocked: bool):
        async with new_session() as session:
            query = select(ProductModel).filter_by(id=product_id)
            result = await session.execute(query)
            product_field = result.scalars().first()
            if product_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail="Product with this product id does not exist")
            product_field.blocked = blocked
            await session.flush()
            await session.commit()
            return {}

    @classmethod
    async def del_product(cls, product_id: int):
        async with new_session() as session:
            query = select(ProductModel).filter_by(id=product_id)
            result = await session.execute(query)
            product_field = result.scalars().first()
            if product_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product with this product id does not exist")
            path = product_field.photo
            if path is not None:
                os.remove(path)
            query = delete(ProductModel).filter_by(id=product_id)
            await session.execute(query)
            await session.flush()
            await session.commit()
            return {}

    @classmethod
    async def get_product(cls, product_id: int):
        async with new_session() as session:
            query = select(ProductModel).filter_by(id=product_id)
            result = await session.execute(query)
            product_field = result.scalars().first()
            if product_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product with this product id does not exist")
            return product_field

    @classmethod
    async def get_product_by_vendor_code(cls, vendor_code: str):
        async with new_session() as session:
            query = select(ProductModel).filter_by(vendor_code=vendor_code)
            result = await session.execute(query)
            product_field = result.scalars().first()
            if product_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product with this vendor code does not exist")
            return product_field

    @classmethod
    async def get_product_by_author(cls, author_id: int):
        async with new_session() as session:
            query = select(ProductModel).filter_by(author_id=author_id)
            result = await session.execute(query)
            product_field = result.scalars().all()
            return product_field

    @classmethod
    async def get_all_products(cls):
        async with new_session() as session:
            query = select(ProductModel)
            result = await session.execute(query)
            product_fields = result.scalars().all()
            return product_fields


    @classmethod
    async def get_all_products_by_search_query(cls, search_query: str):
        async with new_session() as session:
            query = select(ProductModel).filter(ProductModel.name.contains(search_query))
            result = await session.execute(query)
            product_fields = result.scalars().all()
            return product_fields


    @classmethod
    async def get_all_products_by_search_query_sorted_by(cls, search_query: str, sort_by: str):
        async with new_session() as session:
            query = select(ProductModel).filter(ProductModel.name.contains(search_query))
            query = get_select_sorted_by(query, sort_by)
            result = await session.execute(query)
            product_fields = result.scalars().all()
            return product_fields


    @classmethod
    async def get_product_photo(cls, product_id: int):
        async with new_session() as session:
            query = select(ProductModel).filter_by(id=product_id)
            result = await session.execute(query)
            product_field = result.scalars().first()
            if product_field is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product with this product id has not been found")
            if product_field.photo is None:
                return FileResponse("media/nophoto.jpg")
            else:
                return FileResponse(product_field.photo)

    @classmethod
    async def get_all_products_sorted_by(cls, sort_by: str) -> Sequence[ProductModel]:
        async with new_session() as session:
            query = select(ProductModel)
            query = get_select_sorted_by(query, sort_by)
            result = await session.execute(query)
            product_fields = result.scalars().all()
            return product_fields

