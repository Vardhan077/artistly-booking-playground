import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";

interface FilterOptions {
  categories: string[];
  locations: string[];
  priceRanges: string[];
}

interface FilterSidebarProps {
  onFiltersChange: (filters: FilterOptions) => void;
  className?: string;
}

const FilterSidebar = ({ onFiltersChange, className }: FilterSidebarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const categories = ["Singer", "DJ", "Dancer", "Speaker"];
  const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Miami, FL", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Boston, MA"];
  const priceRanges = ["$200-500", "$500-1000", "$1000-2000", "$2000+"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    setSelectedCategories(updated);
    updateFilters(updated, selectedLocations, selectedPriceRanges);
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedLocations, location]
      : selectedLocations.filter(l => l !== location);
    setSelectedLocations(updated);
    updateFilters(selectedCategories, updated, selectedPriceRanges);
  };

  const handlePriceRangeChange = (priceRange: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedPriceRanges, priceRange]
      : selectedPriceRanges.filter(p => p !== priceRange);
    setSelectedPriceRanges(updated);
    updateFilters(selectedCategories, selectedLocations, updated);
  };

  const updateFilters = (cats: string[], locs: string[], prices: string[]) => {
    onFiltersChange({
      categories: cats,
      locations: locs,
      priceRanges: prices
    });
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedPriceRanges([]);
    updateFilters([], [], []);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedLocations.length > 0 || selectedPriceRanges.length > 0;

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
        
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedCategories.map(cat => (
              <Badge key={cat} variant="secondary" className="text-xs">
                {cat}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleCategoryChange(cat, false)}
                />
              </Badge>
            ))}
            {selectedLocations.map(loc => (
              <Badge key={loc} variant="secondary" className="text-xs">
                {loc.split(",")[0]}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleLocationChange(loc, false)}
                />
              </Badge>
            ))}
            {selectedPriceRanges.map(price => (
              <Badge key={price} variant="secondary" className="text-xs">
                {price}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handlePriceRangeChange(price, false)}
                />
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Category</Label>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Locations */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Location</Label>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {locations.map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox
                  id={location}
                  checked={selectedLocations.includes(location)}
                  onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                />
                <Label htmlFor={location} className="text-sm font-normal cursor-pointer">
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range</Label>
          <div className="space-y-3">
            {priceRanges.map((priceRange) => (
              <div key={priceRange} className="flex items-center space-x-2">
                <Checkbox
                  id={priceRange}
                  checked={selectedPriceRanges.includes(priceRange)}
                  onCheckedChange={(checked) => handlePriceRangeChange(priceRange, checked as boolean)}
                />
                <Label htmlFor={priceRange} className="text-sm font-normal cursor-pointer">
                  {priceRange}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;