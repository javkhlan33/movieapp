import Header from "../../../_components/header";
import Footer from "../../../_components/footer";
import { MovieCard } from "../../../_components/movieCard";

const API_KEY = "502c1ed7cb7d214347c2fb36ce415a4e";
const BASE_URL = "https://api.themoviedb.org/3";

export default async function MoreLikeThisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${BASE_URL}/movie/${id}/similar?language=en-US&api_key=${API_KEY}`,
  );

  const similarMovies = await response.json();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-[1440px] px-20 py-10">
        <h1 className="mb-8 text-4xl font-bold">More like this</h1>

        <div className="flex flex-wrap gap-8">
          {similarMovies.results.map((movie: any) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              image={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
