import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MascotCard } from "@/components/MascotCard";
import { CharacterShowcase } from "@/components/CharacterShowcase";
import { DesignTokens } from "@/components/DesignTokens";

// Import mascot images
import buildyPoolImage from "@/assets/buildy-pool.png";
import buildyPestImage from "@/assets/buildy-pest.png";
import buildyCleaningImage from "@/assets/buildy-cleaning.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-display font-bold mb-6 text-foreground animate-chibi-bounce">
            BuildCare Anime Art Bible
          </h1>
          <p className="text-xl text-muted-foreground mb-8 font-body max-w-2xl mx-auto">
            Welcome to the kawaii world of BuildCare UAE! Meet our adorable chibi mascots and discover the anime-inspired design system that makes building maintenance cute and approachable.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="kawaii" size="kawaii">
              Explore Mascots
            </Button>
            <Button variant="outline" size="lg" className="font-display">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Mascot Gallery */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
            Meet the Buildy Family
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Our chibi mascots specialize in different building services, each with their own personality and kawaii charm.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <MascotCard
            title="Pool Buildy"
            description="The aquatic specialist who keeps pools sparkling clean with a smile!"
            image={buildyPoolImage}
            variant="pool"
            features={[
              "Pool maintenance expert",
              "Water chemistry specialist", 
              "Cheerful aquatic helper",
              "Splash-proof kawaii design"
            ]}
          />
          
          <MascotCard
            title="Pest Buildy"
            description="The friendly exterminator who makes pest control less scary and more kawaii!"
            image={buildyPestImage}
            variant="pest"
            features={[
              "Gentle pest removal",
              "Child-friendly approach",
              "Professional equipment",
              "Reassuring presence"
            ]}
          />
          
          <MascotCard
            title="Cleaning Buildy"
            description="The sparkle master who turns messy spaces into pristine environments!"
            image={buildyCleaningImage}
            variant="cleaning"
            features={[
              "Deep cleaning specialist",
              "Eco-friendly methods",
              "Attention to detail",
              "Magical sparkle effects"
            ]}
          />
        </div>

        {/* Supporting Characters */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold mb-4 text-foreground">
            Supporting Cast
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Meet the cute helpers and adorable antagonists that complete our anime world.
          </p>
        </div>

        <CharacterShowcase />
      </section>

      {/* Design System */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-card/50 to-card/30 rounded-3xl my-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
            Design System Tokens
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Our carefully crafted anime-inspired design language combines kawaii aesthetics with professional functionality.
          </p>
        </div>

        <DesignTokens />
      </section>

      {/* Motion Language */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
            Motion & Interaction Language
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Gentle, playful animations that bring our kawaii characters to life while maintaining professional usability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h3 className="text-2xl font-display font-bold mb-4">Animation Principles</h3>
            <ul className="space-y-3 font-body text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-kawaii-pulse"></span>
                Gentle easing curves for kawaii feel
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-pool animate-kawaii-pulse"></span>
                Reduced motion respect for accessibility
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-kawaii-pulse"></span>
                Chibi-style bounce and float effects
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary animate-kawaii-pulse"></span>
                Micro-interactions for engagement
              </li>
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-display font-bold mb-4">Serious Mode Toggle</h3>
            <p className="font-body text-muted-foreground mb-4">
              For professional contexts, we can switch to a more subdued presentation while maintaining the friendly design language.
            </p>
            <Button variant="outline" className="w-full mb-4">
              Toggle Serious Mode (Coming Soon)
            </Button>
            <div className="text-sm text-muted-foreground font-body">
              • Reduced animations<br/>
              • Professional color variants<br/>
              • Simplified mascot expressions
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center border-t border-border/50">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
            Ready to Build Something Kawaii?
          </h3>
          <p className="text-muted-foreground font-body mb-6">
            This art bible defines the visual language for BuildCare UAE's anime-inspired brand identity.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="kawaii" size="kawaii">
              Download Art Guide
            </Button>
            <Button variant="secondary" size="lg">
              View Site Map
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;