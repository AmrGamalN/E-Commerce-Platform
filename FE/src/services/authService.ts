import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { LoginResponse, LogoutResponse, SignUpData } from "@/types/authType";
import { FacebookAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

// 🔹 Sign up with Phone Number & Password
export const signUp = async ({
  phoneNumber,
  password,
  confirmPassword,
  email,
  firstName,
  lastName,
  accountType,
  terms,
}: SignUpData) => {
  try {
    // Construct the payload dynamically
    const payload: SignUpData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      terms,
      accountType,
    };

    const phoneRegex = /^\+?[0-9\s-]{6,}$/;

    // Only add phoneNumber if it exists
    if (phoneRegex.test(phoneNumber!)) {
      payload.phoneNumber = phoneNumber;
    }

    // Use the axiosInstance for making the POST request
    const response = await axiosInstance.post("/auth/register/email", payload);

    return response?.data?.message;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to register user");
    }
    throw new Error("Failed to register user");
  }
};

// 🔹 Sign in with Phone Number & Password
export const login = async (identifier: string, password: string, loginChoice: string): Promise<LoginResponse> => {
  try {
    const isPhoneNumber = /^\d+$/.test(identifier);
    const payload = isPhoneNumber
      ? {
          mobile: identifier,
          password,
        }
      : {
          email: identifier,
          password,
        };
    // Use the axiosInstance for making the POST request
    const response = await axiosInstance.post(`/auth/login/${loginChoice === "email" ? "email" : "phone"}`, payload);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to log in");
    }
    throw new Error("Failed to log in");
  }
};

// logout
export const logout = async (): Promise<LogoutResponse> => {
  try {
    // Use the axiosInstance for making the POST request
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to log out");
    }
    throw new Error("Failed to log out");
  }
};

// Login by google api BE send Id
export const loginByGoogle = async (idToken: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("/auth/login/google", { idToken });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to log in");
    }
    console.error(error);
    throw new Error("Failed to log in");
  }
};
// handle auth login with google
export const HandleLoginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    await loginByGoogle(token);
    console.log("User Info:", user);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login");
  }
};

// register Sign up by google api BE
export const signUpByGoogle = async (idToken: string): Promise<LoginResponse> => {
  console.log("id Token from sign up by google ", idToken);
  try {
    const response = await axiosInstance.post("/auth/register/google", { idToken });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to sign up");
    }
    console.error(error);
    throw new Error("Failed to sign up");
  }
};
//  register with google
export const HandleRegisterWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    await signUpByGoogle(token);

    console.log("Firebase Token:", token);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register");
  }
};

// handle auth login with Facebook
export const HandleloginFacebook = async (): Promise<{ user: object } | undefined | null> => {
  const provider = new FacebookAuthProvider();
  provider.addScope("email");
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    await loginByFacebook(idToken);
    return { user };
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Failed to login");
  }
};

// Sign in by facebook api BE
export const loginByFacebook = async (idToken: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("/auth/login/facebook", { idToken });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to log in");
    }
    console.error(error);
    throw new Error("Failed to log in");
  }
};
// handle register with Facebook
export const HandleRegisterFacebook = async (): Promise<{ user: object } | undefined | null> => {
  const provider = new FacebookAuthProvider();
  provider.addScope("email");
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    await signUpByFacebook(idToken);
    return { user };
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Failed to register");
  }
};

// Sign up by facebook api BE
export const signUpByFacebook = async (idToken: string): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post("/auth/register/facebook", { idToken });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to sign up");
    }
    console.error(error);
    throw new Error("Failed to sign up");
  }
};
