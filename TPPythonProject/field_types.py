from typing import Optional
from typing_extensions import Annotated, Literal
from pydantic import StringConstraints, Field

PasswordStr = Annotated[
    str,
    StringConstraints(
        min_length=8, max_length=16, pattern=r"^[A-Za-z0-9!#$%&*+-.<=>?@^_]+$"
    ),
]

Discipline = Literal["Математика", "Программирование", "ООП"]

Role = Literal["Студент", "Тьютор", "Админ"]

Price = Field(ge=1.0, le=100000.0)

VendorCode = Annotated[
    str, StringConstraints(min_length=6, max_length=6, pattern=r"^[0-9]")
]

ProductName = Annotated[str, StringConstraints(min_length=1, max_length=32)]

ProductDescrition = Optional[
    Annotated[str, StringConstraints(min_length=1, max_length=600)]
]

Nickname = Annotated[str, StringConstraints(min_length=0, max_length=24)]

Id = Field(ge=1)

PhotoPath = Optional[str]
