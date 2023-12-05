import { client } from '@/app/lib/sanity'
import { fullProduct } from '../interface'

export default async function getData(slug: string) {
  const query = `*[_type == 'product' && slug.current == "${slug}"][0]{
          _id,
            images,
            price,
            name,
            description,
            "slug": slug.current,
            "categoryName": category->name,
            price_id,
            "imageUrl": coalesce(images[0].asset->url, variants[0].images[0].asset->url, null),
            variants[]{
              size,
              price,
              price_id,
              images
            }
        }`

  const data: fullProduct = await client.fetch(query)

  return data
}
