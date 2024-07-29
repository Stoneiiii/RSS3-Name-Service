import { SetStateAction, useEffect, useState } from "react";
import { RecordItem, Typography } from "@ensdomains/thorin";
import useEnsText from "./hooks/useText";

import Image, { StaticImageData } from "next/image";

import githubIcon from "../assets/github.png";
import emailIcon from "../assets/email.png";
import twitterIcon from "../assets/twitter.png";
import websiteIcon from "../assets/website.png";
import discordIcon from "../assets/discord.png";
import telegramIcon from "../assets/telegram.png";
import { MyText } from "./MyText";

interface Text {
  [key: string]: string;
  "com.website": string;
  "com.twitter": string;
  "com.github": string;
  "com.discord": string;
  "com.telegram": string;
  email: string;
}

const iconMapping: { [key: string]: StaticImageData } = {
  "com.website": websiteIcon,
  "com.twitter": twitterIcon,
  "com.github": githubIcon,
  "com.discord": discordIcon,
  "com.telegram": telegramIcon,
  email: emailIcon,
};

const urlFormat = ({ url }: { url: any }) => {
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return url;
};

export const SocialText = ({ domainString }: { domainString: string }) => {
  // const [text, setText] = useState<Text>({
  //   "com.website": "",
  //   "com.twitter": "",
  //   "com.github": "",
  //   "com.discord": "",
  //   "com.telegram": "",
  //   email: "",
  // });
  // var namehash = require("eth-ens-namehash");
  // const node = namehash.hash(domainString);

  // const keys: (keyof Text)[] = [
  //   "com.website",
  //   "com.twitter",
  //   "com.github",
  //   "com.discord",
  //   "com.telegram",
  //   "email",
  // ];

  // keys.forEach((key) => {
  //   const { data, isError } = useEnsText(node, key as string);
  //   // console.log(key, data)

  //   useEffect(() => {
  //     if (data && typeof data === "string") {
  //       setText((prevText) => ({
  //         ...prevText,
  //         [key]: data,
  //       }));
  //     }
  //   }, [data]);
  // });
  // // console.log("dddd", text["com.discord"]);

  // const textLen = Object.values(text).filter(
  //   (value) => value.trim() !== ""
  // ).length;

  const [isEmpty, setiIsEmpty] = useState({});

  const textLen = Object.values(isEmpty).filter((value) => value).length;
  console.log("ss", textLen);

  return (
    <>
      {textLen > 0 ? (
        <>
          <Typography fontVariant="large" style={{ color: "gray" }}>
            Accounts:
          </Typography>
          <div className="flex flex-wrap gap-3 my-0">
            <MyText
              myKey={"email"}
              domainString={domainString}
              isEmpty={isEmpty}
              setIsEmpty={setiIsEmpty}
            />
            <MyText
              myKey={"com.website"}
              domainString={domainString}
              isEmpty={isEmpty}
              setIsEmpty={setiIsEmpty}
            />
            <MyText
              myKey={"com.twitter"}
              domainString={domainString}
              isEmpty={isEmpty}
              setIsEmpty={setiIsEmpty}
            />
            <MyText
              myKey={"com.github"}
              domainString={domainString}
              isEmpty={isEmpty}
              setIsEmpty={setiIsEmpty}
            />
            <MyText
              myKey={"com.discord"}
              domainString={domainString}
              isEmpty={isEmpty}
              setIsEmpty={setiIsEmpty}
            />
            <MyText
              myKey={"com.telegram"}
              domainString={domainString}
              isEmpty={isEmpty}
              setIsEmpty={setiIsEmpty}
            />
          </div>
        </>
      ) : null}

      {textLen === 0 && (
          <MyText
            myKey={"email"}
            domainString={domainString}
            isEmpty={isEmpty}
            setIsEmpty={setiIsEmpty}
          />
        ) && (
          <MyText
            myKey={"com.website"}
            domainString={domainString}
            isEmpty={isEmpty}
            setIsEmpty={setiIsEmpty}
          />
        ) && (
          <MyText
            myKey={"com.twitter"}
            domainString={domainString}
            isEmpty={isEmpty}
            setIsEmpty={setiIsEmpty}
          />
        ) && (
          <MyText
            myKey={"com.github"}
            domainString={domainString}
            isEmpty={isEmpty}
            setIsEmpty={setiIsEmpty}
          />
        ) && (
          <MyText
            myKey={"com.discord"}
            domainString={domainString}
            isEmpty={isEmpty}
            setIsEmpty={setiIsEmpty}
          />
        ) && (
          <MyText
            myKey={"com.telegram"}
            domainString={domainString}
            isEmpty={isEmpty}
            setIsEmpty={setiIsEmpty}
          />
        )}
    </>
  );
};
