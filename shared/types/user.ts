export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  updatedAt: number;
  totalAverageWeightRatings ?: number;
  numberOfRents?: number;
  numberOfReviews?: number;
  recentlyActive?: boolean;
}

export interface CreateUserDTO {
  name: string;
  email: string;
}