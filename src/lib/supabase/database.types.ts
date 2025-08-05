export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          preferred_language: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          preferred_language?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          preferred_language?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      lesson_plans: {
        Row: {
          id: string
          user_id: string
          title: string
          original_filename: string
          file_path: string
          file_type: string
          file_size: number
          extracted_text: string | null
          tags: string[] | null
          age_group: string | null
          subject: string | null
          language: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          original_filename: string
          file_path: string
          file_type: string
          file_size: number
          extracted_text?: string | null
          tags?: string[] | null
          age_group?: string | null
          subject?: string | null
          language?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          original_filename?: string
          file_path?: string
          file_type?: string
          file_size?: number
          extracted_text?: string | null
          tags?: string[] | null
          age_group?: string | null
          subject?: string | null
          language?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      lesson_plan_embeddings: {
        Row: {
          id: string
          lesson_plan_id: string
          content: string
          embedding: number[] | null
          chunk_index: number
          created_at: string
        }
        Insert: {
          id?: string
          lesson_plan_id: string
          content: string
          embedding?: number[] | null
          chunk_index: number
          created_at?: string
        }
        Update: {
          id?: string
          lesson_plan_id?: string
          content?: string
          embedding?: number[] | null
          chunk_index?: number
          created_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          lesson_plan_id: string | null
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_plan_id?: string | null
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_plan_id?: string | null
          title?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          role: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: string
          content?: string
          created_at?: string
        }
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