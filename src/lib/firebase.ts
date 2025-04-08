import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const initFirebase = async () => {
  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);
    if (typeof window !== "undefined") {
      if (await isSupported()) {
        const analytics = getAnalytics(app);
        // Initialize basic analytics tracking
        logEvent(analytics, "app_initialized");
        return { app, analytics };
      }
    }
    return { app };
  }
};

export const trackEvent = async (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined") {
    const { analytics } = (await initFirebase()) || {};
    if (analytics) {
      logEvent(analytics, eventName, eventParams);
    }
  }
};
