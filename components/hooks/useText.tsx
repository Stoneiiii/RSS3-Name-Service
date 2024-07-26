import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import resolverInfo from "@/lib/constants/contract/PublicResolver.json";

const useEnsText = (node: string, key: string) => {
  const { data, isError } = useReadContract({
    abi: resolverInfo.abi,
    address: resolverInfo.address as `0x${string}`,
    functionName: "text",
    args: [node, key],
  });
  
  return { data, isError };
};

export default useEnsText;
