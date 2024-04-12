from pydantic import BaseModel


class Inform(BaseModel):
    status: bool
