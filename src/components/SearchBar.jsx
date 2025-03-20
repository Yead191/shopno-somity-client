import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <div className="hidden lg:flex items-center gap-2 lg:w-[400px] ">
            <Input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border rounded-lg px-4 py-2 flex-1 w-full "
            />
            <Button onClick={handleSearch} className="p-2">
                <Search className="w-5 h-5" />
            </Button>
        </div>
    );
};

export default SearchBar;
