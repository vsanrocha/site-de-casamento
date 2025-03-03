'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { href: '/detalhes', label: 'Detalhes' },
  { href: '/historia', label: 'Nossa História' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/recados', label: 'Recados' },
  { href: '/presentes', label: 'Lista de Presentes' },
  { href: '/rsvp', label: 'Confirmar Presença' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2 h-16 flex' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className={`container mx-auto px-4 flex justify-between items-center ${mobileMenuOpen ? 'md:flex' : 'flex'}`}>
        {!mobileMenuOpen && (
          <Link href="/" className="font-serif text-2xl font-bold text-primary">
            Mirela & Ivan
          </Link>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
              <Link 
              key={link.href}
              href={link.href}
              className={`relative font-medium transition-colors duration-300 ${
                pathname === link.href
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {pathname === link.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 top-full block h-[2px] w-full bg-primary"
                />
              )}
              {link.label}
              </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        {!mobileMenuOpen && (
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg absolute top-0 left-0 w-full h-auto py-6"
        >
          <div className="container mx-auto px-6 pt-4 pb-8">
            <div className="flex justify-between items-center mb-6">
              <Link 
                href="/" 
                className="font-serif text-2xl font-bold text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mirela & Ivan
              </Link>
              
              <button 
                className="text-foreground p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                  <Link 
                  key={link.href}
                  href={link.href}
                  className={`py-3 px-4 rounded-md ${
                    pathname === link.href
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  >
                  {link.label}
                  </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
