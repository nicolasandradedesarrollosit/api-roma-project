export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Payload attached to req.user by authMiddleware (derived from Firebase token).
 * Note: firebaseUid is decoded.uid from Firebase — NOT the MongoDB _id.
 */
export interface IAuthPayload {
  firebaseUid: string;
  email: string;
  role: string | UserRole;
}

/**
 * Payload used inside JWT tokens issued by the non-Firebase login endpoint.
 * userId here is the MongoDB _id of the AuthUser document.
 */
export interface IJwtPayload {
  userId: string;
  email: string;
  role: string | UserRole;
}
