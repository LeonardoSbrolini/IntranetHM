"use client"
import Container from "@/components/container"
import { useSession } from "next-auth/react"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export default function Home() {
  const { data: session, status } = useSession()

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <Container>
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="h-[40rem]">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1 h-full">
                  <Card className="h-full">
                    <CardContent className="relative flex items-center h-full justify-center p-6">
                      <Image
                        src={'/image/banners/wallpaper1.jpg'}
                        alt={'banner1'}
                        layout="fill"
                        objectFit="cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

    </Container>
  )
}
