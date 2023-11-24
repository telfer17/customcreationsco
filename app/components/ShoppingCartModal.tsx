'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import Image from 'next/image'
import { useShoppingCart } from 'use-shopping-cart'

export default function ShoppingCartModal() {
  const { cartCount, shouldDisplayCart, handleCartClick, cartDetails, removeItem, totalPrice, redirectToCheckout } =
    useShoppingCart()

  async function handleCheckoutClick(event: any) {
    event.preventDefault()
    try {
      const result = await redirectToCheckout()
      if (result?.error) {
        console.log('result')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className='sm:max-w-lg w-[90vw]'>
        <SheetHeader>
          <SheetTitle className='font-montserrat'>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className='flex flex-col justify-between h-full'>
          <div className='flex-1 mt-8 overflow-y-auto'>
            <ul className='-my-6 divide-y divide-gray-200'>
              {cartCount === 0 ? (
                <h1 className='py-6 font-montserrat'>Shopping cart is empty.</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className='flex py-6 overflow-hidden '>
                      <div className='flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md'>
                        <Image src={entry.image as string} alt='Product Image' width={100} height={200} />
                      </div>
                      <div className='flex flex-col flex-1 ml-4'>
                        <div>
                          <div className='flex justify-between text-base font-medium text-gray-900'>
                            <h3>{entry.name}</h3>
                            <p className='pr-2 ml-4'>£{entry.price}</p>
                          </div>
                          <p className='mt-1 text-sm text-gray-500 line-clamp-2'>{entry.description}</p>
                        </div>

                        <div className='flex items-end justify-between flex-1 text-sm'>
                          <p className='text-gray-500'>QTY: {entry.quantity}</p>

                          <div className='flex'>
                            <button
                              type='button'
                              onClick={() => removeItem(entry.id)}
                              className='pr-2 font-medium text-primary hover:text-primary/80 font-montserrat'
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className='px-4 py-6 border-t border-gray-200 sm:px-6'>
            <div className='flex justify-between text-base font-medium text-gray-900 font-montserrat'>
              <p>Subtotal</p>
              <p>£{totalPrice}</p>
            </div>
            {/* <p className='mt-0.5 text-sm text-gray-500'>Shipping calculated at checkout</p> */}

            <div className='mt-6 font-montserrat'>
              <Button className='w-full font-montserrat' onClick={handleCheckoutClick}>
                Checkout
              </Button>
            </div>

            <div className='flex justify-center mt-4 mb-4 text-sm text-center text-gray-500 font-montserrat'>
              <Button className='w-full font-montserrat' variant={'secondary'} onClick={() => handleCartClick()}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
