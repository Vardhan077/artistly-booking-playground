import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  count: number;
  onClick?: () => void;
  className?: string;
}

const CategoryCard = ({ 
  name, 
  description, 
  icon: Icon, 
  count, 
  onClick,
  className 
}: CategoryCardProps) => {
  return (
    <Card 
      className={cn(
        "group cursor-pointer bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-8 w-8 text-white" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
            <div className="text-xs text-primary font-medium">
              {count} artists available
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;