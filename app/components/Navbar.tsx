'use client'

import { Button } from '@/components/ui/button'
import { Menu, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useShoppingCart } from 'use-shopping-cart'
import { headerLogo } from '../assets/logos/alt'
import { useState } from 'react'

const links = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Art',
    href: '/Art'
  },
  {
    name: 'Mouse Mats',
    href: '/Mouse'
  },
  {
    name: 'Other',
    href: '/Other'
  }
]

export default function Navbar() {
  const pathname = usePathname()
  const { handleCartClick, cartCount } = useShoppingCart()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleHamburgerMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='mb-8 border-b '>
      <div className='flex items-center justify-between max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl'>
        <Link href='/'>
          <Image src={headerLogo} alt='Header logo' width={250} height={120} />
        </Link>

        <nav className='hidden gap-12 lg:flex 2xl:ml-16 font-montserrat'>
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link className='text-lg font-semibold text-primary font-montserrat' href={link.href}>
                  {link.name}
                </Link>
              ) : (
                <Link
                  className='text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary'
                  href={link.href}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {isMenuOpen && (
          <div className='absolute top-0 right-0 p-4 bg-white lg:hidden'>
            <div className='flex flex-col items-end gap-2'>
              <X
                height={15}
                width={15}
                onClick={toggleHamburgerMenu}
                className='mt-4 text-red-600 cursor-pointer hover:text-gray-600'
              />
              {links.map((link, idx) => (
                <Link key={idx} href={link.href} className='text-lg font-semibold text-gray-600 hover:text-primary'>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className='flex divide-x '>
          <Button
            className='flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none font-montserrat md:right-6'
            variant='outline'
            onClick={() => handleCartClick()}
          >
            <div className='flex'>
              <div>
                <ShoppingCart size={35} />
                Cart:
                <span className='ml-1 text-red-600'>{cartCount}</span>
              </div>
            </div>
          </Button>
        </div>
        <div className='hidden pl-40 cursor-pointer max-lg:block' onClick={toggleHamburgerMenu}>
          <Menu height={30} width={30} />
        </div>
      </div>
    </header>
  )
}
