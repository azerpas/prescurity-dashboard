import Web3 from 'web3';
import SmartContract from "../../contracts/Prescurity.json";
import {Contract} from 'web3-eth-contract';

export const initWeb3 = async () => new Promise<[Web3, Contract?]>(async (resolve, reject) => {
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

export class ConnectError extends Error {
    constructor(m: string) {
        super(m);
        Object.setPrototypeOf(this, ConnectError.prototype);
    }
}

export const getSelectedAddress = (): string => {
    if(window.ethereum.isMetaMask && window.ethereum.selectedAddress){
        console.log("%c GET_SELECTED_ADDRESS : "  , 'background: #222; color: #bada55' ,window.ethereum.selectedAddress);
        return window.ethereum.selectedAddress;
    }else {
        if(window.ethereum.isMetaMask && !window.ethereum.selectedAddress){
            if(!window.ethereum.isConnected()){
                const m = "Please connect to MetaMask";
                console.error(m);
                throw new ConnectError(m);
            }else{
                const m = "Please select an address in MetaMask";
                console.error(m);
                throw new Error(m);
            }
        }
        if(!window.ethereum.isMetaMask){
            const m = "Please install MetaMask to use Prescurity.";
            console.error(m);
            throw new Error(m);
        }
        const m = "Canno't get the selected address, unknown error";
        console.error(m);
        throw new Error(m);
    }
}