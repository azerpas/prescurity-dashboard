import Web3 from 'web3';
import SmartContract from "../../contracts/Prescurity.json";
import { Contract } from 'web3-eth-contract';

export const initWeb3 = async () => new Promise<[Web3, Contract?]>((resolve, reject) => {
    window.addEventListener('load', async () => {
        console.log(`Connecting to web3...`)
        if(window.ethereum){
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.info(`Enabled`)
                try {
                    const web3 = new Web3(window.ethereum);
                    const networkId = await web3.eth.net.getId();
                    const network = SmartContract.networks[networkId];
                    //@ts-ignore
                    const contract = new web3.eth.Contract(SmartContract.abi, network.address);
                    resolve([web3,contract]);
                } catch (error) {
                    
                }
                
            } catch (error) {
                console.error(error);
                reject(error);
            }
        } else{
            resolve([new Web3(Web3.givenProvider || "http://localhost:7545")]);
        }
    });
});

export const getSelectedAddress = (): string => {
    if(window.ethereum.isMetaMask && window.ethereum.selectedAddress){
        return window.ethereum.selectedAddress;
    }else {
        const m = "Canno't get the selected address as user is not using metamask or has not selected an address";
        console.error(m);
        throw new Error(m);
    }
}