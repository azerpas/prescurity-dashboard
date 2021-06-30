import {useRouter} from "next/router";
import {useEffect} from "react";
import firebase from "../utils/client";

const signOut = () => {
    const router = useRouter();
    useEffect(() => {
        const  signOut = async () => {
            await firebase.auth().signOut();
            await router.push("/");
        }
        signOut();
    })

    return null;
}

export default signOut;