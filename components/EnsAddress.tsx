"use client";

import { config } from "@/config";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEnsAddress, useEnsName } from "wagmi";

const isETHaddress = ({ address }: { address: string }) => {
  if (!address) return ''
  if (address.includes('.')) {
    let parts = address.split('.');
    let suffix = parts[parts.length-1];
    if (suffix === 'eth') return address
    return ''
  }
  return `${address}.eth`
}

const EnsAddress = ({ address }: { address: string }) => {
  // check input
  address = isETHaddress({address});
  if (!address) return <div title="useEnsAddress">Not Supported</div>;
  //   const address = 'vitalik.eth';
  const { data, isError, error, isLoading } = useEnsAddress({
    config,
    name: address,
    chainId: 1,
  });
  console.log("$$$",address);
  if (isLoading) return <div title="useEnsAddress">Fetching address…</div>;
  if (isError) return <div title="useEnsAddress">Error fetching address</div>;
  if (data) {
    return (
    <div>
      Address for {address}:{" "}
      <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono">
        {data as string}
      </span>
    </div>
    );
  }else {
    return  (  
    <div>
      {address} is available for register
      <Link href={`/register?name=${address}`}>
      <CheckIcon className="w-6 h-6 text-green-500" />
      </Link>
    </div>        
    );
  }
};

export default EnsAddress;
