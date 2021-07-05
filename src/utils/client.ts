import firebase from 'firebase/app';
import 'firebase/auth';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    });
}

// TODO
// As httpOnly cookies are to be used, do not persist any state client side.

//firebase.auth().setPersistence(firebase.auth.Auth?.Persistence?.NONE);

export default firebase;