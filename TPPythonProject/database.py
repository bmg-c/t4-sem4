from sqlalchemy import ForeignKey
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import Optional
from datetime import date

engine = create_async_engine("sqlite+aiosqlite:///./site.db")
new_session = async_sessionmaker(engine, expire_on_commit=False)


class Model(DeclarativeBase):
    pass


class UserModel(Model):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    blocked: Mapped[bool]
    role: Mapped[str]
    nickname: Mapped[str]
    photo: Mapped[Optional[str]]
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]

    purchase_history: Mapped[list["PurchaseHistoryModel"]] = relationship()
    products: Mapped[list["ProductModel"]] = relationship()


class PurchaseHistoryModel(Model):
    __tablename__ = "purchase_history"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"))
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))
    date: Mapped[date]

    product: Mapped["ProductModel"] = relationship()


class ProductModel(Model):
    __tablename__ = "product"

    id: Mapped[int] = mapped_column(primary_key=True)
    author_id: Mapped[int] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"))
    blocked: Mapped[bool]
    photo: Mapped[Optional[str]]
    vendor_code: Mapped[str] = mapped_column(unique=True)
    discipline: Mapped[str]
    name: Mapped[str]
    description: Mapped[Optional[str]]
    price: Mapped[float]


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Model.metadata.create_all)
