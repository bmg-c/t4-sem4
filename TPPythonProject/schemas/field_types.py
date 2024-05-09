from typing_extensions import Annotated, Literal
from pydantic import StringConstraints, Field

PasswordStr = Annotated[str, StringConstraints(min_length=8, max_length=16,
                     pattern=r'^[A-Za-z0-9!#$%&*+-.<=>?@^_]+$')]

Discipline = Literal["Математика", "Программирование", "ООП"]

Role = Literal["Студент", "Тьютор", "Админ"]

Price = Field(ge=1.0, le=100000.0)
