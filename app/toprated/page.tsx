"use client";
import Header from "@/app/_components/header";
import { MovieList } from "@/app/_components/movieList";
import Footer from "@/app/_components/footer";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
const API_KEY = "502c1ed7cb7d214347c2fb36ce415a4e";
const BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT_TOP_RATED = `/movie/top_rated?language=en-US&page=1`;
const API_URL = `${BASE_URL}${ENDPOINT_TOP_RATED}&api_key=${API_KEY}`;

export default function TopRatedPage() {
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);

  const fetchTopRatedMovies = async () => {
    const response = await fetch(
      `${BASE_URL}${ENDPOINT_TOP_RATED}&api_key=${API_KEY}`,
    );
    const data = await response.json();
    setTopRatedMovies(data.results);
  };
  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <MovieList
          genre="Top Rated"
          link="/toprated"
          movies={topRatedMovies}
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
