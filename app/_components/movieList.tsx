import { ChevronRight } from "lucide-react";
import { MovieCard } from "./movieCard";
import { movies } from "../_utils/movies";
import Link from "next/link";

export const MovieList = ({ genre, link }: { genre: string; link: string }) => {
  return (
    <section className="mx-auto max-w-[1440px] px-20 py-10 ">
      <div className="flex w-full items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold">{genre}</h2>

        <Link href={link}>
          <button className="flex items-center gap-2 text-sm">
            <span>See more</span>
            <ChevronRight size={16} />
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            image={movie.image}
            title={movie.title}
            rating={movie.rating}
          />
        ))}
      </div>
    </section>
  );
};
