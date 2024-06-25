import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";
const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="apple" height={18} width={14} />

        <div className="flex flex-1 max-sm:hidden justify-center">
          {navLists.map((nav) => (
            <nav key={nav} className="px-5 text-sm text-gray hover:text-white">
              {nav}
            </nav>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="search" height={18} width={18} />
          <img src={bagImg} alt="bag" height={18} width={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
