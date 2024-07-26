import { useEffect, useState } from "react";
import { RecordItem, Typography } from "@ensdomains/thorin";
import useEnsText from "./hooks/useText";

import Image, { StaticImageData } from "next/image";

import githubIcon from "../assets/github.png";
import emailIcon from "../assets/email.png";
import twitterIcon from "../assets/twitter.png";
import websiteIcon from "../assets/website.png";
import discordIcon from "../assets/discord.png";
import telegramIcon from "../assets/telegram.png";

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
  const [text, setText] = useState<Text>({
    "com.website": "",
    "com.twitter": "",
    "com.github": "",
    "com.discord": "",
    "com.telegram": "",
    email: "",
  });
  var namehash = require("eth-ens-namehash");
  const node = namehash.hash(domainString);

  const keys: (keyof Text)[] = [
    "com.website",
    "com.twitter",
    "com.github",
    "com.discord",
    "com.telegram",
    "email",
  ];

  keys.forEach((key) => {
    const { data, isError } = useEnsText(node, key as string);
    // console.log(key, data)

    useEffect(() => {
      if (data && typeof data === "string") {
        setText((prevText) => ({
          ...prevText,
          [key]: data,
        }));
      }
    }, [data]);
  });
  // console.log("dddd", text["com.discord"]);

  const textLen = Object.values(text).filter(
    (value) => value.trim() !== ""
  ).length;

  return (
    <>
      {textLen != 0 ? (
        <>
          <Typography fontVariant="large" style={{ color: "gray" }}>
            Accounts:
          </Typography>

          <div className="flex flex-wrap gap-3 ">
            {text["com.website"] ? (
              <RecordItem
                icon={
                  <Image
                    src={iconMapping["com.website"]}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                }
                link={urlFormat({ url: text["com.website"] })}
                size="small"
                href={urlFormat({ url: text["com.website"] })}
                as="a"
                value={text["com.website"]}
                inline
              >
                {text["com.website"].length < 20
                  ? text["com.website"]
                  : domainString}
              </RecordItem>
            ) : null}

            {text["email"] ? (
              <RecordItem
                key="email"
                icon={
                  <Image
                    src={iconMapping["email"]}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                }
                inline
                value={text["email"]}
                size="small"
              >
                {text["email"]}
              </RecordItem>
            ) : null}

            {text["com.twitter"] ? (
              <RecordItem
                icon={
                  <Image
                    src={iconMapping["com.twitter"]}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                }
                link={urlFormat({ url: text["com.twitter"] })}
                size="small"
                href={urlFormat({ url: text["com.twitter"] })}
                as="a"
                value={text["com.twitter"]}
                inline
              >
                {text["com.twitter"].length < 20
                  ? text["com.twitter"]
                  : domainString}
              </RecordItem>
            ) : null}

            {text["com.github"] ? (
              <RecordItem
                icon={
                  <Image
                    src={iconMapping["com.github"]}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                }
                link={urlFormat({ url: text["com.github"] })}
                size="small"
                href={urlFormat({ url: text["com.github"] })}
                as="a"
                value={text["com.github"]}
                inline
              >
                {text["com.github"].length < 20
                  ? text["com.github"]
                  : domainString}
              </RecordItem>
            ) : null}

            {text["com.discord"] ? (
              <RecordItem
                icon={
                  <Image
                    src={iconMapping["com.discord"]}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                }
                value={text["com.discord"]}
                inline
              >
                {text["com.discord"].length < 20
                  ? text["com.discord"]
                  : domainString}
              </RecordItem>
            ) : null}

            {text["com.telegram"] ? (
              <RecordItem
                icon={
                  <Image
                    src={iconMapping["com.telegram"]}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                }
                link={urlFormat({ url: text["com.telegram"] })}
                size="small"
                href={urlFormat({ url: text["com.telegram"] })}
                as="a"
                value={text["com.telegram"]}
                inline
              >
                {text["com.telegram"].length < 20
                  ? text["com.telegram"]
                  : domainString}
              </RecordItem>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};
