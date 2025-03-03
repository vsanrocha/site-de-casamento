import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
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
      
      <CardHeader>
        <h3 className="font-serif text-xl font-bold">{title}</h3>
      </CardHeader>
      
      <CardContent>
        <p className="text-text-light text-sm mb-3 line-clamp-2">{description}</p>
        <p className="text-primary font-bold">
          R$ {price.toLocaleString('pt-BR')}
        </p>
      </CardContent>

      <CardFooter>
        {!purchased ? (
          <Button asChild variant="default" className="w-full">
            <Link href={`/presentes/${id}`}>
              Presentear
            </Link>
          </Button>
        ) : (
          <span className="text-text-light text-sm">
            Obrigado!
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default GiftCard;
