import Link from 'next/link'
import { simplifiedProduct } from '../interface'
import { client } from '../lib/sanity'
import Image from 'next/image'
import { BackButton } from '../components/BackButton'

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
        _id,
          "imageUrl": images[0].asset->url,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name
      }`

  const data = await client.fetch(query)

  return data
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const data: simplifiedProduct[] = await getData(params.category)

  return (
    <div className='bg-white'>
      <BackButton />
      <div className='max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Our {params.category} Products</h2>
        </div>

        <div className='grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {data.map((product) => (
            <div key={product._id} className='relative group'>
              <div className='w-full overflow-hidden bg-gray-200 rounded-md aspect-square group-hover:opacity-75 lg:h-80'>
                <Image
                  src={product.imageUrl}
                  alt='Product image'
                  className='object-cover object-center w-full h-full lg:h-full lg:w-full'
                  width={300}
                  height={300}
                />
              </div>

              <div className='flex justify-between mt-4'>
                <div>
                  <h3 className='text-sm text-gray-700'>
                    <Link href={`/product/${product.slug}`}>{product.name}</Link>
                  </h3>
                </div>

                <div className='mb-4 font-montserrat'>
                  <div className='flex items-end gap-1 text-sm'>
                    <span className='font-bold text-gray-800 '>£{product.price}</span>
                    <span className='text-red-500 line-through '>£{product.price + 5}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
