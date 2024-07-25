"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEnsAddress, useEnsName, useReadContract } from "wagmi";
import resolverInfo from "@/lib/constants/contract/PublicResolver.json";
import registerContractInfo from "@/lib/constants/contract/ETHRegistrarController.json";
import { ethers } from 'ethers';
import { Profile } from "@ensdomains/thorin";


const shortAddress = (address: string) => {
  if (!!!address) return "";
return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const EnsAddress = ({ address }: { address: string }) => {
  // check input
  if (!address) return <div title="useEnsAddress">Not Supported</div>;

  var namehash = require('eth-ens-namehash')
  const node = namehash.hash(address);
  const { data, isFetching: isLoading, isError } = useReadContract({
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
      <Link href={`/info?domain=${address}`}>
      {/* {address}:{" "} */}
      {/* <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono">
        {shortData as string}
      </span> */}
      <Profile style={{background: 'transparent'}} address={data as string} ensName={address}/>
      </Link>
    </div>
    );
  }
};

export default EnsAddress;
