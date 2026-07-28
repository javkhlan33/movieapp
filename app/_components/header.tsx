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
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const API_KEY = "502c1ed7cb7d214347c2fb36ce415a4e";
const BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT_UPCOMING = `/genre/movie/list?language=en`;
const API_URL = `${BASE_URL}${ENDPOINT_UPCOMING}&api_key=${API_KEY}`;

export default function Header() {
  const [genres, setGenres] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
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
    <header className="w-full border-b relative z-[9999] bg-background">
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-20">
        {/* Logo */}
        {!isSearchOpen && (
          <Link href="/" className="flex items-center">
            <Image src="/Logo (1).png" alt="Movie Z" width={92} height={20} />
          </Link>
        )}

        {/* Desktop */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:flex">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Image src="/doosh.png" alt="" width={16} height={16} />
                Genre
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[750px]">
              <h2 className="text-4xl font-bold">Genres</h2>

              <p className="mt-2 mb-6 text-lg text-muted-foreground">
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
              className="absolute top-1/2 left-3 -translate-y-1/2"
            />

            <Input
              placeholder="Search..."
              className="w-full pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {searchResults.length > 0 && (
              <div className="absolute left-0 top-full z-[9999] mt-2 w-[520px] rounded-xl border bg-background shadow-2xl">
                {searchResults.slice(0, 5).map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="flex gap-4 border-b p-4 hover:bg-gray-50"
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      width={50}
                      height={75}
                      className="rounded-md object-cover"
                    />

                    <div>
                      <h3 className="text-lg font-semibold">{movie.title}</h3>

                      <div className="mt-1 flex items-center gap-1 text-sm">
                        ⭐ {movie.vote_average.toFixed(1)}
                        <span className="text-gray-400">/10</span>
                      </div>

                      <p className="mt-1 text-sm text-gray-500">
                        {movie.release_date?.slice(0, 4)}
                      </p>
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
        <div className="hidden w-1/4 justify-end lg:flex">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              mounted && setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <div className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile */}
        {!isSearchOpen ? (
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <Image src="/asuultiintemdeg.png" alt="" width={18} height={18} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                mounted && setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <div className="h-5 w-5" />
              )}
            </Button>
          </div>
        ) : (
          <div className="flex w-full items-center gap-2 lg:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsGenreOpen(!isGenreOpen)}
            >
              <Image src="/doosh.png" alt="" width={16} height={16} />
            </Button>

            <div className="relative flex-1">
              <Image
                src="/asuultiintemdeg.png"
                alt=""
                width={16}
                height={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />

              <Input
                className="pl-10"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSearch("");
                setSearchResults([]);
                setIsGenreOpen(false);
                setIsSearchOpen(false);
              }}
            >
              ✕
            </Button>
          </div>
        )}
      </div>
      {isSearchOpen && isGenreOpen && (
        <div className="border-t bg-white p-4 lg:hidden">
          <h2 className="mb-4 text-xl font-bold">Genres</h2>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}`}
                onClick={() => {
                  setIsSearchOpen(false);
                  setIsGenreOpen(false);
                }}
              >
                <Button variant="outline">{genre.name}</Button>
              </Link>
            ))}
          </div>
        </div>
      )}
      {isSearchOpen && searchResults.length > 0 && (
        <div className="border-t bg-white lg:hidden">
          {searchResults.slice(0, 5).map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              onClick={() => setIsSearchOpen(false)}
              className="flex gap-3 border-b p-4"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                width={50}
                height={75}
                className="rounded"
              />

              <div>
                <h3 className="font-semibold">{movie.title}</h3>

                <p className="text-sm text-gray-500">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>

                <p className="text-sm text-gray-500">
                  {movie.release_date?.slice(0, 4)}
                </p>
              </div>
            </Link>
          ))}

          <Link
            href={`/search?query=${search}`}
            className="block p-4 font-medium"
          >
            See all results
          </Link>
        </div>
      )}
    </header>
  );
}
