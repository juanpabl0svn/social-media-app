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
      comments: {
        Row: {
          comment: string
          comment_date: string
          id_comment: number
          id_post: number
          id_user: number
        }
        Insert: {
          comment: string
          comment_date?: string
          id_comment?: number
          id_post: number
          id_user: number
        }
        Update: {
          comment?: string
          comment_date?: string
          id_comment?: number
          id_post?: number
          id_user?: number
        }
        Relationships: [
          {
            foreignKeyName: "comments_id_post_fkey"
            columns: ["id_post"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id_post"]
          },
          {
            foreignKeyName: "comments_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id_user"]
          },
        ]
      }
      followers: {
        Row: {
          id_follow: number
          id_user: number
          id_user_follower: number
          request_date: string
          request_update_date: string | null
          state: string
        }
        Insert: {
          id_follow?: number
          id_user: number
          id_user_follower: number
          request_date?: string
          request_update_date?: string | null
          state?: string
        }
        Update: {
          id_follow?: number
          id_user?: number
          id_user_follower?: number
          request_date?: string
          request_update_date?: string | null
          state?: string
        }
        Relationships: [
          {
            foreignKeyName: "followers_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id_user"]
          },
          {
            foreignKeyName: "followers_id_user_follower_fkey"
            columns: ["id_user_follower"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id_user"]
          },
        ]
      }
      posts: {
        Row: {
          create_date: string
          description: string | null
          id_post: number
          id_user: number
          image_src: string
        }
        Insert: {
          create_date?: string
          description?: string | null
          id_post?: number
          id_user: number
          image_src: string
        }
        Update: {
          create_date?: string
          description?: string | null
          id_post?: number
          id_user?: number
          image_src?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id_user"]
          },
        ]
      }
      users: {
        Row: {
          birth_date: string | null
          create_date: string
          email: string
          id_user: number
          name: string
          password: string
          username: string
        }
        Insert: {
          birth_date?: string | null
          create_date?: string
          email: string
          id_user?: number
          name: string
          password: string
          username: string
        }
        Update: {
          birth_date?: string | null
          create_date?: string
          email?: string
          id_user?: number
          name?: string
          password?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
