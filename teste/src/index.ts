// src/index.ts

// --- Imports from your Firebase and Authentication modules ---
// These bring in the functions we need to perform authentication actions.
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  signInWithEmail,
  signOutUser
} from './teste/src/authentication';

// We import the 'auth' instance directly from firebase.ts because onAuthStateChanged needs it.
import { auth } from './firebase';

// We import the onAuthStateChanged listener and the User type directly from the Firebase Auth SDK.
// updateProfile is needed to set the user's display name after sign-up.
import { onAuthStateChanged, User, updateProfile } from 'firebase/auth';

// --- Define your page paths ---
// IMPORTANT: Adjust these paths to precisely match your actual HTML file names and locations.
// For example, if your login page is "pages/login.html", update LOGIN_PAGE_PATH accordingly.
const LOGIN_PAGE_PATH = '/login.html';
const CADASTRO_PAGE_PATH = '/cadastro.html'; // Your Sign Up page
const DASHBOARD_PAGE_PATH = '/homepage.html'; // Your main content page after login

// --- Helper functions for displaying error messages ---
// These functions help centralize how errors are shown to the user on the page.
function displayError(elementId: string, message: string) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden'); // Make the error message visible
  } else {
    console.error(`Error element with ID '${elementId}' not found on the page.`);
  }
}

function clearError(elementId: string) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.add('hidden'); // Hide the error message
  }
}

// --- Main logic that runs when the HTML document is fully loaded ---
// This ensures that all HTML elements exist before we try to interact with them.
document.addEventListener('DOMContentLoaded', () => {
  // Get the current page's path. We convert it to lowercase for case-insensitive comparison.
  const currentPagePath = window.location.pathname.toLowerCase();

  // --- Logic specific to the Login Page (login.html) ---
  if (currentPagePath.includes(LOGIN_PAGE_PATH.toLowerCase())) {
    console.log("Initializing login page logic.");

    // Get references to elements on the login page, matching your login.html IDs.
    const signInForm = document.getElementById('form') as HTMLFormElement | null;
    const signInEmailInput = document.getElementById('email') as HTMLInputElement | null;
    const signInPasswordInput = document.getElementById('senha') as HTMLInputElement | null;
    const loginErrorMessage = document.getElementById('loginErrorMessage') as HTMLParagraphElement | null; // This element should be added to login.html
    const googleSignInBtn = document.getElementById('googleSignInBtn') as HTMLButtonElement | null; // This element should be added to login.html

    // If the sign-in form and its inputs are found, attach the submit event listener.
    if (signInForm && signInEmailInput && signInPasswordInput) {
      signInForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the browser's default form submission (which reloads the page).
        if (loginErrorMessage) clearError('loginErrorMessage'); // Clear any previous errors.

        const email = signInEmailInput.value;
        const password = signInPasswordInput.value;

        try {
          // Call the signInWithEmail function from authentication.ts
          await signInWithEmail(email, password);
          // If successful, the onAuthStateChanged listener (defined globally below) will handle redirection.
          signInForm.reset(); // Clear the form fields.
        } catch (error: any) {
          // If an error occurs, display it to the user.
          const firebaseErrorMsg = error.message || "Erro desconhecido ao fazer login.";
          if (loginErrorMessage) displayError('loginErrorMessage', firebaseErrorMsg);
          else alert(`Erro: ${firebaseErrorMsg}`); // Fallback alert if no specific element.
          console.error("Email sign-in error:", error);
        }
      });
    }

    // If the Google Sign-In button is found, attach its click event listener.
    if (googleSignInBtn) {
      googleSignInBtn.addEventListener('click', async () => {
        if (loginErrorMessage) clearError('loginErrorMessage'); // Clear previous errors.
        try {
          // Call the signInWithGoogle function from authentication.ts
          await signInWithGoogle();
          // onAuthStateChanged will handle redirection.
        } catch (error: any) {
          const firebaseErrorMsg = error.message || "Erro desconhecido ao fazer login com Google.";
          if (loginErrorMessage) displayError('loginErrorMessage', firebaseErrorMsg);
          else alert(`Erro: ${firebaseErrorMsg}`); // Fallback alert.
          console.error("Google sign-in error:", error);
        }
      });
    }
  }

  // --- Logic specific to the Cadastro (Sign Up) Page (cadastro.html) ---
  else if (currentPagePath.includes(CADASTRO_PAGE_PATH.toLowerCase())) {
    console.log("Initializing cadastro page logic.");

    // Get references to elements on the cadastro page, matching your cadastro.html IDs.
    const signUpForm = document.getElementById('form') as HTMLFormElement | null;
    const signUpNameInput = document.getElementById('nome') as HTMLInputElement | null;
    const signUpEmailInput = document.getElementById('email') as HTMLInputElement | null;
    const signUpPasswordInput = document.getElementById('senha') as HTMLInputElement | null;
    const cadastroErrorMessage = document.getElementById('cadastroErrorMessage') as HTMLParagraphElement | null; // This element should be added to cadastro.html

    // If the sign-up form and its inputs are found, attach the submit event listener.
    if (signUpForm && signUpNameInput && signUpEmailInput && signUpPasswordInput) {
      signUpForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission.
        if (cadastroErrorMessage) clearError('cadastroErrorMessage'); // Clear previous errors.

        const name = signUpNameInput.value;
        const email = signUpEmailInput.value;
        const password = signUpPasswordInput.value;

        try {
          // Call the signUpWithEmailAndPassword function from authentication.ts.
          // This creates the user in Firebase Auth and signs them in immediately.
          const user = await signUpWithEmailAndPassword(email, password);

          // OPTIONAL: Update the user's display name after successful account creation.
          // Firebase's createUserWithEmailAndPassword doesn't set a display name directly.
          if (user && name) {
            await updateProfile(user, {
              displayName: name,
            });
            console.log("User display name updated:", name);
          }

          // onAuthStateChanged will handle redirection.
          signUpForm.reset(); // Clear the form fields.
        } catch (error: any) {
          // If an error occurs, display it.
          const firebaseErrorMsg = error.message || "Erro desconhecido ao cadastrar.";
          if (cadastroErrorMessage) displayError('cadastroErrorMessage', firebaseErrorMsg);
          else alert(`Erro: ${firebaseErrorMsg}`); // Fallback alert.
          console.error("Email sign-up error:", error);
        }
      });
    }
  }

  // --- Logic specific to the Dashboard Page (dashboard.html) ---
  else if (currentPagePath.includes(DASHBOARD_PAGE_PATH.toLowerCase())) {
    console.log("Initializing dashboard page logic.");

    // Get references to elements on the dashboard page.
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    const userDisplayNameDisplay = document.getElementById('userDisplayNameDisplay');
    const userUidDisplay = document.getElementById('userUidDisplay');
    const signOutBtn = document.getElementById('signOutBtn') as HTMLButtonElement | null;
    const dashboardErrorMessage = document.getElementById('dashboardErrorMessage') as HTMLParagraphElement | null; // Add this if you want specific errors on dashboard

    // This section directly populates user info if they are already logged in
    // when arriving at the dashboard, or when the auth state changes on this page.
    // We re-use onAuthStateChanged here to ensure displays are fresh.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (userEmailDisplay) userEmailDisplay.textContent = user.email || 'N/A';
        if (userDisplayNameDisplay) userDisplayNameDisplay.textContent = user.displayName || 'N/A';
        if (userUidDisplay) userUidDisplay.textContent = user.uid;
      } else {
        // If somehow the user is on dashboard but not logged in, redirect them.
        // This is a safety measure; the global listener below should catch this too.
        if (currentPagePath === DASHBOARD_PAGE_PATH) {
             window.location.href = LOGIN_PAGE_PATH;
        }
      }
    });

    // If the Sign Out button is found, attach its click event listener.
    if (signOutBtn) {
      signOutBtn.addEventListener('click', async () => {
        if (dashboardErrorMessage) clearError('dashboardErrorMessage'); // Clear previous errors.
        try {
          // Call the signOutUser function from authentication.ts
          await signOutUser();
          // onAuthStateChanged will handle redirection.
        } catch (error: any) {
          const firebaseErrorMsg = error.message || "Erro desconhecido ao sair.";
          if (dashboardErrorMessage) displayError('dashboardErrorMessage', firebaseErrorMsg);
          else alert(`Erro: ${firebaseErrorMsg}`); // Fallback alert.
          console.error("Sign-out error:", error);
        }
      });
    }
  }
  // Add more 'else if' blocks here for other pages in your app if they need specific JS logic.
});


