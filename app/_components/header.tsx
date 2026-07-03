import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-20">
        <div className="flex items-center gap-2">
          <Image src="/logo (1).png" alt="logo" width={92} height={20} />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Image src="/doosh.png" alt="" width={16} height={16} />
            Genre
          </Button>

          <div className="relative">
            <Image
              src="/asuultiintemdeg.png"
              alt=""
              width={16}
              height={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />

            <Input placeholder="Search..." className="w-[379px] pl-10" />
          </div>
        </div>
        <Button variant="outline" size="icon">
          <Image src="/icon.png" alt="Theme" width={20} height={20} />
        </Button>
      </div>
    </header>
  );
}
