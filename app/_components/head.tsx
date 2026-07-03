import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Head() {
  return (
    <section className="relative mx-auto w-full max-w-[1440px]">
      <Image
        src="/head1.png"
        alt="Hero"
        width={1280}
        height={600}
        className="h-[600px] w-full object-cover"
        priority
      />
      <div className="absolute left-[140px] top-1/2 -translate-y-1/2 z-10">
        <div className="flex flex-col ">
          <p className="text-lg text-white">Now Playing:</p>

          <h1 className="text-5xl font-bold text-white">Wicked</h1>

          <div className="flex items-center gap-2">
            <Image src="/star.png" alt="star" width={20} height={20} />

            <span className="text-white font-bold text-lg">
              6.9
              <span className="text-gray-300">/10</span>
            </span>
          </div>

          <p className="w-[320px] text-sm leading-6 text-white">
            Elphaba, a misunderstood young woman because of her green skin, and
            Glinda, a popular girl, become friends at Shiz University in the
            Land of Oz. After an encounter with the Wonderful Wizard of Oz,
            their friendship reaches a crossroads.
          </p>

          <Button className="w-fit bg-white text-black hover:bg-gray-100 mt-2.5">
            <Image src="/play.png" alt="play" width={16} height={16} />
            Watch Trailer
          </Button>
        </div>
      </div>
    </section>
  );
}
