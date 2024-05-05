from fastapi import APIRouter

from api.product import router as product_router
from api.user import router as user_router
from api.auth import router as auth_router
from api.role import router as role_router

router = APIRouter(prefix="/api")

router.include_router(product_router)
router.include_router(user_router)
router.include_router(auth_router)
router.include_router(role_router)
