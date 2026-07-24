"use client";

import Header from "./_components/header";

import { MovieList } from "./_components/movieList";
import Footer from "./_components/footer";
import { useEffect, useState } from "react";
import { Head } from "./_components/head";

const API_KEY = "502c1ed7cb7d214347c2fb36ce415a4e";
const BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT_UPCOMING = `/movie/upcoming?language=en-US&page=1`;
const ENDPOINT_POPULAR = `/movie/popular?language=en-US&page=1`;
const ENDPOINT_TOP_RATED = `/movie/top_rated?language=en-US&page=1`;
const API_URL = `${BASE_URL}${ENDPOINT_UPCOMING}&api_key=${API_KEY}`;

export default function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<any[]>([]);

  const fetchUpcomingMovies = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUpcomingMovies(data.results);
  };

  const fetchPopularMovies = async () => {
    const response = await fetch(
      `${BASE_URL}${ENDPOINT_POPULAR}&api_key=${API_KEY}`,
    );
    const data = await response.json();
    setPopularMovies(data.results);
  };

  const fetchTopRatedMovies = async () => {
    const response = await fetch(
      `${BASE_URL}${ENDPOINT_TOP_RATED}&api_key=${API_KEY}`,
    );
    const data = await response.json();
    setTopRatedMovies(data.results);
  };

  useEffect(() => {
    fetchUpcomingMovies();
    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  return (
    <div className="w-full h-screen ">
      <Header />
      <Head movies={upcomingMovies} />
      <MovieList
        genre="Upcoming"
        link="/upcoming"
        movies={upcomingMovies.slice(0, 10)}
      />

      <MovieList
        genre="Popular"
        link="/popular"
        movies={popularMovies.slice(0, 10)}
      />

      <MovieList
        genre="Top Rated"
        link="/toprated"
        movies={topRatedMovies.slice(0, 10)}
      />
      <Footer />
    </div>
  );
}
