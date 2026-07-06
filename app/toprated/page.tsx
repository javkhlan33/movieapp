import Header from "@/app/_components/header";
import { MovieList } from "@/app/_components/movieList";
import Footer from "@/app/_components/footer";

export default function Home() {
  return (
    <div className="w-full h-screen ">
      <Header />
      <MovieList genre="Top Rated" link="/toprated" />
      <Footer />
    </div>
  );
}
