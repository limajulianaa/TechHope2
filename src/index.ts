// src/index.ts

// 1. Import necessary functions from your authentication.ts and firebase.ts files
// This brings in the functions we created to handle sign-up, sign-in, and sign-out,
// as well as the 'auth' instance and the 'onAuthStateChanged' listener from Firebase.
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  signInWithEmail,
  signOutUser
} from './authentication'; // Functions from your authentication.ts
import { auth } from './firebase'; // The Firebase Auth instance from your firebase.ts
import { onAuthStateChanged, User } from 'firebase/auth'; // The auth state listener and User type directly from Firebase SDK

// 2. Get references to HTML elements
// We use 'document.getElementById' to grab each element by its ID.
// The '!' tells TypeScript that we are sure these elements exist in the HTML.
const authStatus = document.getElementById('authStatus')!;
const authForms = document.getElementById('authForms')!;
const userInfo = document.getElementById('userInfo')!;

const signUpForm = document.getElementById('signUpForm') as HTMLFormElement;
const signUpEmailInput = document.getElementById('signUpEmail') as HTMLInputElement;
const signUpPasswordInput = document.getElementById('signUpPassword') as HTMLInputElement;

const signInForm = document.getElementById('signInForm') as HTMLFormElement;
const signInEmailInput = document.getElementById('signInEmail') as HTMLInputElement;
const signInPasswordInput = document.getElementById('signInPassword') as HTMLInputElement;

const googleSignInBtn = document.getElementById('googleSignInBtn')!;
const signOutBtn = document.getElementById('signOutBtn')!;

const userUidSpan = document.getElementById('userUid')!;
const userEmailSpan = document.getElementById('userEmail')!;
const userDisplayNameSpan = document.getElementById('userDisplayName')!;

// 3. Set up the onAuthStateChanged listener
// This is the most crucial part for managing UI state based on authentication.
// It fires whenever the user's sign-in state changes.
onAuthStateChanged(auth, (user: User | null) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user.uid);
    authStatus.textContent = `You are logged in as: ${user.email}`;
    authForms.classList.add('hidden'); // Hide authentication forms
    userInfo.classList.remove('hidden'); // Show user info

    // Display user details
    userUidSpan.textContent = user.uid;
    userEmailSpan.textContent = user.email || 'N/A';
    userDisplayNameSpan.textContent = user.displayName || 'N/A';
  } else {
    // User is signed out
    console.log("No user is signed in.");
    authStatus.textContent = "You are currently logged out.";
    authForms.classList.remove('hidden'); // Show authentication forms
    userInfo.classList.add('hidden'); // Hide user info
  }
});

// 4. Add Event Listeners for Forms and Buttons

// Handle Google Sign-In button click
googleSignInBtn.addEventListener('click', async () => {
  try {
    await signInWithGoogle();
    // onAuthStateChanged will handle UI updates
  } catch (error: any) {
    alert(`Google Sign-In Failed: ${error.message}`);
    console.error("Google sign-in error:", error);
  }
});

// Handle Email/Password Sign Up form submission
signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission (page reload)

  const email = signUpEmailInput.value;
  const password = signUpPasswordInput.value;

  try {
    await signUpWithEmailAndPassword(email, password);
    // onAuthStateChanged will handle UI updates
    signUpForm.reset(); // Clear form on success
  } catch (error: any) {
    alert(`Sign Up Failed: ${error.message}`);
    console.error("Email sign-up error:", error);
  }
});

// Handle Email/Password Sign In form submission
signInForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission (page reload)

  const email = signInEmailInput.value;
  const password = signInPasswordInput.value;

  try {
    await signInWithEmail(email, password);
    // onAuthStateChanged will handle UI updates
    signInForm.reset(); // Clear form on success
  } catch (error: any) {
    alert(`Sign In Failed: ${error.message}`);
    console.error("Email sign-in error:", error);
  }
});

// Handle Sign Out button click
signOutBtn.addEventListener('click', async () => {
  try {
    await signOutUser();
    // onAuthStateChanged will handle UI updates
  } catch (error: any) {
    alert(`Sign Out Failed: ${error.message}`);
    console.error("Sign-out error:", error);
  }
});
