// NextJS React
import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from "react";

// Web3
import Web3 from "web3";
import {Contract} from "web3-eth-contract";
import {initWeb3} from "../utils/web3";

// Misc
import {UserContext} from "../context/user";
import * as ROUTES from '../constants/routes';
import {UserType} from "../types/user";

// Components
import Owner from "../components/owner";
import Pharmacist from "../components/pharmacist";
import Patient from "../components/patient";
import Doctor from "../components/doctor";


import {InitBlockchainLoading, UserLoading} from "../components/loading";

const Dashboard = () => {
    const userData = useContext(UserContext);
    const router = useRouter();
    const [web3, setWeb3] = useState<undefined|Web3>();
    const [smartContract, setContract] = useState<undefined|Contract>();
    const [userType, setUserType] = useState<undefined|UserType>();

    const initializeBlockchain = async () => {
        const [web, contract] = await initWeb3();
        setWeb3(web);
        setContract(contract);
    }

    const getUserType = async () => {
        console.log(`Getting user type of: ${userData.selectedAddress}`);
        const type = await smartContract.methods.getUserType().call({from: userData.selectedAddress});
        console.log(`${userData.selectedAddress} type of user: ${type}`);
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
    }else if(web3 && userData.user && userData.selectedAddress && userType) {
        // Doctor @hugo
        if(userType === UserType.doctor){
            return(
                <Doctor web={web3} contrat={smartContract}/>

            );
        // Patient @amel
        }else if(userType === UserType.patient){
            return(
                <Patient web={web3} contrat={smartContract}/>
            );
        // Pharmacy @yann
        }else if(userType === UserType.pharmacy){
            return(
                <Pharmacist web={web3} contrat={smartContract}/>
            );
        // Owner @mael
        }else if(userType === UserType.owner){
            return(
                <Owner web={web3} contrat={smartContract}/>
            );
        }else{
            return(<>Hello {userType === UserType.none ? "no type" : userType}</>); // page complète en fonction du rôle de l'user
        }
    }else if (userData.user && (!web3 || !smartContract || !userData.selectedAddress)){
        initializeBlockchain();
        return(<><InitBlockchainLoading step={web3 ? 1 : (smartContract ? 2 : (userData.selectedAddress ? 3 : (userType ? 4 : 0)))}/></>);
    }else{
        return(<>Nothing to show rn</>)
    }
}

export default Dashboard;