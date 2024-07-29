import { useEffect, useState } from "react";
import useEnsText from "./hooks/useText";
import { RecordItem } from "@ensdomains/thorin";
import Image, { StaticImageData } from "next/image";

import githubIcon from "../assets/github.png";
import emailIcon from "../assets/email.png";
import twitterIcon from "../assets/twitter.png";
import websiteIcon from "../assets/website.png";
import discordIcon from "../assets/discord.png";
import telegramIcon from "../assets/telegram.png";

const iconMapping: { [key: string]: StaticImageData } = {
  "com.website": websiteIcon,
  "com.twitter": twitterIcon,
  "com.github": githubIcon,
  "com.discord": discordIcon,
  "com.telegram": telegramIcon,
  email: emailIcon,
};

const keyisLink: { [key: string]: StaticImageData } = {
  "com.website": websiteIcon,
  "com.twitter": twitterIcon,
  "com.github": githubIcon,
  // "com.discord": discordIcon,
  "com.telegram": telegramIcon,
  // email: emailIcon,
};

const urlFormat = ({ url }: { url: string }) => {
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return url;
};

const isLinkItem = ({ myKey }: { myKey: string }) => {
  return myKey in keyisLink;
};

// interface MyTextProps {
//     domainString:
//     isEmpty: boolean;
//     setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
// }

export const MyText = ({
  domainString,
  myKey,
  isEmpty,
  setIsEmpty,
}: {
  domainString: string;
  myKey: string;
  isEmpty: object;
  setIsEmpty: React.Dispatch<React.SetStateAction<object>>;
}) => {
  const [text, setText] = useState("");

  var namehash = require("eth-ens-namehash");
  const node = namehash.hash(domainString);
  const { data, isError } = useEnsText(node, myKey as string);
  useEffect(() => {
    if (data && typeof data === "string") {
      setText(data);
      // setIsEmpty({myKey: true});
      
      setIsEmpty((prevStatus) => ({
        ...prevStatus,
        [myKey]: true,
      }));
    }
  }, [data]);

  if(!data) {
    return null;
  }

  return (
    <div>
      {text ? (
        isLinkItem({ myKey }) ? (
          <RecordItem
            icon={
              <Image
                src={iconMapping[myKey]}
                alt="icon"
                width={20}
                height={20}
              />
            }
            link={urlFormat({ url: text })}
            size="small"
            href={urlFormat({ url: text })}
            as="a"
            value={text}
            inline
          >
            {text.length < 20 ? text : domainString.split(".")[0]}
          </RecordItem>
        ) : (
          <RecordItem
            key={myKey}
            icon={
              <Image
                src={iconMapping[myKey]}
                alt="icon"
                width={20}
                height={20}
              />
            }
            inline
            value={text}
            size="small"
          >
            {text}
          </RecordItem>
        )
      ) : null}
    </div>
  );
};
