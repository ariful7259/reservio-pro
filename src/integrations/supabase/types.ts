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
      notification_queue: {
        Row: {
          content: Json | null
          created_at: string
          id: string
          notification_type: string
          scheduled_for: string
          sent_at: string | null
          status: string | null
          user_id: string
          wishlist_item_id: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: string
          notification_type: string
          scheduled_for: string
          sent_at?: string | null
          status?: string | null
          user_id: string
          wishlist_item_id: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: string
          notification_type?: string
          scheduled_for?: string
          sent_at?: string | null
          status?: string | null
          user_id?: string
          wishlist_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_queue_wishlist_item_id_fkey"
            columns: ["wishlist_item_id"]
            isOneToOne: false
            referencedRelation: "wishlist_items"
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
      retargeting_campaigns: {
        Row: {
          campaign_message: string | null
          campaign_name: string
          created_at: string
          discount_amount: number | null
          discount_percentage: number | null
          end_date: string | null
          id: string
          is_active: boolean | null
          item_type: string
          seller_id: string
          start_date: string
          target_criteria: Json | null
          target_product_id: string | null
          target_service_id: string | null
        }
        Insert: {
          campaign_message?: string | null
          campaign_name: string
          created_at?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          item_type: string
          seller_id: string
          start_date?: string
          target_criteria?: Json | null
          target_product_id?: string | null
          target_service_id?: string | null
        }
        Update: {
          campaign_message?: string | null
          campaign_name?: string
          created_at?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          item_type?: string
          seller_id?: string
          start_date?: string
          target_criteria?: Json | null
          target_product_id?: string | null
          target_service_id?: string | null
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
      seller_insights: {
        Row: {
          conversion_count: number | null
          conversion_rate: number | null
          id: string
          item_type: string
          last_updated: string
          product_id: string | null
          seller_id: string
          service_id: string | null
          wishlist_count: number | null
        }
        Insert: {
          conversion_count?: number | null
          conversion_rate?: number | null
          id?: string
          item_type: string
          last_updated?: string
          product_id?: string | null
          seller_id: string
          service_id?: string | null
          wishlist_count?: number | null
        }
        Update: {
          conversion_count?: number | null
          conversion_rate?: number | null
          id?: string
          item_type?: string
          last_updated?: string
          product_id?: string | null
          seller_id?: string
          service_id?: string | null
          wishlist_count?: number | null
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
      get_public_seller_info: {
        Args: Record<PropertyKey, never>
        Returns: {
          address: string
          bio: string
          business_name: string
          content_settings: Json
          created_at: string
          id: string
          logo_url: string
          marketplace_settings: Json
          payment_methods: Json
          rental_settings: Json
          seller_type: Database["public"]["Enums"]["seller_type"]
          service_settings: Json
          terms_conditions: string
          updated_at: string
        }[]
      }
    }
    Enums: {
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
      seller_type: ["marketplace", "rental", "service", "content"],
    },
  },
} as const
