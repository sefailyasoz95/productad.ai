export type InitialState = {
  error: boolean;
  success: boolean;
  message: string;
  loading: boolean;
  isAuthenticated?: boolean;
  user?: UserType;
  products: StripeProduct[];
  checkoutUrl?: string;
  influencers: Influencer[];
  generatedImage: string;
  recentGenerations: any[];
};
export type UserType = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: "subscriber" | "admin";
  created_at: Date;
  updated_at: Date;
  company: string;
  marketing_emails_allowed: boolean;
  isSubscribed: string;
};
interface MarketingFeature {
  name: string;
}

interface Recurring {
  aggregate_usage: string | null;
  interval: "day" | "week" | "month" | "year";
  interval_count: number;
  meter: string | null;
  trial_period_days: number | null;
  usage_type: "licensed" | "metered";
}

interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: any | null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: Record<string, any>;
  nickname: string | null;
  product: string;
  recurring: Recurring;
  tax_behavior: string;
  tiers_mode: string | null;
  transform_quantity: any | null;
  type: "one_time" | "recurring";
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface StripeProduct {
  id: string;
  object: string;
  active: boolean;
  attributes: any[];
  created: number;
  default_price: string;
  description: string;
  images: string[];
  livemode: boolean;
  marketing_features: MarketingFeature[];
  metadata: {
    allowed_image: string;
    allowed_video: string;
    allowed_voice: string;
    support_type: string;
  };
  name: string;
  package_dimensions: any | null;
  shippable: boolean | null;
  statement_descriptor: string | null;
  tax_code: string;
  type: string;
  unit_label: string | null;
  updated: number;
  url: string | null;
  prices: Price[];
}

// Type definitions for the Influencer data structure

// Physical appearance type
interface PhysicalAppearance {
  hair: string;
  eyes: string;
  skin: string;
  features: string;
}

// Family background type
interface Family {
  father: string;
  mother: string;
}

// Background information type
interface Background {
  birthplace: string;
  family: Family;
  early_interests: string;
  education: string;
  career_highlights: string[];
}

// Speech style type
interface ToneAndSpeechStyle {
  style: string;
  quirks: string[];
  common_phrases: string[];
}

// Main Influencer type
export interface Influencer {
  // Primary key and basic info
  id: string;
  name: string;
  age: number;
  profession: string;

  // Complex fields
  physical_appearance: PhysicalAppearance;
  personality: string[];
  background: Background;
  tone_and_speech_style: ToneAndSpeechStyle;
  habits_and_mannerisms: string[];

  // Other fields
  social_media_bio: string;
  images: string[];

  // Metadata
  created_at: string;
  updated_at: string;
}

// Type for the flattened view (matches the SQL view we created)
export interface InfluencerDetail {
  id: string;
  name: string;
  age: number;
  profession: string;
  hair: string;
  eyes: string;
  skin: string;
  birthplace: string;
  education: string;
  image_count: number;
  created_at: string;
  updated_at: string;
}
