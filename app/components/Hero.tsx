import Image from 'next/image'
import { client, urlFor } from '../lib/sanity'
import Link from 'next/link'

async function getData() {
  const query = "*[_type == 'heroImage'][0]"

  const data = await client.fetch(query)

  return data
}

export default async function Hero() {
  const data = await getData()
  return (
    <section className='max-w-2xl px-4 mx-auto sm:pb-6 lg:max-w-7xl lg:px-8'>
      <div className='flex flex-wrap justify-between mb-8 md:mb-16'>
        <div className='flex flex-col justify-center w-full mb-6 sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48'>
          <h1 className='mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl'>Top Sellers</h1>
          <p className='max-w-md leading-relaxed text-gray-500 xl:text-lg'>Free delivery. Order now for Christmas</p>
        </div>

        <div className='flex w-full mb-12 md:mb-16 lg:w-2/3'>
          <div className='relative z-10 -ml-12 overflow-hidden bg-gray-100 rounded-lg shadow-lg left-12 top-12 md:left-16 md:top-16 lg:ml-0'>
            <Image
              src={urlFor(data.image1).url()}
              alt='Hero Photo 1'
              className='object-cover object-center w-full h-full'
              width={500}
              height={500}
              priority
            />
          </div>

          <div className='overflow-hidden bg-gray-100 rounded-lg shadow-lg'>
            <Image
              src={urlFor(data.image2).url()}
              alt='Hero Photo 2'
              className='object-cover object-center w-full h-full'
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
        <div className='flex w-64 h-12 overflow-hidden border divide-x rounded-lh'>
          <Link
            href='/Art'
            className='flex items-center justify-center w-1/3 text-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200'
          >
            Art
          </Link>
          <Link
            href='/Mouse'
            className='flex items-center justify-center w-1/3 text-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200'
          >
            Mouse Mats
          </Link>
          <Link
            href='/Art'
            className='flex items-center justify-center w-1/3 text-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200'
          >
            Other
          </Link>
        </div>
      </div>
    </section>
  )
}
