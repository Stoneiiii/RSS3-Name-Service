import { ConnectButton } from "@rainbow-me/rainbowkit";
import MySvg from "../assets/RSS3.svg";
import Image from "next/image";
import { Typography } from "@ensdomains/thorin";

export const MyHearder = () => {
  return (
    <div className="flex justify-between items-center py-10">
      <div className="flex-1 flex justify-start h-10 ml-8">
        <MySvg className="rounded-xl"></MySvg>
        <Typography className="pt-2.5 pl-2">RSS3 Name Service</Typography>
      </div>
      <div className="flex justify-end mr-8">
        <ConnectButton></ConnectButton>
      </div>
    </div>
  );
};
