"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import TrailerPlayer from "./trailer";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  trailer?: {
    key: string;
    name: string;
  };
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

              <div className="absolute left-[140px] top-1/2 z-10 -translate-y-1/2">
                <p className="text-lg text-white">Now Playing</p>

                <h1 className="mt-2 text-5xl font-bold text-white">
                  {movie.title}
                </h1>

                <div className="mt-3 flex items-center gap-2">
                  <Image src="/star.png" alt="star" width={20} height={20} />

                  <span className="text-lg font-bold text-white">
                    {movie.vote_average.toFixed(1)}
                    <span className="text-gray-300"> /10</span>
                  </span>
                </div>

                <p className="mt-4 w-[420px] text-sm leading-6 text-white line-clamp-4">
                  {movie.overview}
                </p>

                <div className="mt-6">
                  {movie.trailer ? (
                    <TrailerPlayer trailer={movie.trailer} />
                  ) : (
                    <p className="text-white">Trailer not available</p>
                  )}
                </div>
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
