import ContactMe from "@/components/ContactMe";
import { imageConfigs } from "@/config/imageConfig";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-gray-300 py-8 px-4 md:px-8 bg-black mt-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
          {/* Left Block */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-pink-500 font-bold text-xl">AImage</h2>
            <p className="text-sm">© {currentYear} AImage. All rights reserved.</p>
            <p className="text-sm">Contact us: zhy19890221@gmail.com</p>
            <div className="mt-4">
              <ContactMe />
            </div>
          </div>

          {/* Right Blocks */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Resources Column */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-white font-bold">Resources</h3>
              <Link href="/" className="text-gray-300 hover:text-pink-400 transition-colors">
                AImage
              </Link>
              {/* <Link href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                Use Cases
              </Link> */}
            </div>

            {/* Tools Column */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-white font-bold">Free Tools</h3>
              {imageConfigs.map((config) => (
                <Link
                  key={config.name}
                  href={`/tools/${config.link}`}
                  className="text-gray-300 hover:text-pink-400 transition-colors"
                >
                  {config.name}
                </Link>
              ))}
            </div>

            {/* Company Column */}
            <div className="flex flex-col space-y-2">
              <h3 className="text-white font-bold">Company</h3>
              <Link href="/privacy-policy" className="text-gray-300 hover:text-pink-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-300 hover:text-pink-400 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/about-us" className="text-gray-300 hover:text-pink-400  transition-colors">
                About Us
              </Link>
              <Link href="/contact-us" className="text-gray-300 hover:text-pink-400 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
