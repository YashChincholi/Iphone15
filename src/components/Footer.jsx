import { footerLinks } from "../constants";
const Footer = () => {
  return (
    <footer className="py-5 md:px-10 px-5">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-gray text-xs">
            More ways to shop:{" "}
            <span className="text-blue underline">Find an apple store</span> or{" "}
            <span className="text-blue underline">other retailers</span> Near
            you
          </p>
          <p className="font-semibold text-gray text-xs">
            Or call 0080-80-0000
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray text-xs">
            Copyright @ 2024 Apple Inc. All rights reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p className="font-semibold text-gray text-xs" key={link}>
                {link}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2">|</span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
