import AddToBag from '@/app/components/AddToBag'
import ImageGallery from '@/app/components/ImageGallery'
import { fullProduct } from '@/app/interface'
import { client } from '@/app/lib/sanity'
import { Button } from '@/components/ui/button'
import { Star, Truck } from 'lucide-react'

async function getData(slug: string) {
  const query = `*[_type == 'product' && slug.current == "${slug}"][0]{
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id
      }`

  const data: fullProduct = await client.fetch(query)

  return data
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug)

  return (
    <div className='bg-white'>
      <div className='max-w-screen-xl px-4 mx-auto md:px-8'>
        <div className='grid gap-8 md:grid-cols-2'>
          <ImageGallery images={data.images} />

          <div className='md:py-8'>
            <div className='mb-2 md:mb-3'>
              <span className='mb-0.5 inline-block text-gray-500'>{data.categoryName}</span>
              <h2 className='text-2xl font-bold text-gray-800 lg:text-3xl'>{data.name}</h2>
            </div>

            {/* RATINGS SECTION
            <div className='flex items-center gap-3 mb-6 md:mb-10'>
              <Button className='rounded-full gap-x-2'>
                <span className='text-sm'>4.2</span>
                <Star className='w-5 h-5' />
              </Button>
            </div> */}

            <div className='mb-4'>
              <div className='flex items-end gap-2'>
                <span className='text-xl font-bold text-gray-800 md:text-2xl'>£{data.price}</span>
                <span className='mb-0.5 text-red-500 line-through'>£{data.price + 5}</span>
              </div>
              {/* <span className='text-sm text-gray-500'>Free worldwide postage</span> */}
            </div>

            {/* <div className='flex items-center gap-2 mb-6 text-gray-500'>
              <Truck />
              <span className='text-sm'>Free worldwide shipping</span>
            </div> */}

            <div className='flex gap-2.5'>
              <AddToBag
                name={data.name}
                description={data.description}
                currency='GBP'
                image={data.images[0]}
                price={data.price}
                price_id={data.price_id}
                key={data._id}
              />
              <Button size='lg' variant={'secondary'}>
                Checkout
              </Button>
            </div>
            <p className='mt-12 text-base tracking-wide text-gray-500'> {data.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
