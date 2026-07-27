"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type TrailerPlayerProps = {
  trailer: {
    key: string;
    name: string;
  };
};

export default function TrailerPlayer({ trailer }: TrailerPlayerProps) {
  if (!trailer) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-lg transition hover:bg-gray-100 dark:bg-white dark:text-black sm:gap-3 sm:px-5 sm:py-3 sm:text-base">
          <Image
            src="/trailerIcon.png"
            alt="Play Trailer"
            width={32}
            height={32}
            className="h-6 w-6 sm:h-8 sm:w-8"
          />
          <span>Play Trailer</span>
        </button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-5xl overflow-hidden border-0 bg-black p-0">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
