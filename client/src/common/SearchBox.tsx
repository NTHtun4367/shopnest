import { Search } from "lucide-react";

function SearchBox() {
  return (
    <div className="w-96 relative">
      <form>
        <input
          type="text"
          className="bg-gray-200 focus:outline-none ps-10 py-2 w-full text-black text-sm rounded-full"
        />
        <Search className="absolute top-1.5 left-2 text-black" />
      </form>
    </div>
  );
}

export default SearchBox;
