/* eslint-disable @typescript-eslint/no-explicit-any */
export enum ApiStatus {
    success = "success",
    error = "error",
  }
  
  export interface ApiResponse {
    status: ApiStatus;
    data?: any;
    message: string;
  }
  