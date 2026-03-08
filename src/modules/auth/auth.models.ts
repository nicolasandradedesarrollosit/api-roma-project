import mongoose, { type Document, Schema } from "mongoose";

export interface IAuthUser extends Document {
  email: string;
  firebaseUid?: string;
  firstName: string;
  lastName: string;
  password?: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const authUserSchema = new Schema<IAuthUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Optional: only present for Firebase-authenticated users.
    // sparse allows multiple documents with no firebaseUid while still
    // enforcing uniqueness among those that do have one.
    firebaseUid: {
      type: String,
      sparse: true,
      unique: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "guest"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const AuthUser = mongoose.model<IAuthUser>("AuthUser", authUserSchema);
