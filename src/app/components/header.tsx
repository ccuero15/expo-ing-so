import React from 'react'
import { IoFileTrayStackedOutline, IoFolderOpenOutline, IoHomeOutline, IoSaveOutline, IoServerOutline, IoTerminalOutline } from 'react-icons/io5'
import { NavbarMenuItem } from './itemsNav'
import Image from 'next/image'

export const HeaderComponent = () => {

  const menuItems = [
    { path: '/', icon: <IoHomeOutline size={22} />, title: 'Inicio' },
    { path: '/memoria', icon: <IoSaveOutline  size={22} />, title: 'Memoria Secundaria' },
    { path: '/cache', icon: <IoServerOutline  size={22} />, title: 'Cache' },
    { path: '/swap', icon: <IoTerminalOutline size={22} />, title: 'Swap' },
    { path: '/dir', icon: <IoFolderOpenOutline   size={22} />, title: 'Directorio' },
    { path: '/sisJerarquico', icon: <IoFileTrayStackedOutline size={22} />, title: 'Sistema Jerárquico' }
  ]
  return (
    <>
      {/* Header */}
      <header className="bg-gradient-to-tr from-[#ff4694] to-[#776fff] backdrop-blur-sm shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image
              src="/unexca.jpeg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-800">Sistemas de Archivos</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            {
              menuItems.map((item, index) => (
                <NavbarMenuItem
                  key={index}
                  {...item}
                />

              ))
            }
           {/*  <Link href="/" className="text-gray-600 hover:text-[#776fff] transition-colors">Inicio</Link>
            <Link href="/memoria" className="text-gray-600 hover:text-[#776fff] transition-colors">Memoria Secundaria</Link>
            <Link href="/cache" className="text-gray-600 hover:text-[#776fff] transition-colors">Cache</Link>
            <Link href="/swap" className="text-gray-600 hover:text-[#776fff] transition-colors">Swap</Link>
            <Link href="/dir" className="text-gray-600 hover:text-[#776fff] transition-colors">Directorio</Link>
            <Link href="/sisJerarquico" className="text-gray-600 hover:text-[#776fff] transition-colors">Sistema Jerarjico</Link> */}
          </nav>
          <button className="md:hidden text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
    </>
  )
}
