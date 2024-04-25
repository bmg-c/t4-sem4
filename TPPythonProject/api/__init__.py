from fastapi import APIRouter

from api.product import router as product_router
from api.user import router as user_router

router = APIRouter(prefix="/api")

router.include_router(product_router)
router.include_router(user_router)
