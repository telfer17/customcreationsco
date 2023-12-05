export interface simplifiedProduct {
  _id: string
  price: number
  name: string
  slug: string
  categoryName: string
  imageUrl: string
  variants?: ProductVariant[]
}

export interface fullProduct {
  _id: string
  price: number
  name: string
  slug: string
  categoryName: string
  images: any
  description: string
  price_id: string
  imageUrl: string
  variants?: ProductVariant[]
}

export interface ProductVariant {
  size: string
  price: number
  price_id: string
  images: any
}
