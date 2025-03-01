import Image from "next/image";

interface HeroProps {
  imagePath: string;
  title: string;
  subtitle?: string;
}

export default function Hero({ imagePath, title, subtitle }: HeroProps) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover object-center"
        />
        {/* Filtro com blur voltado para o branco */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-primary">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
