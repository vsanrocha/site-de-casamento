'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary-light md:-translate-x-[1px]" />
      
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`relative flex flex-col md:flex-row ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          } mb-16 last:mb-0`}
        >
          <div className="flex-1 md:px-8">
            <div className="bg-secondary rounded-lg p-6 shadow-md">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">
                {event.date}
              </span>
              <h3 className="text-xl font-serif font-bold mb-2">{event.title}</h3>
              <p className="text-text-light">{event.description}</p>
              
              {event.image && (
                <div className="mt-4 relative h-48 rounded-md overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 bg-primary rounded-full md:-translate-x-[8px] shadow-md" />
          
          <div className="flex-1 hidden md:block" />
        </motion.div>
      ))}
    </div>
  );
}
