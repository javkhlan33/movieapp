import Image from "next/image";
import Link from "next/link";
export const MovieCard = ({
  id,
  image,
  title,
  rating,
  size = "large",
}: {
  id: number;
  image: string;
  title: string;
  rating: number;
  size?: "small" | "large";
}) => {
  return (
    <Link href={`/movie/${id}`}>
      <div
        className={`rounded-xl overflow-hidden ${
          size === "small" ? "w-[170px]" : "w-[230px]"
        }`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt={title}
          width={size === "small" ? 170 : 230}
          height={size === "small" ? 255 : 340}
          className={`object-cover w-full ${
            size === "small" ? "h-[270px]" : "h-[340px]"
          }`}
        />
        <div
          className={`bg-zinc-100 p-2 flex flex-col ${
            size === "small" ? "h-[80px]" : "h-[96px]"
          }`}
        >
          <div className="flex items-center gap-1 text-sm">
            ⭐<span>{rating}</span>
            <span className="text-gray-400">/10</span>
          </div>
          <h2
            className={`text-black line-clamp-2 ${
              size === "small" ? "text-sm" : "text-lg"
            }`}
          >
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};
