import asyncio
from functions import Functions


async def main():
    task = asyncio.create_task(Functions.change_user_role_safe(2, "Админ"))
    await task

if __name__ == "__main__":
    asyncio.run(main())
