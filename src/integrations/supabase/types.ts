export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      awards: {
        Row: {
          book_id: string | null
          created_at: string | null
          id: string
          name: string
          year: string | null
        }
        Insert: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          year?: string | null
        }
        Update: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "awards_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_details: {
        Row: {
          book_id: string | null
          created_at: string | null
          id: string
          illustrator: string | null
          isbn: string | null
          pages: string | null
          price: string | null
          publisher: string | null
          updated_at: string | null
          year: string | null
        }
        Insert: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          illustrator?: string | null
          isbn?: string | null
          pages?: string | null
          price?: string | null
          publisher?: string | null
          updated_at?: string | null
          year?: string | null
        }
        Update: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          illustrator?: string | null
          isbn?: string | null
          pages?: string | null
          price?: string | null
          publisher?: string | null
          updated_at?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_details_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string
          category_id: string | null
          cover_image: string | null
          created_at: string
          description: string | null
          id: string
          slug: string | null
          title: string
        }
        Insert: {
          author: string
          category_id?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          slug?: string | null
          title: string
        }
        Update: {
          author?: string
          category_id?: string | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: string
          slug?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "books_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      distinctions: {
        Row: {
          book_id: string | null
          created_at: string | null
          id: string
          name: string
          year: string | null
        }
        Insert: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          year?: string | null
        }
        Update: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "distinctions_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      editions: {
        Row: {
          book_id: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "editions_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      press_links: {
        Row: {
          book_id: string | null
          created_at: string | null
          id: string
          label: string | null
          url: string
        }
        Insert: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          label?: string | null
          url: string
        }
        Update: {
          book_id?: string | null
          created_at?: string | null
          id?: string
          label?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "press_links_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_book_cover_urls: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
