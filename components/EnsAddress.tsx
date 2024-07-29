"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useAccount, useEnsAddress, useEnsName, useReadContract } from "wagmi";
import resolverInfo from "@/lib/constants/contract/PublicResolver.json";
import registerContractInfo from "@/lib/constants/contract/ETHRegistrarController.json";
import { ethers } from "ethers";
import { Profile } from "@ensdomains/thorin";

const shortAddress = (address: string) => {
  if (!!!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface EnsAddressProps {
  address: string;
  isOwner: string;
  setIsOwner: React.Dispatch<React.SetStateAction<string>>;
}

const EnsAddress: React.FC<EnsAddressProps> = ({
  address,
  isOwner,
  setIsOwner,
}) => {
  const { address: myAddr } = useAccount();

  // check input
  if (!address) return <div title="useEnsAddress">Not Supported</div>;
  console.log("&&&&&", address);
  var namehash = require("eth-ens-namehash");
  const node = namehash.hash(address);
  const {
    data,
    isFetching: isLoading,
    isError,
  } = useReadContract({
    abi: resolverInfo.abi,
    address: resolverInfo.address as `0x${string}`,
    functionName: "addr",
    args: [node],
  });

  const shortData = shortAddress(data as string);
  // console.log("##", data)
  // -- name -- 合约创建者
  // const { data:owner,error} = useReadContract({
  //   abi: registerContractInfo.abi,
  //   address: registerContractInfo.address as `0x${string}`,
  //   functionName: "owner",
  //   args: [],
  // });
  // console.log("owner", owner)

  if (isLoading) return <div title="useEnsAddress"></div>;
  if (isError) return <div title="useEnsAddress">Error fetching address</div>;
  if (data) {
    return (
      <div>
        {data == myAddr ? (
          <>
            {setIsOwner(data as string)}
            <Link href={`/setting?address=${isOwner}&domain=${address}`}>
              <Profile
                style={{ background: "transparent" }}
                address={data as string}
                ensName={address}
              />
            </Link>
          </>
        ) : (
          <>
            <Link href={`/info?domain=${address}`}>
              <Profile
                style={{ background: "transparent" }}
                address={data as string}
                ensName={address}
              />
            </Link>
          </>
        )}
      </div>
    );
  }
};

export default EnsAddress;
