import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const DesignTokens = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <Card className="p-6">
        <h3 className="text-xl font-display font-bold mb-4">Color Palette</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary"></div>
            <div>
              <div className="font-semibold">Primary (Coral Pink)</div>
              <div className="text-sm text-muted-foreground">HSL(345, 75%, 68%)</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary"></div>
            <div>
              <div className="font-semibold">Secondary (UAE Gold)</div>
              <div className="text-sm text-muted-foreground">HSL(45, 85%, 75%)</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pool"></div>
            <div>
              <div className="font-semibold">Pool Blue</div>
              <div className="text-sm text-muted-foreground">HSL(195, 85%, 75%)</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-pest"></div>
            <div>
              <div className="font-semibold">Pest Orange</div>
              <div className="text-sm text-muted-foreground">HSL(25, 85%, 72%)</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent"></div>
            <div>
              <div className="font-semibold">Cleaning Mint</div>
              <div className="text-sm text-muted-foreground">HSL(155, 60%, 82%)</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-display font-bold mb-4">Typography</h3>
        <div className="space-y-4">
          <div>
            <div className="font-display text-2xl">Fredoka Display</div>
            <div className="text-sm text-muted-foreground mb-2">Headings & Mascot Text</div>
          </div>
          <div>
            <div className="font-body text-lg">Nunito Body</div>
            <div className="text-sm text-muted-foreground mb-2">Body Text & UI</div>
          </div>
          <div className="text-xs text-muted-foreground">
            Rounded, friendly fonts that match the kawaii aesthetic while maintaining readability.
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-display font-bold mb-4">Animation Tokens</h3>
        <div className="space-y-4">
          <div>
            <Button size="sm" className="animate-chibi-bounce mb-2">Chibi Bounce</Button>
            <div className="text-xs text-muted-foreground">Main mascot animation</div>
          </div>
          <div>
            <Button size="sm" className="animate-float mb-2">Float Effect</Button>
            <div className="text-xs text-muted-foreground">Gentle floating motion</div>
          </div>
          <div>
            <Button size="sm" className="animate-wiggle mb-2">Kawaii Wiggle</Button>
            <div className="text-xs text-muted-foreground">Playful character movement</div>
          </div>
          <div>
            <Button size="sm" className="animate-kawaii-pulse mb-2">Pulse Accent</Button>
            <div className="text-xs text-muted-foreground">Attention-drawing elements</div>
          </div>
        </div>
      </Card>
    </div>
  );
};