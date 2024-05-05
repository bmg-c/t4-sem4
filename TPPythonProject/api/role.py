from fastapi import APIRouter, status, Request
from schemas import ChangeRole, Inform
from services import Role


router = APIRouter(tags=["Role"], prefix="/role")


@router.post("/admin/change_role", response_model=Inform, status_code=status.HTTP_200_OK)
async def change_role(request: Request, data: ChangeRole):
    return await Role.change_role(request, data)


@router.post("/admin/change_role_unsafe", response_model=Inform, status_code=status.HTTP_200_OK)
async def change_role_unsafe(data: ChangeRole):
    return await Role.change_role_unsafe(data)
