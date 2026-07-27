import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "@/app/_components/movieCard";
import TrailerPlayer from "@/app/_components/trailer";

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
  const videoResponse = await fetch(
    `${BASE_URL}/movie/${id}/videos?language=en-US&api_key=${API_KEY}`,
  );

  const videoData = await videoResponse.json();
  const trailer = videoData.results.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube",
  );
  console.log(trailer);
  if (movie.success === false) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <main className="mx-auto max-w-[1080px] px-4 py-6 sm:px-6 lg:px-20 lg:py-8">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black dark:text-white lg:text-4xl">
              {movie.title}
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {movie.release_date} • {movie.runtime} min
            </p>
          </div>

          <div className="text-right">
            <div className="text-base font-semibold text-black dark:text-white">
              ⭐ {movie.vote_average.toFixed(1)}
              <span className="text-gray-400 dark:text-gray-500"> /10</span>
            </div>

            {/* хүсвэл энд vote_count нэмэж болно */}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {movie.vote_count}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="relative h-[210px] w-full lg:order-2 lg:h-[430px] lg:flex-1">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="rounded-lg object-cover"
            />

            {trailer && (
              <div className="absolute bottom-4 left-4">
                <TrailerPlayer trailer={trailer} />
              </div>
            )}
          </div>

          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={100}
            height={148}
            className="hidden h-[430px] w-[290px] rounded-lg object-cover lg:block"
          />
        </div>

        <div className="mt-5 flex gap-4">
          {/* Poster */}
          <div className="shrink-0 lg:hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={100}
              height={148}
              className="h-[148px] w-[100px] rounded-lg object-cover"
            />
          </div>

          {/* Description */}
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap gap-2">
              {movie.genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-gray-300 px-3 py-1 text-xs text-black dark:border-zinc-700 dark:text-white"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
              {movie.overview}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-black dark:text-white lg:text-3xl">
              More like this
            </h2>

            <Link
              href={`/movie/${id}/morelikethis`}
              className="flex items-center gap-2 text-sm text-black dark:text-white"
            >
              <span>See more</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {similarMovies.results
              .slice(0, 5)
              .map((movie: any, index: number) => (
                <div
                  key={movie.id}
                  className={`${index >= 2 ? "hidden sm:block" : ""}
                  ${index >= 3 ? "sm:hidden lg:block" : ""}`}
                >
                  <MovieCard
                    id={movie.id}
                    image={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    size="small"
                  />
                </div>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
