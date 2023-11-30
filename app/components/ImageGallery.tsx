'use client'

import Image from 'next/image'
import { urlFor } from '../lib/sanity'
import { useState } from 'react'

interface iAppProps {
  images: any
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0])

  const handleSmallImageClick = (image: any) => {
    setBigImage(image)
  }

  return (
    <div className='grid gap-4 lg:grid-cols-5 '>
      <div className='flex order-last gap-4 lg:order-none lg:flex-col'>
        {images.map((image: any, idx: any) => (
          <div key={idx} className='overflow-hidden bg-gray-100 rounded-lg'>
            <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt='product photo'
              className='object-cover object-center w-full h-full cursor-pointer'
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className='relative overflow-hidden bg-gray-100 border border-gray-500 rounded-lg lg:col-span-4'>
        <Image
          src={urlFor(bigImage).url()}
          alt='product photo'
          width={500}
          height={500}
          className='object-cover object-center w-full h-full'
        />

        <span className='absolute left-0 top-0 rounded-br-lg bg-primary px-3 py-1.5 text-xs uppercase tracking-wider text-white font-montserrat'>
          Free Postage
        </span>
      </div>
    </div>
  )
}
