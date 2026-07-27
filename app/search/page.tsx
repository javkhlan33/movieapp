import Link from "next/link";
import Footer from "../_components/footer";
import Header from "../_components/header";
import { Button } from "@/components/ui/button";
import { MovieCard } from "../_components/movieCard";

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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query, page } = await searchParams;

  const currentPage = Number(page) || 1;

  // Search Results
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${query}&language=en-US&page=${currentPage}&api_key=${API_KEY}`,
  );

  const data = await response.json();
  const totalPages = Math.min(data.total_pages, 500);

  // Genres
  const genreResponse = await fetch(
    `${BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`,
  );

  const genreData = await genreResponse.json();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto flex max-w-[1280px] gap-10 px-8 py-10">
          {/* LEFT */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold">Search results</h1>

            <p className="mt-4 text-lg">
              {data.results.length} results for "{query}"
            </p>

            {data.results.length > 0 ? (
              <div className="mt-8 grid grid-cols-4 gap-6">
                {data.results.map((movie: any) => (
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
            ) : (
              <div className="mt-8 flex h-28 items-center justify-center rounded-lg border">
                No results found.
              </div>
            )}

            <div className="flex justify-center py-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/search?query=${encodeURIComponent(query ?? "")}&page=${Math.max(
                        currentPage - 1,
                        1,
                      )}`}
                    />
                  </PaginationItem>

                  {Array.from(
                    { length: Math.min(5, totalPages) },
                    (_, index) => {
                      const pageNumber = index + 1;

                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href={`/search?query=${encodeURIComponent(
                              query ?? "",
                            )}&page=${pageNumber}`}
                            isActive={currentPage === pageNumber}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    },
                  )}

                  {totalPages > 5 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href={`/search?query=${encodeURIComponent(
                        query ?? "",
                      )}&page=${Math.min(currentPage + 1, totalPages)}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-[320px]">
            <h2 className="text-3xl font-semibold">Search by genre</h2>

            <p className="mt-2 text-gray-500">See lists of movies by genre</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {genreData.genres.map((genre: any) => (
                <Link key={genre.id} href={`/genre/${genre.id}`}>
                  <Button variant="outline">{genre.name}</Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
