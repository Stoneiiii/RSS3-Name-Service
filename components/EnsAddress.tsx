"use client";

import { config } from "@/config";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEnsAddress, useEnsName, useReadContract } from "wagmi";
import resolverInfo from "@/lib/constants/contract/PublicResolver.json";
import registerContractInfo from "@/lib/constants/contract/ETHRegistrarController.json";
import { ethers } from 'ethers';

const EnsAddress = ({ address }: { address: string }) => {
  // check input
  if (!address) return <div title="useEnsAddress">Not Supported</div>;
  //   const address = 'vitalik.eth';
  // const { data, isError, error, isLoading } = useEnsAddress({
  //   config,
  //   name: address,
  //   chainId: 1,
  // });
  // console.log("$$$",address);

  var namehash = require('eth-ens-namehash')
  const node = namehash.hash(address);
  const { data, isFetching: isLoading, isError } = useReadContract({
    abi: resolverInfo.abi,
    address: resolverInfo.address as `0x${string}`,
    functionName: "addr",
    args: [node],
  });
  // console.log("##", data)
  // -- name -- 合约创建者
  // const { data:owner,error} = useReadContract({
  //   abi: registerContractInfo.abi,
  //   address: registerContractInfo.address as `0x${string}`,
  //   functionName: "owner",
  //   args: [],
  // });
  // console.log("owner", owner)

  
  if (isLoading) return <div title="useEnsAddress">Fetching address…</div>;
  if (isError) return <div title="useEnsAddress">Error fetching address</div>;
  if (data) {
    return (
    <div>
      <Link href={`/info?domain=${address}`}>
      Address for {address}:{" "}
      <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono">
        {data as string}
      </span>
      </Link>
    </div>
    );
  }
};

export default EnsAddress;
