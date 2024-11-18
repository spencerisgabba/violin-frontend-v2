import "./footer.scss";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const imageWH = 80;

  return (
    <footer className="shadow footer">
      <div className="pt-8 px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <Link
              href={"/"}
              className="flex items-center flex-shrink-0 text-white mr-6 mt-2"
            >
              <Image
                priority={true}
                width={imageWH}
                height={imageWH}
                className={"Logo"}
                src={"/Logo.svg"}
                alt={"Logo"}
              />
              <div>
                <p className="font-serif text-lg tracking-tight w-20 h-14 -mt-6">
                  Violin Guild of America
                </p>
              </div>
            </Link>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-white">
            <li>
              <Link href="/home" className="hover:underline me-4 md:me-6">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/instruments"
                className="hover:underline me-4 md:me-6"
              >
                instruments
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:underline me-4 md:me-6">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Designed and developed by Spencer Schmidt
        </span>
      </div>
    </footer>
  );
};

export default Footer;
