'use client'

import getData from '@/app/api/getFullProductData'
import AddToBag from '@/app/components/AddToBag'
import { BackButton } from '@/app/components/BackButton'
import ImageGallery from '@/app/components/ImageGallery'
import { fullProduct } from '@/app/interface'
import { client } from '@/app/lib/sanity'
import { Button } from '@/components/ui/button'
import { Star, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ProductPageProps {
  params: { slug: string }
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [data, setData] = useState<fullProduct | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(params.slug)
      setData(result)
    }

    fetchData()
  }, [params.slug])

  const sizes = data?.variants?.map((size) => (
    <ul
      className={`p-1 mr-2 mt-2 border rounded cursor-pointer border-primary hover:text-primary/80 hover:bg-gray-200 ${
        size.size === selectedSize ? 'border-primary text-primary bg-gray-200' : 'border-gray-300 text-gray-500'
      }`}
      key={size.size}
      onClick={() => setSelectedSize(size.size)}
    >
      {size.size}
    </ul>
  ))

  const defaultVariant = data?.variants?.[0]
  const selectedVariant = selectedSize
    ? data?.variants?.find((variant) => variant.size === selectedSize)
    : defaultVariant

  const variantImages = selectedVariant?.images
  const nonVariantImages = data?.images

  const displayImage = data?.imageUrl

  if (!data) {
    return null
  }

  return (
    <div className='bg-white'>
      <div className='max-w-screen-xl px-4 mx-auto md:px-8'>
        <BackButton />
        <div className='grid gap-8 md:grid-cols-2'>
          {selectedVariant
            ? variantImages && <ImageGallery images={variantImages} />
            : nonVariantImages && <ImageGallery images={nonVariantImages} />}
          <div className='md:py-8 font-montserrat'>
            <div className='mb-2 md:mb-3'>
              <span className='mb-0.5 inline-block text-gray-500'>{data?.categoryName}</span>
              <h2 className='text-2xl font-bold text-gray-800 lg:text-3xl'>{data?.name}</h2>
            </div>

            <div className='mb-4 font-montserrat'>
              <div className='flex items-end gap-2'>
                {selectedVariant ? (
                  <span className='text-xl font-bold text-gray-800 md:text-2xl text-primary'>
                    £{selectedVariant.price}
                  </span>
                ) : (
                  <span className='text-xl font-bold text-gray-800 md:text-2xl text-primary'>£{data?.price}</span>
                )}

                {data?.price ? <span className='mb-0.5 text-red-500 line-through'>£{data.price + 5}</span> : null}
              </div>
              <span className='flex font-montserrat'>{sizes}</span>
            </div>

            <div className='flex gap-2.5 font-montserrat'>
              {selectedVariant ? (
                <AddToBag
                  name={data?.name ?? ''}
                  description={data?.description ?? ''}
                  currency='GBP'
                  image={displayImage}
                  price={selectedVariant.price}
                  price_id={selectedVariant.price_id}
                  key={selectedVariant.price_id}
                />
              ) : (
                <AddToBag
                  name={data?.name ?? ''}
                  description={data?.description ?? ''}
                  currency='GBP'
                  image={displayImage}
                  price={data?.price ?? 0}
                  price_id={data?.price_id ?? ''}
                  key={data?._id ?? ''}
                />
              )}
              <Button size='lg' variant={'secondary'} className='font-montserrat'>
                Checkout
              </Button>
            </div>
            <p className='mt-12 text-base tracking-wide text-gray-500'> {data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
