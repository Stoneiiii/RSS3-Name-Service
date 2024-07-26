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
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MyHearder } from "@/components/MyHeader";
import Head from "next/head";
import { Profile, Typography } from "@ensdomains/thorin";
import styled from "styled-components";
import { useAccount } from "wagmi";

const isETHaddress = ({ name }: { name: string }) => {
  if (!name) return "";
  if (!/^[a-zA-Z0-9.]+$/.test(name)) return "";
  if (name.includes(".")) {
    let parts = name.split(".");
    if (parts.length > 2) return "";
    let suffix = parts[parts.length - 1];
    let base = parts[0];
    if (suffix === "rss3") return base;
    return "";
  }
  return name;
};

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [isOwner, setIsOwner] = useState("");

  const baseAddr = isETHaddress({ name });
  const address = baseAddr + ".rss3";

  const { data: available, isFetching: isFetchingAvailable } = useReadContract({
    abi: registerContractInfo.abi,
    address: registerContractInfo.address as `0x${string}`,
    functionName: "available",
    args: [baseAddr],
    query: {
      enabled: !!baseAddr && baseAddr.length > 2,
      staleTime: 1000,
    },
  });


  // get primary name
  const { address:myAddr } = useAccount();
  

  // var namehash = require("eth-ens-namehash");
  // const node = namehash.hash("582FA1C74d3C071d10E4e83F1397124DE3B2a5fe");
  // console.log("namehash",myAddr)
  // const { data, isError } = useReadContract({
  //   abi: resolverInfo.abi,
  //   address: resolverInfo.address as `0x${string}`,
  //   functionName: "name",
  //   args: [node],
  // });

  // console.log("domain",data,isError)

  return (
    <>
      <Head>
        <title>RSS3 Name Service</title>
      </Head>
      <div className="bg-gray-50">
        <MyHearder />
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col w-full gap-4 px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Your web3 username
              </h1>
              <p className="mt-4 text-lg text-gray-400">
                Your identity across web3, one name for all your crypto
                addresses,
                <br />
                and your decentralised website.
              </p>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-4 pt-0">
              <Input
                className="w-1/2 h-20 py-2 text-4xl placeholder-opacity-65 text-black bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search for a name..."
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-center space-x-10">
              <div>
                {!available && baseAddr.length > 2 ? (
                  <EnsAddress address={address} isOwner={isOwner} setIsOwner={setIsOwner}/>
                ) : baseAddr.length > 2 ? (
                  <Profile style={{background: 'transparent'}} address="" ensName={address}/>
                ) : name.length>2 ?(
                  <Profile style={{background: 'transparent'}} address="" ensName={name}/>
                ): ""}
              </div>
              <div className="flex-row my-2">
                <>
                  {baseAddr.length > 2 ? (
                    <Typography fontVariant="extraLarge" className="pt-0.5">
                             {isFetchingAvailable ? (
                        ""
                      ) : available && !!baseAddr ? (
                        <Link
                          href={`/register?name=${baseAddr}`}
                          className="flex items-center text-green-500 px-3 bg-green-50 rounded-2xl"
                        >
                          Available
                        </Link>
                      ) : isOwner!=myAddr ? 
                      (<Link href={`/info?domain=${address}`} className="text-blue-400 px-3 bg-blue-50 rounded-2xl">Registered</Link>
                      ) :
                      (<><Link href={`/setting?address=${isOwner}&domain=${address}`} className="text-blue-400 px-3 bg-blue-50 rounded-2xl mr-3">Manage</Link>
                      <Link href={`/info?domain=${address}`} className="text-blue-400 px-3 bg-blue-50 rounded-2xl">Registered</Link></>
                      )
                    }
                    </Typography>
                  ): !!name? (
                  <Typography fontVariant="extraLarge" className="pb-0.5 text-xl bg-red-50 px-3 rounded-2xl" style={{color: "#ff0000cf"}}>
                    {name.length<=2 ? "Too Short":"Not Supported"}
                  </Typography>
                  ):null}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
