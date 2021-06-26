import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../context/user";
import * as ROUTES from '../constants/routes';
import { initWeb3 } from "../utils/web3";
import { useState } from "react";
import Web3 from "web3";

const Dashboard = () => {
    const userData = useContext(UserContext);
    const router = useRouter();
    const [web3, setWeb3] = useState<undefined|Web3>();

    const initializeBlockchain = async () => {
        setWeb3(await initWeb3());
    }

    if(!userData.loggedIn){
        router.push(ROUTES.LOGIN);
    }else if (!userData.user){
        return(<></>);
    }else if (userData.user){
        initializeBlockchain();
    }else if (!web3){ //TODO: `|| !selectedAddress)`
        return(<></>); // Modal qui demande de d'abord se connecter à metamask
    }else if(web3 && userData.user) {
        return(<></>); // page complète en fonction du rôle de l'user
    }
}

export default Dashboard;