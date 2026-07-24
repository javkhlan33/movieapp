"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
};

type HeadProps = {
  movies: Movie[];
};

export const Head = ({ movies }: HeadProps) => {
  const heroAutoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    }),
  );

  return (
    <Carousel
      className="mx-auto w-full max-w-[1440px]"
      opts={{ loop: true }}
      plugins={[heroAutoplay.current]}
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id}>
            <section className="relative">
              <Link href={`/movie/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  width={1440}
                  height={600}
                  className="h-[600px] w-full object-cover"
                />
              </Link>

              <div className="absolute left-[140px] top-1/2 -translate-y-1/2 z-10">
                <p className="text-lg text-white">Now Playing:</p>

                <h1 className="text-5xl font-bold text-white">{movie.title}</h1>

                <div className="flex items-center gap-2 mt-3">
                  <Image src="/star.png" alt="star" width={20} height={20} />

                  <span className="text-white font-bold text-lg">
                    {movie.vote_average.toFixed(1)}
                    <span className="text-gray-300"> /10</span>
                  </span>
                </div>

                <p className="mt-4 w-[420px] text-sm leading-6 text-white line-clamp-4">
                  {movie.overview}
                </p>

                <Button className="mt-5 bg-white text-black hover:bg-gray-100">
                  <Image src="/play.png" alt="play" width={16} height={16} />
                  Watch Trailer
                </Button>
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-8" />
      <CarouselNext className="right-8" />
    </Carousel>
  );
};
