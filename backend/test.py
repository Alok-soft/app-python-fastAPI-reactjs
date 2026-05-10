import time
import asyncio
import requests

async def task1():
    print('Downloading1 Starting...')
    await asyncio.sleep(1)
    url = 'https://images.pexels.com/photos/2776479/pexels-photo-2776479.jpeg'
    image1 = requests.get(url)
    open('image1.jpeg', 'wp').write(image1.content)
    print('Downloading1 Complete')
    return 'Done1'

async def task2():
    print('Hello2')
    await asyncio.sleep(1)
    url = 'https://images.pexels.com/photos/2776479/pexels-photo-2776479.jpeg'
    image2 = requests.get(url)
    open('image2.jpeg', 'wp').write(image2.content)
    print('Bye2')
    return 'Done2'


async def main():
    # ret = await asyncio.gather(
    #     task1(),
    #     task2()
    # )

    # print(ret)
    t1 = asyncio.create_task(task1())
    t2 = asyncio.create_task(task2())

    tr1 = await t1
    tr2 = await t2


asyncio.run(main())
