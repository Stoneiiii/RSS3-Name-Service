import { ConnectButton } from "@rainbow-me/rainbowkit";
import MySvg from "../assets/RSS3.svg";
import { Typography } from "@ensdomains/thorin";
import Link from "next/link";

export const MyHearder = () => {
  return (
    <div className="flex justify-between items-center py-10">
      <Link className="flex-1 flex justify-start h-10 ml-8" href={`/`}>
        <MySvg className="rounded-xl"></MySvg>
        <Typography className="pt-2.5 pl-2">RSS3 Name Service</Typography>
      </Link>
      <div className="flex justify-end mr-8">
        <ConnectButton></ConnectButton>
      </div>
    </div>
  );
};
