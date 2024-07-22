"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { NextPage } from "next";
import { useReadContract } from "wagmi";
import registerContractInfo from "@/lib/constants/contract/ETHRegistrarController.json";
import resolverInfo from "@/lib/constants/contract/PublicResolver.json";
import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import EnsAddress from "@/components/EnsAddress";
import { Button } from "@/components/ui/button";
// import namehash from 'eth-ens-namehash';

const isETHaddress = ({ name }: { name: string }) => {
  if (!name) return ''
  if (name.includes('.')) {
    let parts = name.split('.');
    let suffix = parts[parts.length-1];
    if (suffix === 'rss3') return name
    return ''
  }
  if(name.includes('\'')) return ''
  return `${name}.rss3`
}

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const { data: available, isFetching: isFetchingAvailable } = useReadContract({
    abi: registerContractInfo.abi,
    address: registerContractInfo.address as `0x${string}`,
    functionName: "available",
    args: [name],
    query: {
      enabled: !!name && name.length > 2,
      staleTime: 1000,
    },
  });

  const address = isETHaddress({name});
 
  // var namehash = require("eth-ens-namehash");
  // const node = namehash.hash(name);

  // console.log("resolverAddress", resolverAddress)
  // console.log("error", error)

  // const { data, isFetching: isFetching } = useReadContract({
  //   abi: resolverInfo.abi,
  //   address: resolverInfo.address as `0x${string}`,
  //   functionName: "addr",
  //   args: [node],
  // });
  // console.log("##", data);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col w-full gap-4 px-4 max-w-80">
        <div className="flex items-center justify-center h-6">
          {!!name && name.length > 2 && (
            <Badge
              variant={
                isFetchingAvailable
                  ? "outline"
                  : available
                  ? "default"
                  : "destructive"
              }
            >
              {isFetchingAvailable
                ? "Loading..."
                : available && !!address
                ? "Available"
                : "Not Supported"}
            </Badge>
          )}
        </div>
        <div className="flex flex-row items-center justify-between w-full gap-4">
          <Input
            className="w-full"
            placeholder="Search for a name..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <>
          {available && address &&(
            <Link href={`/register?name=${name}`} className="flex items-center">
              {address} is available to register
              <CheckIcon className="w-6 h-6 text-green-500" />
            </Link>
          )}
          {!available &&
            available != undefined &&
            !!name &&
            name.length > 2 && <EnsAddress address={address} />}
        </>
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default Home;
