import { POLYGON } from "./chains";

const CONTRACTS = {
  [POLYGON]: {
    // polygon
    RisingsTicket: "0xF136083F4139c27a2ab15311BAdbA902301b342c",  // fixed
    RisingsTicketRouter: "0xFaCB109F1111a62849c3704FcC8b2953D11679c5",  // fixed
    StakingRisings: "0xE248feCe4EFc91ac9D6d7E9e16ec1CE7D5d382AD",  // fixed
    RaffleRisings: "0xf3d5fd2fB3D317C550d434B2A4081e347A86aD2F",  // fixed
  },
};

export function getContract(chainId: number, name: string): string {
  if (!CONTRACTS[chainId]) {
    throw new Error(`Unknown chainId ${chainId}`);
  }

  if (!CONTRACTS[chainId][name]) {
    throw new Error(`Unknown contract "${name}" for chainId ${chainId}`);
  }

  return CONTRACTS[chainId][name];
}