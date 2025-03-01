'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  background?: 'white' | 'primary' | 'transparent';
}

const getBgColor = (background: SectionProps['background']) => {
  switch (background) {
    case 'primary':
      return 'bg-primary/5';
    case 'transparent':
      return 'bg-transparent';
    case 'white':
    default:
      return 'bg-white';
  }
};

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  fullWidth = false,
  background = 'white',
}: SectionProps) {
  return (
    <section id={id} className={`py-16 ${getBgColor(background)} ${className}`}>
      <div className={fullWidth ? 'w-full' : 'container mx-auto px-4'}>
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-serif font-bold mb-4"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-text-light max-w-2xl mx-auto"
              >
                {subtitle}
              </motion.p>
            )}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-[2px] bg-primary mx-auto mt-6"
            />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
