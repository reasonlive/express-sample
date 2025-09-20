export interface FormData {
  name: string | undefined;
  phone: string | undefined;
  message: string | undefined;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
