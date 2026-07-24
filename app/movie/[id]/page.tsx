import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "@/app/_components/movieCard";

const API_KEY = "502c1ed7cb7d214347c2fb36ce415a4e";
const BASE_URL = "https://api.themoviedb.org/3";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${BASE_URL}/movie/${id}?language=en-US&api_key=${API_KEY}`,
  );

  const movie = await response.json();
  const similarResponse = await fetch(
    `${BASE_URL}/movie/${id}/similar?language=en-US&api_key=${API_KEY}`,
  );

  const similarMovies = await similarResponse.json();

  if (movie.success === false) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="w-full min-h-screen">
      <Header />

      <main className="mx-auto max-w-[1080px] px-20 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <p className="text-gray-500 mt-2">
              {movie.release_date} • {movie.runtime} min
            </p>
          </div>

          <div>
            ⭐ {movie.vote_average.toFixed(1)}
            <span className="text-gray-400"> /10</span>
          </div>
        </div>

        <div className="mt-8 flex gap-6">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={290}
            height={430}
            className="h-[430px] w-[290px] rounded-lg object-cover"
          />

          <div className="relative flex-1 h-[430px]">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex gap-2 flex-wrap">
            {movie.genres.map((genre: any) => (
              <span
                key={genre.id}
                className="rounded-full border px-3 py-1 text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-6 text-gray-700 leading-7">{movie.overview}</p>
        </div>

        <div className="mt-12">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-semibold">More like this</h2>

            <Link
              href={`/movie/${id}/morelikethis`}
              className="flex items-center gap-2 text-sm"
            >
              <span>See more</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-5 gap-6">
            {similarMovies.results.slice(0, 5).map((movie: any) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                image={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                size="small"
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
