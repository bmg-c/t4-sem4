from database import new_session, ProductModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select, delete
from schemas import AddProduct



class Product:
    @classmethod
    async def add_product(self, data: AddProduct):
        async with new_session() as session:
            data_dict = data.model_dump()
            product_field = ProductModel(**data_dict, author_id=0) # добавить author_id после добавления пользователей
            session.add(product_field)
            try:
                await session.flush()
            except IntegrityError:
                return {"status": False, "product_id": -1, "author_id": -1}
            await session.commit()
            return {"status": True, "product_id": product_field.id, "author_id": product_field.author_id}

    @classmethod
    async def del_product(self, product_id: int):
        async with new_session() as session:
            query = delete(ProductModel).filter_by(id=product_id)
            result = await session.execute(query)
            if (result.rowcount <= 0):
                return {"status": False}
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
    async def get_product_by_vendor_code(self, vendor_code: int):
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
