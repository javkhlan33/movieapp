"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

type TrailerPlayerProps = {
  trailer: any;
};

export default function TrailerPlayer({ trailer }: TrailerPlayerProps) {
  if (!trailer) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-3 rounded-full bg-white/90 px-5 py-3 font-medium shadow-lg hover:bg-white">
          <Image
            src="/trailerIcon.png"
            alt="Play Trailer"
            width={32}
            height={32}
          />
          <p>Play Trailer</p>
        </button>
      </DialogTrigger>

      <DialogContent className="w-full border-0 p-0 flex items-center w-[1000px]">
        <iframe
          width="1000"
          height="600"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </DialogContent>
    </Dialog>
  );
}
