import resolverInfo from "@/lib/constants/contract/PublicResolver.json";
import { Card, Profile, RecordItem, Typography } from "@ensdomains/thorin";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { useReadContract } from "wagmi";
import Image from 'next/image';
import rss3icon from "../assets/rss3.png";
import { SocialText } from "./SocialText";

export const useNameDetails = ({ domainString }: { domainString: string }) => {
  // get address
  var namehash = require("eth-ens-namehash");
  const node = namehash.hash(domainString);
  const {
    data: address,
    isFetching: isAddrLoading,
    isError: isAddrError,
  } = useReadContract({
    abi: resolverInfo.abi,
    address: resolverInfo.address as `0x${string}`,
    functionName: "addr",
    args: [node],
  });

  // get name
  const {
    data: name,
    isFetching: isNameLoading,
    isError: isNameError,
  } = useReadContract({
    abi: resolverInfo.abi,
    address: resolverInfo.address as `0x${string}`,
    functionName: "name",
    args: [node],
  });

  // get expire data
  const sha3 = require("web3-utils").sha3;
  let domain = sha3(domainString.split('.')[0]);
  const {
    data: expiryData,
    isFetching: isExpireLoading,
    isError: isExpireError,
  } = useReadContract({
    abi: [
      {
        constant: true,
        inputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "nameExpires",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    address: "0x988ab09Ce850336153f12F9F71107a5270991971",
    functionName: "nameExpires",
    args: [domain],
  });
  const expiryDataStr = new Date(Number(expiryData) * 1000).toLocaleString();

  const isLoading = isAddrLoading || isNameLoading || isExpireLoading;
  return {
    address: address as string,
    name: name as string,
    expiryDataStr: expiryDataStr as string,
    isLoading,
  };
};

const shortAddress = (address: string) => {
    if (!!!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const UserProfile = ({ domainString }: { domainString: string }) => {
  // query name detail
  const nameDetails = useNameDetails({ domainString });
  const { address, name, expiryDataStr, isLoading } = nameDetails;

  //   const rss3Icon = require('@/assets/rss3.png').default;

  const shortAddrStr = shortAddress(address);
  return (
    <>
      <Card>
        <Profile address={address}/>
        <Typography fontVariant="extraLarge">{domainString}</Typography>
        <Typography fontVariant="small" style={{color: "gray"}}>{name} </Typography>
      </Card>
      <Card className="my-3">
        <SocialText domainString={domainString}/>   
        <Typography fontVariant="large" style={{color: "gray"}}>Address:</Typography>
        <div>
          {isLoading ? (
            "Loading..."
          ) : (
            <RecordItem
              icon={
                <Image
            src={rss3icon}
            alt="icon"
            width={20}
            height={20}
          />
              }
              inline
              value={address}
            >
              {shortAddrStr}
            </RecordItem>
          )}
        </div>
        <Typography fontVariant="large" style={{color: "gray"}}>Ownership:</Typography>
        <RecordItem keyLabel="expiry" size="large" inline value={expiryDataStr}>
          {expiryDataStr}
        </RecordItem>
      </Card>
    </>
  );
};
