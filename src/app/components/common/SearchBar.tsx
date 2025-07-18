import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar: React.FC = () => {
    const CiSearchIcon = CiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    return (
        <div className="px-4">

            <label className="w-full  mx-auto my-4 px-2 border border-gray-300 rounded-md flex items-center bg-white shadow-sm focus-within:ring-2 focus-within:ring-teal-500">
                <CiSearchIcon className="text-xl" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded-md px-4 py-2 text-sm focus:outline-none"
                    aria-label="Search"
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {

                        }
                    }}
                />
            </label>
        </div>
    );
};

export default SearchBar;
