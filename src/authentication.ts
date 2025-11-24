// // src/authentication.ts

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  // --- NEW IMPORTS FOR EMAIL/PASSWORD ---
  createUserWithEmailAndPassword, // Function to register a new user with email and password
  signInWithEmailAndPassword,   // Function to sign in an existing user with email and password
  AuthError,                    // Type for Firebase Auth errors (optional, for explicit type-checking)
} from 'firebase/auth';

import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

// --- EXISTING GOOGLE SIGN-IN FUNCTIONS ---

export const signInWithGoogle = async (): Promise<User> => {
  // ... (existing code for Google Sign-In)
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user: User = result.user;
    console.log("Successfully signed in with Google! User UID:", user.uid);
    return user;
  } catch (error: any) {
    console.error("Error during Google Sign-In:", error.code, error.message);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  // ... (existing code for signing out)
  try {
    await signOut(auth);
    console.log("User successfully signed out.");
  } catch (error: any) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

// --- NEW FUNCTIONS FOR EMAIL/PASSWORD AUTHENTICATION ---

/**
 * @description Registers a new user with email and password.
 * @param {string} email The user's email address.
 * @param {string} password The user's chosen password.
 * @returns {Promise<User>} A Promise that resolves with the newly created Firebase User object.
 * @throws {AuthError} If an error occurs during user creation (e.g., email already in use, weak password).
 */
export const signUpWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  try {
    // This function creates a new user account in Firebase Authentication.
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user: User = userCredential.user;
    console.log("Successfully signed up with email! User UID:", user.uid);
    return user;
  } catch (error: any) {
    // Handle specific errors like 'auth/email-already-in-use', 'auth/weak-password', etc.
    const authError: AuthError = error; // Cast to AuthError for specific properties
    console.error("Error during email sign-up:", authError.code, authError.message);
    throw authError; // Re-throw the error for UI handling
  }
};

/**
 * @description Signs in an existing user with email and password.
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 * @returns {Promise<User>} A Promise that resolves with the signed-in Firebase User object.
 * @throws {AuthError} If an error occurs during sign-in (e.g., wrong password, user not found).
 */
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    // This function signs in an existing user.
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user: User = userCredential.user;
    console.log("Successfully signed in with email! User UID:", user.uid);
    return user;
  } catch (error: any) {
    // Handle specific errors like 'auth/user-not-found', 'auth/wrong-password', etc.
    const authError: AuthError = error;
    console.error("Error during email sign-in:", authError.code, authError.message);
    throw authError; // Re-throw the error for UI handling
  }
};
