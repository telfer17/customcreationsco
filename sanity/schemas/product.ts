export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of Product',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{type: 'image'}],
    },
    {
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'size', type: 'string', title: 'Size'},
            {name: 'price', type: 'number', title: 'Price'},
            {name: 'price_id', type: 'string', title: 'Stripe Price ID'},
            {name: 'images', type: 'array', title: 'Product Images', of: [{type: 'image'}]},
          ],
        },
      ],
    },

    {
      name: 'description',
      type: 'text',
      title: 'Product Description',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'price_id',
      title: 'Stripe Price ID',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [
        {
          type: 'category',
        },
      ],
    },
  ],
}
