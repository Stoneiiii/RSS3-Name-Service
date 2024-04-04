import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { useMemo, useState } from "react";
import registerContractInfo from "@/lib/constants/contract/ETHRegistrarController.json";
import resolverContractInfo from "@/lib/constants/contract/PublicResolver.json";
import crypto from "crypto";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const DAYS = 24 * 60 * 60;

const Home: NextPage = () => {
  const { address } = useAccount();
  const { query } = useRouter();
  const { name } = query;
  const { writeContract: writeCommitContract } = useWriteContract();
  const { writeContract: writeRegisterContract, error } = useWriteContract();
  const [duration, setDuration] = useState(365);
  const salt = useMemo(() => "0x" + crypto.randomBytes(32).toString("hex"), []);

  const { data: hash, isFetching: isFetchingHash } = useReadContract({
    address: registerContractInfo.address as `0x${string}`,
    abi: registerContractInfo.abi,
    functionName: "makeCommitment",
    args: [name, address, salt, resolverContractInfo.address],
  });

  const { data: price } = useReadContract({
    address: registerContractInfo.address as `0x${string}`,
    abi: registerContractInfo.abi,
    functionName: "rentPrice",
    args: [name, duration * DAYS],
  });

  console.log("console error", error);

  const register = () => {
    writeCommitContract(
      {
        address: registerContractInfo.address as `0x${string}`,
        abi: registerContractInfo.abi,
        functionName: "commit",
        args: [hash],
      },
      {
        onSuccess: async () => {
          await new Promise((res) => setTimeout(res, 1000 * 70));
          writeRegisterContract({
            address: registerContractInfo.address as `0x${string}`,
            abi: registerContractInfo.abi,
            functionName: "register",
            args: [
              name,
              address,
              duration * DAYS,
              salt,
              resolverContractInfo.address,
            ],
            value: price as any,
          });
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register your RSS3 ID</CardTitle>
          <CardDescription>Get your ID in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid items-center w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  placeholder="Name of your project"
                  disabled
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="Set the duration"
                  type="number"
                  value={duration}
                  min={365}
                  onChange={(e) => {
                    setDuration(parseInt(e.target.value));
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div></div>
          {!address ? (
            <ConnectButton />
          ) : !isFetchingHash ? (
            <Button
              onClick={() => {
                register();
              }}
            >
              Confirm
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
