import * as admin from 'firebase-admin'

let firebasePrivateKey = process.env.PRIVATE_KEY!;

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
			clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
			// https://stackoverflow.com/a/41044630/1332513
			privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
		}),
		databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
	})
}

export const verifyIdToken = (token: string) => {
	return admin
		.auth()
		.verifyIdToken(token)
		.catch((error) => {
		 	throw error
		})
}

export default admin