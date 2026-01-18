export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          listing_id: string
          notes: string | null
          payment_status: string | null
          start_date: string
          status: string | null
          total_price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          listing_id: string
          notes?: string | null
          payment_status?: string | null
          start_date: string
          status?: string | null
          total_price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          listing_id?: string
          notes?: string | null
          payment_status?: string | null
          start_date?: string
          status?: string | null
          total_price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name_bn: string
          name_en: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_bn: string
          name_en: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name_bn?: string
          name_en?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          category_id: string | null
          created_at: string | null
          description_bn: string | null
          description_en: string | null
          id: string
          images: string[] | null
          is_featured: boolean | null
          listing_type: string
          location_bn: string | null
          location_en: string | null
          metadata: Json | null
          price: number
          price_period: string | null
          rating: number | null
          review_count: number | null
          seller_id: string | null
          status: string | null
          title_bn: string
          title_en: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description_bn?: string | null
          description_en?: string | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          listing_type: string
          location_bn?: string | null
          location_en?: string | null
          metadata?: Json | null
          price: number
          price_period?: string | null
          rating?: number | null
          review_count?: number | null
          seller_id?: string | null
          status?: string | null
          title_bn: string
          title_en: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description_bn?: string | null
          description_en?: string | null
          id?: string
          images?: string[] | null
          is_featured?: boolean | null
          listing_type?: string
          location_bn?: string | null
          location_en?: string | null
          metadata?: Json | null
          price?: number
          price_period?: string | null
          rating?: number | null
          review_count?: number | null
          seller_id?: string | null
          status?: string | null
          title_bn?: string
          title_en?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          quantity: number | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          quantity?: number | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          quantity?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment_sources: {
        Row: {
          account_holder_name: string | null
          account_number: string | null
          created_at: string
          id: string
          is_default: boolean | null
          metadata: Json | null
          provider_name: string
          source_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_holder_name?: string | null
          account_number?: string | null
          created_at?: string
          id?: string
          is_default?: boolean | null
          metadata?: Json | null
          provider_name: string
          source_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_holder_name?: string | null
          account_number?: string | null
          created_at?: string
          id?: string
          is_default?: boolean | null
          metadata?: Json | null
          provider_name?: string
          source_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          images: string[] | null
          name: string
          price: number
          stock: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          images?: string[] | null
          name: string
          price: number
          stock?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          images?: string[] | null
          name?: string
          price?: number
          stock?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      qr_payment_requests: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string
          description: string | null
          expires_at: string
          id: string
          paid_by: string | null
          qr_code_data: string
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string
          description?: string | null
          expires_at: string
          id?: string
          paid_by?: string | null
          qr_code_data: string
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string
          description?: string | null
          expires_at?: string
          id?: string
          paid_by?: string | null
          qr_code_data?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          product_id: string
          rating: number | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          product_id: string
          rating?: number | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          product_id?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: []
      }
      seller_profiles: {
        Row: {
          address: string | null
          bio: string | null
          business_name: string | null
          content_settings: Json | null
          created_at: string | null
          email: string | null
          id: string
          logo_url: string | null
          marketplace_settings: Json | null
          payment_methods: Json | null
          phone: string | null
          rental_settings: Json | null
          seller_type: Database["public"]["Enums"]["seller_type"]
          service_settings: Json | null
          terms_conditions: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          business_name?: string | null
          content_settings?: Json | null
          created_at?: string | null
          email?: string | null
          id: string
          logo_url?: string | null
          marketplace_settings?: Json | null
          payment_methods?: Json | null
          phone?: string | null
          rental_settings?: Json | null
          seller_type: Database["public"]["Enums"]["seller_type"]
          service_settings?: Json | null
          terms_conditions?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          business_name?: string | null
          content_settings?: Json | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          marketplace_settings?: Json | null
          payment_methods?: Json | null
          phone?: string | null
          rental_settings?: Json | null
          seller_type?: Database["public"]["Enums"]["seller_type"]
          service_settings?: Json | null
          terms_conditions?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          allow_discount_notifications: boolean | null
          allow_marketing_notifications: boolean | null
          created_at: string
          id: string
          preferred_notification_time: string | null
          reminder_frequency: number | null
          timezone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          allow_discount_notifications?: boolean | null
          allow_marketing_notifications?: boolean | null
          created_at?: string
          id?: string
          preferred_notification_time?: string | null
          reminder_frequency?: number | null
          timezone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          allow_discount_notifications?: boolean | null
          allow_marketing_notifications?: boolean | null
          created_at?: string
          id?: string
          preferred_notification_time?: string | null
          reminder_frequency?: number | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          payment_method: string | null
          recipient_id: string | null
          sender_id: string | null
          status: string
          transaction_type: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          status?: string
          transaction_type: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          status?: string
          transaction_type?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance: number
          created_at: string
          currency: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          added_at: string
          conversion_status: string | null
          id: string
          item_type: string
          last_reminder_sent: string | null
          metadata: Json | null
          product_id: string | null
          reminder_frequency: number | null
          service_id: string | null
          user_id: string
        }
        Insert: {
          added_at?: string
          conversion_status?: string | null
          id?: string
          item_type: string
          last_reminder_sent?: string | null
          metadata?: Json | null
          product_id?: string | null
          reminder_frequency?: number | null
          service_id?: string | null
          user_id: string
        }
        Update: {
          added_at?: string
          conversion_status?: string | null
          id?: string
          item_type?: string
          last_reminder_sent?: string | null
          metadata?: Json | null
          product_id?: string | null
          reminder_frequency?: number | null
          service_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wishlists: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_seller_profiles: {
        Row: {
          address: string | null
          bio: string | null
          business_name: string | null
          content_settings: Json | null
          created_at: string | null
          id: string | null
          logo_url: string | null
          marketplace_settings: Json | null
          payment_methods: Json | null
          rental_settings: Json | null
          seller_type: Database["public"]["Enums"]["seller_type"] | null
          service_settings: Json | null
          terms_conditions: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          business_name?: string | null
          content_settings?: Json | null
          created_at?: string | null
          id?: string | null
          logo_url?: string | null
          marketplace_settings?: Json | null
          payment_methods?: Json | null
          rental_settings?: Json | null
          seller_type?: Database["public"]["Enums"]["seller_type"] | null
          service_settings?: Json | null
          terms_conditions?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          business_name?: string | null
          content_settings?: Json | null
          created_at?: string | null
          id?: string | null
          logo_url?: string | null
          marketplace_settings?: Json | null
          payment_methods?: Json | null
          rental_settings?: Json | null
          seller_type?: Database["public"]["Enums"]["seller_type"] | null
          service_settings?: Json | null
          terms_conditions?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_categories_with_counts: {
        Args: never
        Returns: {
          created_at: string
          display_order: number
          icon: string
          id: string
          is_active: boolean
          listing_count: number
          name_bn: string
          name_en: string
          parent_id: string
          slug: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      seller_type: "marketplace" | "rental" | "service" | "content"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      seller_type: ["marketplace", "rental", "service", "content"],
    },
  },
} as const
