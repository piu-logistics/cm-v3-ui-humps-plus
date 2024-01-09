import {
  Metaplex,
  PublicKey,
  toBigNumber,
  keypairIdentity,
  sol,
  toDateTime,
  getMerkleRoot,
  token,
  CandyGuardsSettings,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { writeFileSync } from "fs";

(async function () {
  const cache = require("./cache.json");
  // if (cache.program)
  //   return console.log("Program already found in your cache, exiting...");

  const allowList = require("./allowlist.json");
  const demoNftCollection = new PublicKey(
    "EygLzSdu2SeJ5GCGjgNXHSWkvxJDD95596VMkceGvmTR"
  );
  const demoTokenMint = new PublicKey(
    "CxxzqycCdVBcn1H2RBgQUcmb1g1QHdYnC3eKgieDN8wg"
  );
  const demoDestination = new PublicKey(
    "EcnBNipTwDBQAfmTBeajRctZZgFn4L8cz5RWEvJ1RVxb"
  );

  const key = Keypair.fromSecretKey(Uint8Array.from(require("./key.json")));
  const { number, creators, ...config } = require("./config.json");

  const metaplex = Metaplex.make(new Connection(clusterApiUrl("mainnet"))).use(
    keypairIdentity(key)
  );
  config.creators = creators.forEach((c) => {
    c.address = new PublicKey(c.address);
  });
  const collectionMint = cache.program?.collectionMint
    ? new PublicKey(cache.program?.collectionMint)
    : (
        await metaplex.nfts().create({
          name: "The #1 Humps Collection",
          uri: "https://nftstorage.link/ipfs/bafybeiar2h4lmc3qgqq7mozrvrstednfxaemgbkanuimvtuihoiqj7edxm/collection.json",
          creators: config.creators,
          sellerFeeBasisPoints: 360,
          isCollection: true,
          updateAuthority: key,
        })
      ).nft.address;
  const createOrUpdateCandyMachine = async (
    config: CandyGuardsSettings & any,
    {
      candyMachine,
      candyGuard,
    }: { candyMachine?: string; candyGuard?: string } = {}
  ): Promise<{ candyMachine: PublicKey; candyGuard?: PublicKey }> => {
    if (candyMachine) {
      // await metaplex.candyMachines().update({
      //   candyMachine: new PublicKey(candyMachine),
      //   ...config,
      // });
      if (candyGuard) {
        await metaplex.candyMachines().updateCandyGuard({
          candyGuard: new PublicKey(candyGuard),
          ...config,
        });
      }
      return {
        candyMachine: new PublicKey(candyMachine),
        candyGuard: candyGuard && new PublicKey(candyGuard),
      };
    } else {
      return metaplex
        .candyMachines()
        .create(config)
        .then(({ candyMachine }) => ({
          candyMachine: candyMachine.address,
          candyGuard: candyMachine.candyGuard?.address,
        }));
    }
  };
  // Create the Candy Machine.
  const { candyMachine, candyGuard } = await createOrUpdateCandyMachine(
    {
      ...config,
      itemsAvailable: toBigNumber(number),
      collection: {
        address: collectionMint,
        updateAuthority: key,
      },
      guards: {
        botTax: {
          lamports: sol(0.01),
          lastInstruction: true,
        },
        startDate: {
          date: toDateTime("2024-01-08 20:00:00 +0000"),
        },
        endTime: {
          date: toDateTime("2024-02-01 00:00:00 +0000"),
        },
      },
      groups: [
        {
          label: "public", // Public (Mint Limit[1], Redeemed Amount[50])
          guards: {
            mintLimit: {
              id: 1,
              limit: 9,
            },
            redeemedAmount: {
              maximum: toBigNumber(50),
            },
          },
        },
        {
          label: "owner", // Owner (Address Gate)
          guards: {
            addressGate: {
              address: demoDestination,
            },
          },
        },
        {
          label: "onlist", // Whitelist (Allowlist)
          guards: {
            allowList: {
              merkleRoot: getMerkleRoot(allowList),
            },
          },
        },
        {
          label: "_x", // Breading NFT (NFT Burn)
          guards: {
            nftBurn: {
              requiredCollection: demoNftCollection,
            },
          },
        },
        {
          label: "_|", // OGs Mint (NFT Gate)
          guards: {
            nftGate: {
              requiredCollection: demoNftCollection,
            },
          },
        },
        {
          label: "_>", // Swap NFT (NFT Payment)
          guards: {
            nftPayment: {
              requiredCollection: demoNftCollection,
              destination: demoDestination,
            },
          },
        },
        {
          label: "Humper", // Premium (Sol Payment)
          guards: {
            solPayment: {
              amount: sol(1.08),
              destination: demoDestination,
            },
          },
        },
        {
          label: "tknBrn", // Token Burn
          guards: {
            tokenBurn: {
              amount: token(1, 9),
              mint: demoTokenMint,
            },
          },
        },
        {
          label: "tknGte", // Token Gate
          guards: {
            tokenGate: {
              amount: token(1, 9),
              mint: demoTokenMint,
            },
          },
        },
        {
          label: "tknPmt", // Token Payment
          guards: {
            tokenPayment: {
              amount: token(1, 9),
              mint: demoTokenMint,
              destinationAta: metaplex.tokens().pdas().associatedTokenAccount({
                mint: demoTokenMint,
                owner: demoDestination,
              }),
            },
          },
        },
      ],
    },
    cache.program || {}
  );
  cache.program = {
    candyMachine: candyMachine.toString(),
    candyGuard: candyGuard.toString(),
    candyMachineCreator: key.publicKey.toString(),
    collectionMint: collectionMint.toString(),
  };
  writeFileSync("./cache.json", JSON.stringify(cache, null, 2));
})();
