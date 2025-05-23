export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  totalAverageWeightRatings ?: number;
  numberOfRents?: number;
  numberOfReviews?: number;
  recentlyActive?: number;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  numberOfRents?: number;
  numberOfReviews?: number;
  recentlyActive?: number;
}

export interface UserFilterParams {
  page: number;
  limit: number; // Limit per page 
}

export interface UserAuth {
  email: string;
  password: string;
}