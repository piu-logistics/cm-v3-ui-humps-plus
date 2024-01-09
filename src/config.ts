import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

export const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK ||
  WalletAdapterNetwork.Devnet) as WalletAdapterNetwork;
// const network = WalletAdapterNetwork.Devnet;
export const rpcHost =
  process.env.NEXT_PUBLIC_RPC_HOST || clusterApiUrl(network);

export const candyMachineId = new PublicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE_ID ||
    "EygLzSdu2SeJ5GCGjgNXHSWkvxJDD95596VMkceGvmTR"
);
export const defaultGuardGroup =
  process.env.NEXT_PUBLIC_DEFAULT_GUARD_GROUP || undefined; // undefined means default

"6je4tx1JjCkDYbvUZrPh72fqkCHzYUSWnfdWTzAgRU8f"
// "3zwFR3spiwbSSMtvVKG2bRT6ttqFoC3MHCafGP8ZrdLz"
// "DAA8yRLu7acVs3kxaTyCjoEjNWGinLaCKVhDY29ASNua"

export const whitelistedWallets = [
//  "53VVFtLzzi3nL2p1QF591PAB8rbcbsirYepwUphtHU9Q",
//  "85gHs1pKkZcNCDEbcfxqhfFNPWCsNFqPTMMbTQARspWy",
//  "FXoth7ba7LALmJGFaidCcMnhsxEagBDBDKCmkpr2QuDr",
//  "232Z5QNvQ4wRyraGWFpC5i3HEbqozEWgBCV95eWASaG1",
//  "D8ivzpXkG66VknRdVjEF1HjqS3T1tzcqraVR6FYaeLsV",
//  "sTAKERL4U8fbn2nUte6rPVdcrz2z3fEh1adQEDrGULr",
];


export const collectionImageURL =
  process.env.NEXT_PUBLIC_COLLECTION_IMAGE_URL || "https://alkebulanmeta.app/wp-content/uploads/2024/01/The-Humps-Collection-Base-of-Collection-Image.MASTER-2.gif";

export const collectionTitle =
  process.env.NEXT_PUBLIC_COLLECTION_TITLE || "The #1 Humps Collection";

export const collectionDescription =
  process.env.NEXT_PUBLIC_COLLECTION_DESCRIPTION || "In the ancient flow of Alkebulan Network-State, where vast metaverse zones stretched beneath endless cosmic orders, there lived a Bactrian camel named Bactra. Bactra was no ordinary camel; he bore two mighty humps upon his back, a symbol of his great energy reserves, firmness and symmetry. Bactra roamed the vastness as the herd leader, with metaphysical guidance from a wise Humpkeeper. As a seasoned collector of AlkebulanMeta Bactrian Camels, the Humpkeeper knew the true origin story of how the Bactrians arrived in the metaverse. As he gathered his collection the One would reason with the head Camels like Bactra, these special sci-future creatures knew the deepest secrets of the cosmos, and they would channel their gems of insight… from time to time.  If you are a Humpkeeper check the traits of your collection carefully, special trait combinations bring great powers to their keepers many times during every lunar cycle. Stay in touch with the AlkebulanMeta Discord Outpost, news often passes through there; https://alkebulanmeta.app/discord";

export const tokenType =
  process.env.NEXT_PUBLIC_TOKEN_TYPE || "Humps";

export const websiteURL =
  process.env.NEXT_PUBLIC_WEBSITE_URL || "https://alkebulanmeta.app/the-humps";

export const websiteURL2 =
  process.env.NEXT_PUBLIC_WEBSITE_URL2 || "#";

export const twitterURL =
  process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/astehmari";

export const discordURL =
  process.env.NEXT_PUBLIC_DISCORD_URL || "https://alkebulanmeta.app/discord";
