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
import { useEffect, useMemo, useState } from "react";
import registerContractInfo from "@/lib/constants/contract/ETHRegistrarController.json";
import resolverContractInfo from "@/lib/constants/contract/PublicResolver.json";
import crypto from "crypto";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  CountdownCircle,
  Slider,
  Spinner,
  Typography,
} from "@ensdomains/thorin";
import DurationPicker from "@/components/DurationPicker";
import { MyHearder } from "@/components/MyHeader";

const DAYS = 24 * 60 * 60;

const Home: NextPage = () => {
  const { address } = useAccount();
  const { query } = useRouter();
  const { name } = query;
  const { writeContract: writeCommitContract, status: commitStatus } =
    useWriteContract();
  const {
    writeContract: writeRegisterContract,
    error,
    status: regStatus,
  } = useWriteContract();
  const [duration, setDuration] = useState(365);
  const [wait70s, setwait70s] = useState(false);
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

  useEffect(() => {
    if (commitStatus === "success" && regStatus === "idle") setwait70s(true);
    else setwait70s(false);
  });

  console.log("console error", error);
  console.log("commitStatus", commitStatus, "regStatus", regStatus);
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
    <div>
      <header className="bg-gray-50">
        <MyHearder />
      </header>
      <div className="flex-col items-center justify-center w-full h-screen pt-3 bg-gray-50">
        <Typography
          className="w-2/3 mx-auto pl-3"
          fontVariant="extraLargeBold"
          style={{
            fontSize: "32px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          {name}.rss3
        </Typography>
        <div className="flex items-center justify-center w-full pt-4">
          <Card className="w-2/3 px-8">
            <CardHeader>
              <CardTitle className="text-4xl">Register {name}.rss3</CardTitle>
              <CardDescription>Get your ID in one-click.</CardDescription>
            </CardHeader>

            <CardContent>
              <DurationPicker days={duration} setDays={setDuration} />
            </CardContent>
            <CardFooter className="flex items-center justify-center">
              <div></div>
              {!address ? (
                <ConnectButton />
              ) : wait70s ? (
                <CountdownCircle
                  countdownSeconds={75}
                  callback={() => {
                    setwait70s(false);
                  }}
                />
              ) : regStatus === "success" ? (
                <Typography
                  fontVariant="large"
                  style={{ color: "rgb(59, 130, 246)" }}
                >
                  Success!
                </Typography>
              ) : regStatus === "error" ? (
                <Typography fontVariant="large" style={{ color: "red" }}>
                  Fail! Please refresh and try again.
                </Typography>
              ) : !isFetchingHash ? (
                <Button
                  onClick={() => {
                    register();
                  }}
                  disabled={commitStatus==="pending"}
                >
                  Confirm
                </Button>
              ) : null}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