// --- Global onAuthStateChanged Listener for Navigation ---
// This is a critical listener that runs *every time* the authentication state changes
// (e.g., user logs in, logs out, session expires) AND on every page load.
// Its primary job is to ensure users are always on the correct page based on their login status.
onAuthStateChanged(auth, (user: User | null) => {
  const currentPagePath = window.location.pathname.toLowerCase(); // Current page URL path.
  const isLoggedIn = !!user; // `true` if a user object exists (logged in), `false` if `null` (logged out).

  console.log("Auth State Changed. User:", user ? user.uid : "None", "IsLoggedIn:", isLoggedIn, "Current Page:", currentPagePath);

  if (isLoggedIn) {
    // If the user IS logged in:
    // If they are on a login or sign-up page, redirect them to the main dashboard.
    if (currentPagePath.includes(LOGIN_PAGE_PATH.toLowerCase()) || currentPagePath.includes(CADASTRO_PAGE_PATH.toLowerCase())) {
      console.log("User is logged in on an auth page, redirecting to dashboard.");
      window.location.href = DASHBOARD_PAGE_PATH; // Redirect to your dashboard page.
    }
    // If they are already on the dashboard or another intended page, do nothing here.
  } else {
    // If the user IS NOT logged in:
    // If they are on the dashboard (or any other page that requires login), redirect them to the login page.
    if (currentPagePath.includes(DASHBOARD_PAGE_PATH.toLowerCase())) {
      console.log("User is logged out on the dashboard, redirecting to login page.");
      window.location.href = LOGIN_PAGE_PATH; // Redirect to your login page.
    }
    // If they are already on a login/sign-up page (which is where they should be), do nothing here.
  }
});
