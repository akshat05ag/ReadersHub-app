
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BookFilterProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const BookFilter = ({ onSearch, onCategoryChange }: BookFilterProps) => {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    onCategoryChange(value);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Search by title, author, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full"
          onClick={handleSearch}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <Tabs
          defaultValue="all"
          className="w-auto"
          onValueChange={onCategoryChange}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="rented">Rented</TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              <span>Genre</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedGenre}
              onValueChange={handleGenreChange}
            >
              <DropdownMenuRadioItem value="all">
                All Genres
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="fiction">
                Fiction
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="non-fiction">
                Non-Fiction
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="science fiction">
                Science Fiction
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="fantasy">
                Fantasy
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="romance">
                Romance
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="mystery">
                Mystery
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="biography">
                Biography
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BookFilter;
