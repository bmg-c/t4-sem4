from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from typing import Optional


engine = create_async_engine(
    "sqlite+aiosqlite:///./site.db"
)
new_session = async_sessionmaker(engine, expire_on_commit=False)


class Model(DeclarativeBase):
    pass


class ProductModel(Model):
    __tablename__ = "product"

    id: Mapped[int] = mapped_column(primary_key=True)
    author_id: Mapped[int]
    photo: Mapped[Optional[str]]
    vendor_code: Mapped[str] = mapped_column(unique=True)
    discipline: Mapped[str]
    name: Mapped[str]
    description: Mapped[Optional[str]]
    price: Mapped[float]


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Model.metadata.create_all)

