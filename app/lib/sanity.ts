import ImageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'rhs4xgmc',
  dataset: 'production',
  apiVersion: '2022-03-25',
  useCdn: false
})

const builder = ImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source).quality(100)
}
