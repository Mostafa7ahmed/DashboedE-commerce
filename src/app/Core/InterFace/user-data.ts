export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }
  
  export interface UserResponse {
    totalUsers: number;
    metadata: {
      currentPage: number;
      numberOfPages: number;
      limit: number;
      nextPage?: number;
      previousPage?: number;
    };
    users: User[];
  }
  
