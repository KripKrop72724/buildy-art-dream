import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MascotCardProps {
  title: string;
  description: string;
  image: string;
  variant: "pool" | "pest" | "cleaning" | "default";
  features: string[];
}

export const MascotCard = ({ title, description, image, variant, features }: MascotCardProps) => {
  const variantClasses = {
    pool: "border-pool/30 hover:border-pool/50",
    pest: "border-pest/30 hover:border-pest/50", 
    cleaning: "border-accent/30 hover:border-accent/50",
    default: "border-primary/30 hover:border-primary/50"
  };

  return (
    <Card className={`mascot-card border-2 ${variantClasses[variant]} transition-all duration-300 hover:shadow-xl`}>
      <div className="p-6 text-center">
        <div className="relative mb-6">
          <img 
            src={image} 
            alt={title}
            className="w-32 h-32 mx-auto object-contain animate-float"
          />
        </div>
        
        <h3 className="text-2xl font-display font-bold mb-3 text-foreground">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 font-body">
          {description}
        </p>
        
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center justify-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-kawaii-pulse"></span>
              <span className="font-body text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button variant={variant} size="kawaii" className="w-full">
          Meet {title}!
        </Button>
      </div>
    </Card>
  );
};