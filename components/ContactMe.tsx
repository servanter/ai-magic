import Link from "next/link";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

import { SiBuymeacoffee } from "react-icons/si";


const ContactMe = () => {
  return (
    <div className="flex flex-row items-center">
      <Link
        href="mailto:zhy19890221@gmail.com"
        target="_blank"
        rel="noopener norefferer nofollow"
        className="mr-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <MdEmail className="text-lg" />
      </Link>
      <Link
        href="https://github.com/servanter"
        target="_blank"
        rel="noopener norefferer nofollow"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <BsGithub className="text-lg" />
      </Link>
      <Link
        href="https://x.com/hongyanzha38268"
        target="_blank"
        rel="noopener norefferer nofollow"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <BsTwitterX className="text-lg" />
      </Link>
      <Link
        href="https://buymeacoffee.com/archerzhang"
        target="_blank"
        rel="noopener norefferer nofollow"
        className="mx-3 flex max-w-[24px] flex-col items-center justify-center"
      >
        <SiBuymeacoffee className="text-lg" />
      </Link>
    </div>
  );
};
export default ContactMe;
