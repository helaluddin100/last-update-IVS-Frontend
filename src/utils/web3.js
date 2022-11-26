import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "CryptoOtters", // Required
      // @NOTICE: Change for the url rpc of the network you need
      chainId: 1,
      infuraId: "2225bfe53cbd465798919bf723e45e5d", // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      chainId: 1,
      infuraId: "2225bfe53cbd465798919bf723e45e5d", // required
    },
  },
};
