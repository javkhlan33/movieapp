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
const ENDPOINT_UPCOMING = `/movie/upcoming?language=en-US&page=1`;
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}${ENDPOINT_UPCOMING}&api_key=${API_KEY}`;

export default function UpcomingPage() {
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const fetchUpcomingMovies = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUpcomingMovies(data.results);
  };
  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <MovieList
          genre="Upcoming"
          link="/upcoming"
          movies={upcomingMovies}
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
