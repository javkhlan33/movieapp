import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/header";
import Head from "./_components/head";
import { MovieList } from "./_components/movieList";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <div className="w-full h-screen ">
      <Header />
      <Head />
      <MovieList genre="Upcoming" />
      <MovieList genre="Popular" />
      <MovieList genre="Top Rated" />
      <Footer />
    </div>
  );
}
