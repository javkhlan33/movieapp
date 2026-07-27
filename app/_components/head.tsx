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
                  className="h-[220px] w-full object-cover sm:h-[320px] lg:h-[600px]"
                />
              </Link>
              <CarouselPrevious className="lg:left-8" />
              <CarouselNext className="lg:right-8" />

              <div className=" px-4 py-5  lg:absolute lg:left-[140px] lg:top-1/2 lg:z-10 lg:w-[420px] lg:-translate-y-1/2 lg:bg-transparent">
                <p className="text-sm text-black dark:text-white sm:text-base lg:text-lg lg:text-white">
                  Now Playing
                </p>

                <h1 className="mt-2 text-3xl font-bold text-black dark:text-white sm:text-4xl lg:text-5xl lg:text-white">
                  {movie.title}
                </h1>

                <div className="mt-3 flex items-center gap-2">
                  <Image src="/star.png" alt="star" width={20} height={20} />

                  <span className="text-base font-bold text-black dark:text-white lg:text-lg lg:text-white">
                    {movie.vote_average.toFixed(1)}
                    <span className="text-gray-400 dark:text-gray-500">
                      {" "}
                      /10
                    </span>
                  </span>
                </div>

                <p className="mt-4 line-clamp-4 w-full text-sm leading-6 text-gray-700 dark:text-gray-300 lg:w-[420px] lg:text-white">
                  {movie.overview}
                </p>

                <div className="mt-5 lg:mt-6">
                  {movie.trailer ? (
                    <TrailerPlayer trailer={movie.trailer} />
                  ) : (
                    <p className="text-black dark:text-white lg:text-white">
                      Trailer not available
                    </p>
                  )}
                </div>
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
