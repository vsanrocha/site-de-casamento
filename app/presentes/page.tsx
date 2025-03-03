import Image from "next/image"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Section from "../components/Section"
import { Button } from "@/components/ui/button"

const gifts = [
  {
    id: 1,
    name: "Jogo de Panelas",
    price: 599.90,
    image: "/images/gifts/panelas.jpg",
    purchased: false
  },
  {
    id: 2,
    name: "Liquidificador",
    price: 299.90,
    image: "/images/gifts/liquidificador.jpg",
    purchased: false
  },
  {
    id: 3,
    name: "Jogo de Toalhas",
    price: 199.90,
    image: "/images/gifts/toalhas.jpg",
    purchased: true
  },
  {
    id: 4,
    name: "Kit de Talheres",
    price: 399.90,
    image: "/images/gifts/talheres.jpg",
    purchased: false
  }
]

export default function PresentesPage() {
  return (
    <>
      <Header />
      <Section
        title="Lista de Presentes"
        subtitle="Sua presença é o nosso maior presente, mas se desejar nos presentear, aqui estão algumas sugestões"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((gift) => (
            <div key={gift.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={gift.image}
                  alt={gift.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-serif font-bold mb-2">{gift.name}</h3>
                <p className="text-primary font-medium mb-4">
                  R$ {gift.price.toFixed(2)}
                </p>
                <Button
                  asChild
                  variant={gift.purchased ? "secondary" : "default"}
                  disabled={gift.purchased}
                  className="w-full"
                >
                  <Link href={`/presentes/${gift.id}`}>
                    {gift.purchased ? "Presente Adquirido" : "Presentear"}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Footer />
    </>
  )
}