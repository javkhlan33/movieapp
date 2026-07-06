"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { heroMovies } from "../_utils/heromovies";
import { use, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Head() {
  const [movieIndex, setMovieIndex] = useState(0);
  const movie = heroMovies[movieIndex];
  const handleBackMovie = () => {
    setMovieIndex((movieIndex - 1 + heroMovies.length) % heroMovies.length);
  };

  const handleNextMovie = () => {
    setMovieIndex((movieIndex + 1) % heroMovies.length);
  };
  return (
    <section className="relative mx-auto w-full max-w-[1440px]">
      <Image
        src={heroMovies[movieIndex].image}
        alt={heroMovies[movieIndex].title}
        width={1280}
        height={600}
        className="h-[600px] w-full object-cover"
        priority
      />
      <div className="absolute left-[140px] top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col ">
          <p className="text-lg text-white">Now Playing:</p>

          <h1 className="text-5xl font-bold text-white">
            {heroMovies[movieIndex].title}
          </h1>

          <div className="flex items-center gap-2">
            <Image src="/star.png" alt="star" width={20} height={20} />

            <span className="text-white font-bold text-lg">
              {heroMovies[movieIndex].rating}
              <span className="text-gray-300">/10</span>
            </span>
          </div>

          <p className="w-[320px] text-sm leading-6 text-white">
            {heroMovies[movieIndex].description}
          </p>

          <Button className="w-fit bg-white text-black hover:bg-gray-100 mt-2.5">
            <Image src="/play.png" alt="play" width={16} height={16} />
            Watch Trailer
          </Button>
        </div>
      </div>
      <Button
        onClick={handleBackMovie}
        size="icon"
        className="absolute left-8 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white text-black"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-8 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#F4F4F5] hover:bg-gray-200"
        onClick={handleNextMovie}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </section>
  );
}
