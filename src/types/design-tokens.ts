// BuildCare UAE Design System Tokens
// Auto-generated from Art Bible specifications

export interface ColorToken {
  value: string;
  description: string;
  usage: string[];
}

export interface AnimationToken {
  name: string;
  duration: string;
  easing: string;
  keyframes: Record<string, Record<string, string>>;
  usage: string[];
}

export interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  usage: string[];
}

export const colorTokens: Record<string, ColorToken> = {
  // Primary Brand Colors
  primary: {
    value: "hsl(345, 75%, 68%)",
    description: "Coral Pink - Main brand color for BuildCare",
    usage: ["buttons", "mascot elements", "primary actions", "brand accents"]
  },
  
  secondary: {
    value: "hsl(45, 85%, 75%)",
    description: "UAE Gold - Secondary brand color",
    usage: ["accents", "secondary buttons", "highlights", "decorative elements"]
  },

  // Service-Specific Colors
  pool: {
    value: "hsl(195, 85%, 75%)",
    description: "Pool Blue - Aquatic services theme",
    usage: ["pool buildy", "water-related content", "pool service pages"]
  },

  pest: {
    value: "hsl(25, 85%, 72%)",
    description: "Pest Orange - Extermination services theme", 
    usage: ["pest buildy", "pest control content", "warning states"]
  },

  cleaning: {
    value: "hsl(155, 60%, 82%)",
    description: "Cleaning Mint - Cleaning services theme",
    usage: ["cleaning buildy", "cleaning content", "success states"]
  },

  // Neutral Colors
  background: {
    value: "hsl(220, 100%, 98%)",
    description: "Soft background base",
    usage: ["page backgrounds", "card backgrounds", "clean surfaces"]
  },

  foreground: {
    value: "hsl(220, 15%, 15%)",
    description: "Primary text color",
    usage: ["headings", "body text", "high contrast text"]
  },

  muted: {
    value: "hsl(220, 30%, 94%)", 
    description: "Muted background tones",
    usage: ["secondary backgrounds", "disabled states", "subtle dividers"]
  },

  mutedForeground: {
    value: "hsl(220, 15%, 45%)",
    description: "Secondary text color",
    usage: ["captions", "supporting text", "metadata"]
  }
};

export const animationTokens: Record<string, AnimationToken> = {
  chibiBounce: {
    name: "chibi-bounce",
    duration: "2s",
    easing: "ease-in-out infinite",
    keyframes: {
      "0%, 100%": { 
        transform: "translateY(0px) rotate(0deg)" 
      },
      "50%": { 
        transform: "translateY(-10px) rotate(1deg)" 
      }
    },
    usage: ["mascot idle animations", "playful elements", "hero mascots"]
  },

  float: {
    name: "float", 
    duration: "3s",
    easing: "ease-in-out infinite",
    keyframes: {
      "0%, 100%": { 
        transform: "translateY(0px)" 
      },
      "50%": { 
        transform: "translateY(-8px)" 
      }
    },
    usage: ["floating elements", "pool themes", "gentle movements"]
  },

  wiggle: {
    name: "wiggle",
    duration: "1.5s", 
    easing: "ease-in-out infinite",
    keyframes: {
      "0%, 100%": { 
        transform: "rotate(-2deg)" 
      },
      "50%": { 
        transform: "rotate(2deg)" 
      }
    },
    usage: ["sad roach character", "playful elements", "attention grabbers"]
  },

  kawaiiPulse: {
    name: "kawaii-pulse",
    duration: "2s",
    easing: "ease-in-out infinite", 
    keyframes: {
      "0%, 100%": { 
        transform: "scale(1)",
        opacity: "1"
      },
      "50%": { 
        transform: "scale(1.05)",
        opacity: "0.8"
      }
    },
    usage: ["accent indicators", "call-to-action elements", "highlight points"]
  }
};

export const typographyTokens: Record<string, TypographyToken> = {
  displayLarge: {
    fontFamily: "Fredoka",
    fontSize: "3.5rem", // 56px
    fontWeight: "700",
    lineHeight: "1.1",
    usage: ["hero titles", "main headings", "mascot names"]
  },

  displayMedium: {
    fontFamily: "Fredoka", 
    fontSize: "2.25rem", // 36px
    fontWeight: "600",
    lineHeight: "1.2",
    usage: ["section headers", "page titles", "feature headings"]
  },

  displaySmall: {
    fontFamily: "Fredoka",
    fontSize: "1.5rem", // 24px  
    fontWeight: "500",
    lineHeight: "1.3",
    usage: ["card titles", "component headers", "subsection titles"]
  },

  bodyLarge: {
    fontFamily: "Nunito",
    fontSize: "1.125rem", // 18px
    fontWeight: "400", 
    lineHeight: "1.6",
    usage: ["intro text", "important content", "featured descriptions"]
  },

  bodyMedium: {
    fontFamily: "Nunito",
    fontSize: "1rem", // 16px
    fontWeight: "400",
    lineHeight: "1.5", 
    usage: ["body text", "paragraphs", "standard content"]
  },

  bodySmall: {
    fontFamily: "Nunito",
    fontSize: "0.875rem", // 14px
    fontWeight: "400",
    lineHeight: "1.4",
    usage: ["captions", "supporting text", "metadata", "labels"]
  }
};

export const spacingTokens = {
  xs: "0.25rem", // 4px
  sm: "0.5rem",  // 8px  
  md: "1rem",    // 16px
  lg: "1.5rem",  // 24px
  xl: "2rem",    // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem"  // 64px
} as const;

export const radiusTokens = {
  default: "1rem",     // 16px - Standard components
  mascot: "1.5rem",    // 24px - Character cards  
  pill: "9999px",      // Full round - Kawaii buttons
  sm: "0.5rem",        // 8px - Small elements
  lg: "1.25rem"        // 20px - Large components
} as const;

export const shadowTokens = {
  soft: "0 4px 20px hsl(220 15% 15% / 0.08)",
  mascot: "0 8px 30px hsl(345 75% 68% / 0.25)", 
  float: "0 12px 40px hsl(220 15% 15% / 0.12)",
  none: "none"
} as const;

// Design System Configuration
export interface DesignSystemConfig {
  colors: typeof colorTokens;
  animations: typeof animationTokens;
  typography: typeof typographyTokens;
  spacing: typeof spacingTokens;
  radius: typeof radiusTokens;
  shadows: typeof shadowTokens;
  seriousMode: boolean;
}

export const defaultConfig: DesignSystemConfig = {
  colors: colorTokens,
  animations: animationTokens, 
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadows: shadowTokens,
  seriousMode: false
};