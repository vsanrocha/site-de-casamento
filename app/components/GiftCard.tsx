import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface GiftCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  purchased?: boolean;
}

const GiftCard: React.FC<GiftCardProps> = ({
  id,
  title,
  price,
  image,
  description,
  purchased = false
}) => {
  return (
    <div className="card overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {purchased && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-primary text-text-on-primary px-4 py-2 rounded-full font-medium transform -rotate-12">
              Presente Adquirido
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-serif text-xl font-bold mb-2">{title}</h3>
        <p className="text-text-light text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">
            R$ {price.toLocaleString('pt-BR')}
          </span>
          
          {!purchased ? (
            <Link 
              href={`/presentes/${id}`}
              className="btn btn-primary text-sm py-2 px-4"
            >
              Presentear
            </Link>
          ) : (
            <span className="text-text-light text-sm">
              Obrigado!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
