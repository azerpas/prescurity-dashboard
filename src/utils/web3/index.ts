import Web3 from 'web3';

export const initWeb3 = async () => new Promise<Web3>((resolve, reject) => {
    window.addEventListener('load', async () => {
        console.log(`Connecting to web3...`)
        if(window.ethereum){
            resolve(new Web3(window.ethereum));
            try {
                await window.ethereum.enable();
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