import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/ui/navigation";
import ArtistCard from "@/components/ArtistCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Search, Filter, Grid, List, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import artistsData from "@/data/artists.json";

interface FilterOptions {
  categories: string[];
  locations: string[];
  priceRanges: string[];
}

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    locations: [],
    priceRanges: []
  });
  
  const { toast } = useToast();

  const filteredAndSortedArtists = useMemo(() => {
    let filtered = artistsData.filter(artist => {
      // Search filter
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artist.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artist.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.includes(artist.category);
      
      // Location filter
      const matchesLocation = filters.locations.length === 0 || 
                             filters.locations.includes(artist.location);
      
      // Price range filter (simplified matching)
      const matchesPriceRange = filters.priceRanges.length === 0 || 
                               filters.priceRanges.some(range => {
                                 // Basic price range matching logic
                                 if (range === "$200-500") return artist.priceRange.includes("$300") || artist.priceRange.includes("$400");
                                 if (range === "$500-1000") return artist.priceRange.includes("$500") || artist.priceRange.includes("$600") || artist.priceRange.includes("$750") || artist.priceRange.includes("$900");
                                 if (range === "$1000-2000") return artist.priceRange.includes("$1000") || artist.priceRange.includes("$1200") || artist.priceRange.includes("$2000");
                                 if (range === "$2000+") return artist.priceRange.includes("$2500");
                                 return false;
                               });
      
      return matchesSearch && matchesCategory && matchesLocation && matchesPriceRange;
    });

    // Sort artists
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "bookings":
          return b.bookings - a.bookings;
        case "price-low":
          return parseInt(a.priceRange.split("-")[0].replace("$", "")) - 
                 parseInt(b.priceRange.split("-")[0].replace("$", ""));
        case "price-high":
          return parseInt(b.priceRange.split("-")[0].replace("$", "")) - 
                 parseInt(a.priceRange.split("-")[0].replace("$", ""));
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filters, sortBy]);

  const handleQuoteRequest = (artistId: number) => {
    const artist = artistsData.find(a => a.id === artistId);
    toast({
      title: "Quote Request Sent!",
      description: `Your quote request has been sent to ${artist?.name}. They will respond within 24 hours.`,
    });
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({ categories: [], locations: [], priceRanges: [] });
    setSearchTerm("");
  };

  const hasActiveFilters = filters.categories.length > 0 || filters.locations.length > 0 || filters.priceRanges.length > 0 || searchTerm.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Amazing Artists
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Browse through our curated collection of talented performers. Find the perfect artist for your next event.
            </p>
            
            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search artists, categories, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="bookings">Most Booked</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex items-center border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
            
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="text-xs">
                    Search: "{searchTerm}"
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => setSearchTerm("")}
                    />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar onFiltersChange={handleFiltersChange} />
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-background p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <FilterSidebar onFiltersChange={handleFiltersChange} />
              </div>
            )}

            {/* Artists Grid/List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredAndSortedArtists.length} artists found
                </p>
              </div>

              {filteredAndSortedArtists.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    No artists match your current filters.
                  </p>
                  <Button onClick={clearAllFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className={
                  viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }>
                  {filteredAndSortedArtists.map((artist) => (
                    <ArtistCard
                      key={artist.id}
                      artist={artist}
                      onQuoteRequest={handleQuoteRequest}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Artists;