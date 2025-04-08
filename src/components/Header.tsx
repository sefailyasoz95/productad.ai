import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-12 fixed top-0 z-50 bg-background/10 backdrop-blur-lg rounded-b-3xl">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center justify-center w-full">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-5xl gradient-text">
              ProductAd.ai
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
