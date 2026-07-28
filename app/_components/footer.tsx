import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-700 text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-20 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          {/* Logo */}
          <div>
            <Image src="/Logo.png" alt="logo" width={92} height={20} />

            <p className="mt-4 text-sm text-indigo-200">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>

          {/* Mobile: Contact + Follow */}
          <div className="grid grid-cols-2 gap-8 lg:contents">
            {/* Contact */}
            <div>
              <h3 className="mb-4 text-base font-medium">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-indigo-200" />

                  <div>
                    <p className="text-sm text-indigo-200">Email:</p>
                    <p>support@moviez.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-indigo-200" />

                  <div>
                    <p className="text-sm text-indigo-200">Phone:</p>
                    <p>+976 (11) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow */}
            <div>
              <h3 className="mb-4 text-base font-medium">Follow us</h3>

              <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:gap-6">
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>
                <a href="#">Youtube</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
