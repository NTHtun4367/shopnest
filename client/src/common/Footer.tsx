import { AtSign } from "lucide-react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { SiAppstore } from "react-icons/si";
import useMediaQuery from "../hooks/useMediaQuery";

function Footer() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <footer className="secondary-bg py-4 mt-16">
      {isDesktop ? (
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold italic">SHOPNEST</h3>
          <p className="flex items-center gap-1">
            <AtSign className="w-5 h-5" />
            2025 All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <IoLogoGooglePlaystore size={30} />
            <SiAppstore size={30} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between mx-6">
          <div>
            <h3 className="text-xl font-bold italic">SHOPNEST</h3>
            <p className="flex items-center gap-1 text-xs">
              <AtSign className="w-3 h-3" />
              2025 All Rights Reserved.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoLogoGooglePlaystore size={25} />
            <SiAppstore size={25} />
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
