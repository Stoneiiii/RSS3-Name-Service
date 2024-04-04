import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { NextPage } from "next";
import { useReadContract } from "wagmi";
import registerContractInfo from "@/lib/constants/contract/ETHRegistrarController.json";
import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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
                : available
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
          <>
            {available && (
              <Link href={`/register?name=${name}`}>
                <CheckIcon className="w-6 h-6 text-green-500" />
              </Link>
            )}
          </>
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default Home;
