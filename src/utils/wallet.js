import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider";
import {ThreeIdConnect, EthereumAuthProvider} from '3id-connect'
import {DID} from "dids";

const URL = "https://3idconnect.org/index.html";

export const threeIdConnect = new ThreeIdConnect();

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "0xf3495f99981d8c84cfb14f359bcaa560b9791e909c2903cd9e7b5b2767c31949"
    }
  },
};

export const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions
  });
  

  export async function getAuthProvider() {
    const walletProvider = await web3Modal.connect();
    const addresses = await walletProvider.enable();
    const authProvider = new EthereumAuthProvider(walletProvider, addresses[0]);
    await threeIdConnect.connect(authProvider);
    const didProvider = await threeIdConnect.getDidProvider();
    // console.log("didProvider accessed");
    // const did = new DID({provider: didProvider});
    // await did.authenticate();
    // console.log("This is the did " + did.id);
    return { didProvider, authProvider }

  }