// NextJS React
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";

// Web3
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import { getSelectedAddress, initWeb3 } from "../utils/web3";

// Misc
import { UserContext } from "../context/user";
import * as ROUTES from '../constants/routes';
import { UserType } from "../types/user";

// Components
import Pharmacist from "../components/pharmacist";
import Doctor from "../components/doctor/index"
import { InitBlockchainLoading, UserLoading } from "../components/loading";

const Dashboard = () => {
    const userData = useContext(UserContext);
    const router = useRouter();
    const [web3, setWeb3] = useState<undefined|Web3>();
    const [smartContract, setContract] = useState<undefined|Contract>();
    const [userAddress, setUserAddress] = useState<undefined|string>(); // TODO: to set inside the UserContext directly
    const [userType, setUserType] = useState<undefined|UserType>(); // TODO: to set inside the UserContext directly

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
        return(<UserLoading/>);
    }else if(web3 && userData.user && userAddress && userType) {
        // Doctor
        if(userType === UserType.doctor){
            return(
                <Doctor/>
            );
        // Patient
        }else if(userType === UserType.patient){
            return(
                <>
                    a{/* Patient component */}
                </>
            );
        // Pharmacy
        }else if(userType === UserType.pharmacy){
            return(
                <Pharmacist/>
            );
        // Owner
        }else if(userType === UserType.owner){
            return(
                <>
                    a{/* Owner component */}
                </>
            );
        }else{
            return(<>Hello {userType === UserType.none ? "no type" : userType}</>); // page complète en fonction du rôle de l'user
        }
    }else if (userData.user && (!web3 || !smartContract || !userAddress)){
        initializeBlockchain();
        return(<><InitBlockchainLoading step={web3 ? 1 : (smartContract ? 2 : (userAddress ? 3 : (userType ? 4 : 0)))}/></>);
    }else{
        return(<>Nothing to show rn</>)
    }
}

export default Dashboard;