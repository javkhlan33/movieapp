import { ChevronRight } from "lucide-react";
import { MovieCard } from "./movieCard";

import Link from "next/link";

export const MovieList = ({
  genre,
  link,
  movies,
  seemore = true,
}: {
  genre: string;
  link: string;
  movies: any[];
  seemore?: boolean;
}) => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-20">
      <div className="mb-6 flex items-center justify-between sm:mb-8">
        <h2 className="text-2xl font-semibold sm:text-3xl">{genre}</h2>

        {seemore && (
          <Link href={link}>
            <button className="flex items-center gap-2 text-sm">
              <span>See more</span>
              <ChevronRight size={16} />
            </button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            image={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </section>
  );
};
