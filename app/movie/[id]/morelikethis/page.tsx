import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
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
export default async function MoreLikeThisPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const response = await fetch(
    `${BASE_URL}/movie/${id}/similar?language=en-US&page=${currentPage}&api_key=${API_KEY}`,
  );

  const data = await response.json();

  const totalPages = Math.min(data.total_pages, 500);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <MovieList
          genre="More like this"
          link={`/movie/${id}/morelikethis`}
          movies={data.results}
          seemore={false}
        />

        <div className="flex justify-center py-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/movie/${id}/morelikethis?page=${Math.max(currentPage - 1, 1)}`}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`/movie/${id}/morelikethis?page=${pageNumber}`}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href={`/movie/${id}/morelikethis?page=${Math.min(
                    currentPage + 1,
                    totalPages,
                  )}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>

      <Footer />
    </div>
  );
}
