import { ethers } from "ethers";
import { sample } from "lodash";

const { parseEther } = ethers.utils;

export const POLYGON = 80001;   // todo: fix to main net

// TODO take it from web3
export const DEFAULT_CHAIN_ID = POLYGON;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

export const SUPPORTED_CHAIN_IDS = [POLYGON];

export const IS_NETWORK_DISABLED = {
  [POLYGON]: false
};

export const CHAIN_NAMES_MAP = {
  [POLYGON]: "Polygon"
};

export const GAS_PRICE_ADJUSTMENT_MAP = {
  [POLYGON]: "1000000000000", // 1000 gwei
};

export const MAX_GAS_PRICE_MAP = {
  [POLYGON]: "10000000000000", // 10000 gwei
};

export const HIGH_EXECUTION_FEES_MAP = {
  [POLYGON]: 3, // 3 USD
};

export const POLYGON_RPC_PROVIDERS = ["https://rpc-mumbai.maticvigil.com"]; //Polygon MAINNET

export const RPC_PROVIDERS = {
  [POLYGON]: POLYGON_RPC_PROVIDERS,
};

export const FALLBACK_PROVIDERS = {
  [POLYGON]: ["https://polygon-bor.publicnode.com"],
};

export const NETWORK_METADATA = {
  [POLYGON]: {
    chainId: "0x" + POLYGON.toString(16),
    chainName: "Polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: POLYGON_RPC_PROVIDERS,
    blockExplorerUrls: [getExplorerUrl(POLYGON)],
  },
};


export function getChainName(chainId: number) {
  return CHAIN_NAMES_MAP[chainId];
}

export function getRpcUrl(chainId: number): string | undefined {
  return sample(RPC_PROVIDERS[chainId]);
}

export function getExplorerUrl(chainId) {
  if (chainId === POLYGON) {
    return "https://mumbai.polygonscan.com/";
  }
  return "https://mumbai.polygonscan.com/";
}

export function getHighExecutionFee(chainId) {
  return HIGH_EXECUTION_FEES_MAP[chainId] || 3;
}

export function isSupportedChain(chainId) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}
