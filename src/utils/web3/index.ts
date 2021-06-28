import Web3 from 'web3';

export const initWeb3 = async () => new Promise<Web3>((resolve, reject) => {
    window.addEventListener('load', async () => {
        console.log(`Connecting to web3...`)
        if(window.ethereum){
            resolve(new Web3(window.ethereum));
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.info(`Enabled`)
            } catch (error) {
                console.error(error);
                reject(error);
            }
        } else{
            resolve(new Web3(Web3.givenProvider || "http://localhost:7545"));
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