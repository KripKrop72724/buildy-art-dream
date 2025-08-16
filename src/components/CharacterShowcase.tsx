import { Card } from "@/components/ui/card";
import cureRatsImage from "@/assets/cure-rats.png";
import sadRoachImage from "@/assets/sad-roach.png";

export const CharacterShowcase = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <Card className="mascot-card border-2 border-secondary/30 hover:border-secondary/50">
        <div className="p-6 text-center">
          <div className="relative mb-6">
            <img 
              src={cureRatsImage} 
              alt="Cure Rats Team"
              className="w-full max-w-sm mx-auto object-contain rounded-mascot"
            />
          </div>
          
          <h3 className="text-2xl font-display font-bold mb-3 text-foreground">
            The Cure Rats Team
          </h3>
          
          <p className="text-muted-foreground mb-4 font-body">
            Our adorable maintenance crew! These kawaii rats help with repairs, cleaning, and general upkeep. They're friendly, hardworking, and always ready to lend a paw.
          </p>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-secondary mx-auto mb-1"></div>
              <span className="font-body">Wrench Rat</span>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-accent mx-auto mb-1"></div>
              <span className="font-body">Broom Rat</span>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 rounded-full bg-pest mx-auto mb-1"></div>
              <span className="font-body">Spray Rat</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mascot-card border-2 border-destructive/30 hover:border-destructive/50">
        <div className="p-6 text-center">
          <div className="relative mb-6">
            <img 
              src={sadRoachImage} 
              alt="Sad Roach Character"
              className="w-32 h-32 mx-auto object-contain animate-wiggle"
            />
          </div>
          
          <h3 className="text-2xl font-display font-bold mb-3 text-foreground">
            Mr. Sad Roach
          </h3>
          
          <p className="text-muted-foreground mb-4 font-body">
            The apologetic antagonist! This cute roach character represents pests that need to be removed. He's not scary at all - just sad that he has to go. Perfect for making pest control approachable.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-destructive animate-kawaii-pulse"></span>
              <span className="font-body text-muted-foreground">Non-threatening design</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-destructive animate-kawaii-pulse"></span>
              <span className="font-body text-muted-foreground">Kawaii bow tie accessory</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-destructive animate-kawaii-pulse"></span>
              <span className="font-body text-muted-foreground">Sparkling apologetic eyes</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};