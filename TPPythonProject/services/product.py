import os
from typing import Sequence
from fastapi import UploadFile
from fastapi.responses import FileResponse
from database import new_session, ProductModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete, Select
from schemas import AddProduct
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
    async def add_product(self, data: AddProduct):
        async with new_session() as session:
            data_dict = data.model_dump()
            product_field = ProductModel(**data_dict, author_id=0)  # добавить author_id после добавления пользователей
            session.add(product_field)
            try:
                await session.flush()
            except IntegrityError:
                return {"status": False, "product_id": -1, "author_id": -1}
            await session.commit()
            return {"status": True, "product_id": product_field.id, "author_id": product_field.author_id}

    @classmethod
    async def add_product_photo(self, product_id: int, photo: UploadFile):
        if photo.content_type != "image/png" and photo.content_type != "image/jpeg":
            return {"status": False}

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
                return {"status": False}
            if product_field.photo is not None:
                os.remove("./" + product_field.photo)
            with open(path, "wb+") as buffer:
                shutil.copyfileobj(photo.file, buffer)
            product_field.photo = path
            await session.flush()
            await session.commit()
            return {"status": True}

    @classmethod
    async def del_product(self, product_id: int):
        async with new_session() as session:
            query = select(ProductModel).filter_by(id=product_id)
            result = await session.execute(query)
            product_field = result.scalars().first()
            if product_field is None:
                return {"status": False}
            path = product_field.photo
            if path is not None:
                os.remove(path)
            query = delete(ProductModel).filter_by(id=product_id)
            await session.execute(query)
            await session.flush()
            await session.commit()
            return {"status": True}

    @classmethod
    async def get_product(self, product_id: int):
        async with new_session() as session:
            query = select(ProductModel).filter_by(id=product_id)
            result = await session.execute(query)
            product_field = result.scalars().first()
            return product_field

    @classmethod
    async def get_product_by_vendor_code(self, vendor_code: str):
        async with new_session() as session:
            query = select(ProductModel).filter_by(vendor_code=vendor_code)
            result = await session.execute(query)
            product_field = result.scalars().first()
            return product_field

    @classmethod
    async def get_product_by_author(self, author_id: int):
        async with new_session() as session:
            query = select(ProductModel).filter_by(author_id=author_id)
            result = await session.execute(query)
            product_field = result.scalars().all()
            return product_field

    @classmethod
    async def get_all_products(self):
        async with new_session() as session:
            query = select(ProductModel)
            result = await session.execute(query)
            product_fields = result.scalars().all()
            return product_fields


    @classmethod
    async def get_all_products_by_search_query(self, search_query: str):
        async with new_session() as session:
            query = select(ProductModel).filter(ProductModel.name.contains(search_query))
            result = await session.execute(query)
            product_fields = result.scalars().all()
            return product_fields


    @classmethod
    async def get_all_products_by_search_query_sorted_by(self, search_query: str, sort_by: str):
        async with new_session() as session:
            query = select(ProductModel).filter(ProductModel.name.contains(search_query))
            query = get_select_sorted_by(query, sort_by)
            result = await session.execute(query)
            product_fields = result.scalars().all()
            return product_fields


    @classmethod
    async def get_product_photo(self, product_id: int):
        async with new_session() as session:
            query = select(ProductModel).filter_by(id=product_id)
            result = await session.execute(query)
            product_field = result.scalars().first()
            if product_field is None:
                return {"status": False}
            if product_field.photo is None:
                return FileResponse("media/nophoto.jpg")
            else:
                return FileResponse(product_field.photo)

    @classmethod
    async def get_all_products_sorted_by(self, sort_by: str) -> Sequence[ProductModel]:
        async with new_session() as session:
            query = select(ProductModel)
            query = get_select_sorted_by(query, sort_by)
            result = await session.execute(query)
            product_fields = result.scalars().all()
            return product_fields
