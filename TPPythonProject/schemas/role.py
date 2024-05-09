from pydantic import BaseModel, EmailStr
from .field_types import Role


class ChangeRole(BaseModel):
    email: EmailStr
    new_role: Role

class ChangeUserBlockStatus(BaseModel):
    email: EmailStr
    new_blocked: bool

