import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-700 text-white ">
      <div className="mx-auto flex max-w-[1440px] justify-between px-20 py-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={92} height={20} />
          </div>
          <p className="text-xs text-indigo-200">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Contact Information</h3>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-200" />
            <div>
              <p className="text-xs text-indigo-200">Email</p>
              <p className="text-sm">support@moviez.com</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-indigo-200" />
            <div>
              <p className="text-xs text-indigo-200">Phone</p>
              <p className="text-sm">+976 85455497</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Follow us</h3>

          <div className="flex gap-4 text-sm">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Youtube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
