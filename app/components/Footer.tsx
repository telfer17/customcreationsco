'use client'

import Image from 'next/image'
import Link from 'next/link'
import { footerLogo } from '../assets/logos/alt'
import { CopyrightIcon } from 'lucide-react'

const footerLinks = [
  {
    title: 'Sections',
    links: [
      { name: 'Home', link: '/' },
      { name: 'Art', link: '/Art' },
      { name: 'Mouse Mats', link: '/Mouse' },
      { name: 'Other', link: '/Other' },
      { name: 'All', link: '/All' }
    ]
  },
  {
    title: 'Help',
    links: [
      { name: 'About us', link: '/' },
      { name: 'FAQs', link: '/' },
      { name: 'How it works', link: '/' },
      { name: 'Privacy policy', link: '/' },
      { name: 'Payment policy', link: '/' }
    ]
  },
  {
    title: 'Get in touch',
    links: [{ name: 'info@customcreationsco.co.uk', link: 'mailto:info@customcreationsco.co.uk' }]
  }
]

export default function Footer() {
  return (
    <footer className='w-full p-4 mt-10 bg-black '>
      <div className='flex flex-wrap items-start justify-between gap-20 max-lg:flex-col'>
        <div className='flex flex-col items-start'>
          <Link href='/'></Link>
          <Image src={footerLogo} alt='Header logo' width={200} height={100} />
        </div>
      </div>

      <div className='flex flex-wrap flex-1 gap-20 justify-evenly lg:gap font-montserrat'>
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className='mb-6 text-2xl font-medium leading-normal text-white'>{section.title}</h3>
            <ul>
              {section.links.map((link) => (
                <li className='mt-3 text-base leading-normal text-gray-200 hover:text-slate-300' key={link.name}>
                  <Link href={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-24 text-gray-200 max-sm:flex-col max-sm:items-center font-montserrat'>
        <div className='flex items-center justify-start flex-1 gap-2 cursor-pointer'>
          <CopyrightIcon width={20} height={20} className='m-0 rounded-full' />
          <p>Custom Creations Co. All rights reserved.</p>
        </div>
        <p>Terms & Conditions</p>
      </div>
    </footer>
  )
}
