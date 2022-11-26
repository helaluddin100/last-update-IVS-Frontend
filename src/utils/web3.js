import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "CryptoOtters", // Required
      // @NOTICE: Change for the url rpc of the network you need
      infuraId: "ebef78fe0edc4e038a616a255db84178", // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "ebef78fe0edc4e038a616a255db84178", // required
    },
  },
};
