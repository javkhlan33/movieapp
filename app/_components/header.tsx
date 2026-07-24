"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API_KEY = "502c1ed7cb7d214347c2fb36ce415a4e";
const BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT_UPCOMING = `/genre/movie/list?language=en`;
const API_URL = `${BASE_URL}${ENDPOINT_UPCOMING}&api_key=${API_KEY}`;

export default function Header() {
  const [genres, setGenres] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchMovies = async (query: string) => {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${query}&language=en-US&api_key=${API_KEY}`,
    );

    const data = await response.json();

    setSearchResults(data.results);
  };

  const fetchGenres = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("adsadasd", data);

    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }

    fetchSearchMovies(search);
  }, [search]);
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-20">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo (1).png" alt="logo" width={92} height={20} />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Image src="/doosh.png" alt="" width={16} height={16} />
                Genre
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[750px] ">
              <h2 className="text-4xl font-bold">Genres</h2>

              <p className="text-muted-foreground mt-2 mb-6 text-lg">
                See lists of movies by genre
              </p>
              <div className="my-6 border-b" />
              <div className="flex flex-wrap gap-3">
                {genres.map((genre) => (
                  <Link key={genre.id} href={`/genre/${genre.id}`}>
                    <Button variant="outline">{genre.name}</Button>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="relative w-[520px]">
            <Image
              src="/asuultiintemdeg.png"
              alt=""
              width={16}
              height={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />

            <Input
              placeholder="Search..."
              className="w-full pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-12 left-0 z-50 w-[520px] rounded-xl border bg-white shadow-xl">
                {searchResults.slice(0, 5).map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="flex items-center justify-between border-b p-4 hover:bg-gray-50"
                  >
                    <div className="flex gap-4">
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        width={50}
                        height={75}
                        className="rounded-md object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-lg">{movie.title}</h3>

                        <div className="flex items-center gap-1 text-sm mt-1">
                          ⭐ {movie.vote_average.toFixed(1)}
                          <span className="text-gray-400">/10</span>
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          {movie.release_date?.slice(0, 4)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}

                <Link
                  href={`/search?query=${search}`}
                  className="block p-4 font-medium hover:bg-gray-50"
                >
                  See all results for "{search}"
                </Link>
              </div>
            )}
          </div>
        </div>
        <Button variant="outline" size="icon">
          <Image src="/icon.png" alt="Theme" width={20} height={20} />
        </Button>
      </div>
    </header>
  );
}
