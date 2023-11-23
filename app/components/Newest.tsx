import Link from 'next/link'
import { simplifiedProduct } from '../interface'
import { client } from '../lib/sanity'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

async function getData() {
  const query = `*[_type == 'product'][0...4] | order(_createdAt desc) {
        _id,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`

  const data = await client.fetch(query)

  return data
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData()

  return (
    <div className='bg-white '>
      <div className='max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Newest Products</h2>
          <Link className='flex items-center text-primary gap-x-1' href='/all'>
            See All{' '}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-1 px-4 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {data.map((product) => (
          <div key={product._id} className='relative group'>
            <div className='w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer aspect-square group-hover:opacity-75 lg:h-80'>
              <Image
                src={product.imageUrl}
                alt='Product Image'
                className='object-cover object-center w-full h-full lg:h-full lg:w-full'
                width={300}
                height={300}
              />
            </div>

            <div className='flex justify-between mt-4'>
              <div>
                <h3 className='pl-2 text-sm text-gray-700'>
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </h3>
                {/* <p className='mt-1 text-sm text-gray-500'>{product.categoryName}</p> */}
              </div>
              <p className='pr-2 text-sm font-medium text-gray-900'>£{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
