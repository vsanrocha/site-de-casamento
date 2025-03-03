'use client';

import Link from 'next/link';
import { FiHeart, FiInstagram, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/5 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="font-serif text-2xl font-bold text-primary">
              Mirela & Ivan
            </Link>
            <p className="text-text-light mt-2">18 de Outubro de 2025</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Instagram"
              >
                <FiInstagram size={24} />
              </motion.a>
              <motion.a
                href="mailto:contato@mirelaivan.com"
                className="text-text-light hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Email"
              >
                <FiMail size={24} />
              </motion.a>
            </div>
            <nav>
              <ul className="flex flex-wrap justify-center space-x-6">
                <li>
                  <Link
                    href="/detalhes"
                    className="text-text-light hover:text-primary transition-colors text-sm"
                  >
                    Detalhes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/historia"
                    className="text-text-light hover:text-primary transition-colors text-sm"
                  >
                    Nossa História
                  </Link>
                </li>
                <li>
                  <Link
                    href="/galeria"
                    className="text-text-light hover:text-primary transition-colors text-sm"
                  >
                    Galeria
                  </Link>
                </li>
                <li>
                  <Link
                    href="/rsvp"
                    className="text-text-light hover:text-primary transition-colors text-sm"
                  >
                    RSVP
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-6 text-center">
          <p className="text-text-light text-sm flex items-center justify-center">
            &copy; {currentYear} Mirela & Ivan. Feito com
            <FiHeart className="mx-1 text-primary" /> para nosso grande dia.
          </p>
        </div>
      </div>
    </footer>
  );
}
