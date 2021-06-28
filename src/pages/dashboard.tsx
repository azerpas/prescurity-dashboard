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
    const [smartContract, setContract] = useState<undefined|any>();
    const [userAddress, setUserAddress] = useState<undefined|string>(); // TODO: to set inside the UserContext directly
    const [userType, setUserType] = useState<undefined|string>(); // TODO: to set inside the UserContext directly

    const initializeBlockchain = async () => { // TODO: import from another file
        const [web, contract] = await initWeb3();
        setWeb3(web);
        setContract(contract);
        const selected = await getSelectedAddress();
        setUserAddress(selected);
    }

    const getUserType = async () => {
        const type = await smartContract.methods.getUserType().call({from: userAddress});
        console.log(`type of user: ${type}`);
        setUserType(type);
    }

    useEffect(() => {
        if(smartContract){
            console.log(`Getting user type`);
            getUserType();
        }
    },[smartContract]);

    useEffect(() => {
        if(userData.loggedIn === false){
            router.push(ROUTES.LOGIN);
        } 
    },[userData]);

    // Les ifs sont organisés dans cet ordre précis pour être "rendus" en cascade
    if (!userData.user){
        return(<>No user</>);
    }else if(web3 && userData.user && userAddress) {
        return(<>Hello</>); // page complète en fonction du rôle de l'user
    }else if (userData.user){
        initializeBlockchain();
        return(<>None <br/>UID: {userData.user.uid}</>);
    }else if (!web3){ //TODO: `|| !selectedAddress)`
        return(<>No web3</>); // Modal qui demande de d'abord se connecter à metamask
    }
}

export default Dashboard;