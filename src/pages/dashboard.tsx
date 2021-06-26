import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../context/user";
import * as ROUTES from '../constants/routes';
import { getSelectedAddress, initWeb3 } from "../utils/web3";
import { useState } from "react";
import Web3 from "web3";
import { useEffect } from "react";

const Dashboard = () => {
    const userData = useContext(UserContext);
    const router = useRouter();
    const [web3, setWeb3] = useState<undefined|Web3>();
    const [userAddress, setUserAddress] = useState<undefined|string>(); // TODO: to set inside the UserContext directly

    const initializeBlockchain = async () => { // TODO: import from another file
        const web = await initWeb3();
        console.log("web3:");
        console.log(web);
        setWeb3(web);
        const selected = await getSelectedAddress();
        setUserAddress(selected);
    }

    useEffect(() => {
        if(userData.loggedIn === false){
            console.log(`Not logged in ${userData.loggedIn}`)
            router.push(ROUTES.LOGIN);
        } 
    },[userData]);

    if (!userData.user){
        return(<>No user</>);
    }else if (userData.user){
        initializeBlockchain();
    }else if (!web3){ //TODO: `|| !selectedAddress)`
        return(<>No web3</>); // Modal qui demande de d'abord se connecter à metamask
    }else if(web3 && userData.user && userAddress) {
        return(<>Hello</>); // page complète en fonction du rôle de l'user
    }
    return(<>None <br/>{userData.user.uid} <br/>{userAddress}</>);
}

export default Dashboard;