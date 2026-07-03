import Image from "next/image";
import Link from "next/link";
export const MovieCard = ({
  id,
  image,
  title,
  rating,
}: {
  id: number;
  image: string;
  title: string;
  rating: number;
}) => {
  return (
    <Link href={`/movie/${id}`}>
      <div className="w-[230px] rounded-xl object-cover">
        <Image
          src={image}
          alt={title}
          width={230}
          height={340}
          className="w-full  object-cover"
        />
        <div className="bg-zinc-100 p-2 h-[96px] flex flex-col">
          <div className="flex items-center gap-1 text-sm">
            ⭐<span>{rating}</span>
            <span className="text-gray-400">/10</span>
          </div>
          <h2 className="text-black text-lg ">{title}</h2>
        </div>
      </div>
    </Link>
  );
};
