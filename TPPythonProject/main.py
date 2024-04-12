from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import create_tables
import os


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not os.path.isfile("./site.db"):
        await create_tables()
    yield

app = FastAPI(lifespan=lifespan)
