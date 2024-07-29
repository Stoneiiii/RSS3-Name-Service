import { MyHearder } from "@/components/MyHeader";
import { NextPage } from "next";
import Head from "next/head";
import router, { useRouter } from "next/router";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import resolverInfo from "@/lib/constants/contract/PublicResolver.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button, Card, Heading, Input } from "@ensdomains/thorin";
import { ChangeEvent, useEffect, useState } from "react";
import useEnsText from "@/components/hooks/useText";
import { SettingInput } from "@/components/SettingInput";

interface NewText {
  [key: string]: string;
  "com.website": string;
  "com.twitter": string;
  "com.github": string;
  "com.discord": string;
  "com.telegram": string;
  email: string;
}

interface PreText {
  [key: string]: string;
  "com.website": string;
  "com.twitter": string;
  "com.github": string;
  "com.discord": string;
  "com.telegram": string;
  email: string;
}

const Home: NextPage = () => {
  const { address:myaddr } = useAccount();
  const { query } = useRouter();
  const { domain, address } = query;
  const domainString = Array.isArray(domain) ? domain[0] : domain || "";
// console.log("^^^", domainString);
    //the domain is not belong to you
  useEffect(() => {
    if (address && myaddr&& address != myaddr) {
      router.push('/'); 
    }
  }, [address, myaddr, router]);

  console.log(address,myaddr)


  const [newText, setNewText] = useState<NewText>({
    "com.website": "",
    "com.twitter": "",
    "com.github": "",
    "com.discord": "",
    "com.telegram": "",
    email: "",
  });

  const [preText, setPreText] = useState<PreText>({
    "com.website": "",
    "com.twitter": "",
    "com.github": "",
    "com.discord": "",
    "com.telegram": "",
    email: "",
  });

  var namehash = require("eth-ens-namehash");
  const node = namehash.hash(domainString);

  const { writeContract, status, error } = useWriteContract();

  const abiSetText = (key: string, value: string) => {
    writeContract({
      address: resolverInfo.address as `0x${string}`,
      abi: resolverInfo.abi,
      functionName: "setText",
      args: [node, key, value],
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewText((prevNewText) => ({
      ...prevNewText,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("form data:", newText);
    for (const key in newText) {
      if (newText[key]) {
        abiSetText(key, newText[key]);
      }
    }
  };
  
  useEffect(() => {
    if (status === 'success') {
      router.reload();
    }
  }, [status]);

  if (address === undefined || myaddr === undefined) {
    return null;
  }


  return (
    <>
      <header className="bg-gray-50">
        <MyHearder />
      </header>
      <div className="flex items-center justify-center bg-gray-50">
        {!address ? (
          <span className="bg-gray-50">sign in</span>
        ) : (
          <>
            <div className="flex-col items-center justify-center w-1/2 bg-gray-50">
              <Card className="my-3">
                <div className="text-center text-2xl font-semibold">
                  Edit your profile
                </div>

                <form>
                  {[
                    {
                      label: "Website",
                      name: "com.website",
                      key: "com.website",
                      type: "text",
                    },
                    {
                      label: "Twitter",
                      name: "com.twitter",
                      key: "com.twitter",
                      type: "text",
                    },
                    {
                      label: "GitHub",
                      name: "com.github",
                      key: "com.github",
                      type: "text",
                    },
                    {
                      label: "Discord",
                      name: "com.discord",
                      key: "com.discord",
                      type: "text",
                    },
                    {
                      label: "Telegram",
                      name: "com.telegram",
                      key: "com.telegram",
                      type: "text",
                    },
                    {
                      label: "Email",
                      name: "email",
                      key: "email",
                      type: "email",
                    },
                  ].map((field) => (
                    <div key={field.name} className="mb-4 ">
                      <div className="flex justify-between mb-1">
                        <label
                          className="flex-row text-1xl font-medium text-gray-500"
                          htmlFor={field.name}
                        >
                          {field.label}
                        </label>
                        <label
                          className="flex-row text-lg text-gray-400"
                          htmlFor={field.key}
                        >
                          {field.key}
                        </label>
                      </div>
                      <SettingInput
                        fieldName={field.name}
                        newTextStr={newText[field.name as keyof NewText]}
                        handleChange={handleChange}
                        fieldKey={field.key}
                        node={node}
                        // placeholder={}
                      />
                    </div>
                  ))}
                  <div className="flex justify-between gap-4 ">
                    <Button
                      className="w-1/2"
                      colorStyle="accentSecondary"
                      onClick={() => {
                        router.push('/'); 
                      }}
                      disabled={status==="pending"}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="w-1/2"
                      onClick={() => {
                        handleSave();
                      }}
                      disabled={status==="pending"}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
