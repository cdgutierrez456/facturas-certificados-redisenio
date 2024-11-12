export const env = {
    MEGARED_TOKEN: process.env.MEGARED_QA_TOKEN || "",
    MEGARED_HOSTNAME: process.env.MEGARED_QA_HOSTNAME || "",
    MEGARED_VERSION: "2.0.3"
  }

export const firebaseConfig = {
  apiKey: process.env.MEGARED_API_KEY,
  authDomain: process.env.MEGARED_AUTH_DOMAIN,
  projectId: "pagosquestions",
  storageBucket: process.env.MEGARED_STORAGE_BUCKET,
  messagingSenderId: process.env.MEGARED_MESSAGING_SENDER_ID,
  appId: process.env.MEGARED_APP_ID,
  measurementId: process.env.MEGARED_MEASUREMENT_ID
};
