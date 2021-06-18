import * as admin from 'firebase-admin'

let firebasePrivateKey = process.env.API_KEY!;

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.PROJECT_ID,
			clientEmail: process.env.CLIENT_EMAIL,
			// https://stackoverflow.com/a/41044630/1332513
			privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
		}),
		databaseURL: process.env.DATABASE_URL,
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