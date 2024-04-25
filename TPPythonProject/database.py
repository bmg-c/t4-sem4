from sqlalchemy import ForeignKey
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import Optional


engine = create_async_engine(
    "sqlite+aiosqlite:///./site.db"
)
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

    purchase_history: Mapped["PurchaseHistoryModel"] = relationship()
    products: Mapped[list["ProductModel"]] = relationship()


class PurchaseHistoryModel(Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), ondelete="CASCADE")
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))
    order_number: Mapped[int]
    date: Mapped[str]

    product: Mapped["ProductModel"] = relationship()


class ProductModel(Model):
    __tablename__ = "product"

    id: Mapped[int] = mapped_column(primary_key=True)
    author_id: Mapped[int] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"))
    photo: Mapped[Optional[str]]
    vendor_code: Mapped[str] = mapped_column(unique=True)
    discipline: Mapped[str]
    name: Mapped[str]
    description: Mapped[Optional[str]]
    price: Mapped[float]

    author: Mapped["UserModel"] = relationship()


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Model.metadata.create_all)

