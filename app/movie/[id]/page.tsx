import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { movies } from "@/app/_utils/movies";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = movies.find((movie) => movie.id === Number(id));

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="w-full h-screen">
      <Header />

      <main className="mx-auto max-w-[1080px] px-20 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-gray-500 mt-2">2024.11.26 • PG • 2h 40m</p>
          </div>
          <div>⭐ {movie.rating}/10</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
