import { Address } from "./address";
export interface User {
  userId: string;
  name: string;
  role: string;
  email: string;
  dateOfJoining: string;
  lastSeen: string;
  userName: string;
  profileImage: string;
  coverImage: string;
  firstName: string;
  lastName: string;
  gender: string;
  buyer: boolean;
  seller: boolean;
  userAddress: Address[];
}
