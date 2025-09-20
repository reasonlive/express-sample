export interface Message {
  id: number;
  name: string;
  phone: string;
  text: string;
  created_at: Date;
}

export interface CreateMessageRequest {
  name: string;
  phone: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
