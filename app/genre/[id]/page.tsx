import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { MovieList } from "@/app/_components/movieList";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const API_KEY = "502c1ed7cb7d214347c2fb36ce415a4e";
const BASE_URL = "https://api.themoviedb.org/3";

export default async function GenrePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${id}&language=en-US&page=1&api_key=${API_KEY}`,
  );

  const data = await response.json();

  const genreResponse = await fetch(
    `${BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`,
  );

  const genreData = await genreResponse.json();

  const currentGenre = genreData.genres.find(
    (genre: any) => genre.id === Number(id),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <MovieList
          genre={currentGenre.name}
          link=""
          movies={data.results}
          seemore={false}
        />

        <div className="flex justify-center py-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>

      <Footer />
    </div>
  );
}
