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
        className={`overflow-hidden w-full rounded-xl ${
          size === "small" ? "w-[170px]" : "w-[230px]"
        }`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt={title}
          width={size === "small" ? 170 : 230}
          height={size === "small" ? 255 : 340}
          className={`w-full object-cover ${
            size === "small"
              ? "h-[220px] sm:h-[250px] lg:h-[270px]"
              : "h-[260px] sm:h-[300px] lg:h-[340px]"
          }`}
        />

        <div
          className={`flex flex-col p-2 bg-zinc-100 dark:bg-zinc-900 ${
            size === "small" ? "min-h-[80px]" : "min-h-[96px]"
          }`}
        >
          <div className="flex items-center gap-1 text-xs text-zinc-700 dark:text-zinc-300 sm:text-sm">
            ⭐<span>{rating}</span>
            <span className="text-zinc-400 dark:text-zinc-500">/10</span>
          </div>

          <h2
            className={`line-clamp-2 text-black dark:text-white ${
              size === "small" ? "text-xs sm:text-sm" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};
