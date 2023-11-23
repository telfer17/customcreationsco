import { Button } from '@/components/ui/button'
import { CheckCheck } from 'lucide-react'
import Link from 'next/link'

export default function StripeSuccess() {
  return (
    <div className='h-screen'>
      <div className='mt-32 md:max-w-[50vw] mx-auto'>
        <CheckCheck className='w-16 h-16 mx-auto my-6 text-green-600' />
        <div className='text-center'>
          <h3 className='text-base font-semibold text-center text-gray-900 md:text-2xl'>Payment Complete</h3>
          <p className='my-2 text-gray-600'>Thank you for your purchase</p>

          <Button asChild className='mt-4'>
            <Link href='/'>Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
