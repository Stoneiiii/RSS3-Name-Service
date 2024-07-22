import { Banner, Typography } from "@ensdomains/thorin";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserProfile } from "@/components/Profile";
import Head from "next/head";
import { fontSizes } from "@ensdomains/thorin/dist/types/tokens/typography";

const Home: NextPage = () => {
  const { query } = useRouter();
  const { domain } = query;
  const domainString = Array.isArray(domain) ? domain[0] : domain || "";

  // init variable for head
  const ogImageUrl = "";
  const titleContent = "";
  const descriptionContent = "";

  return (
    <>
      <Head>
        <title>{domainString}</title>
        <meta name="description" content={domainString} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:title" content={titleContent} />
        <meta property="og:description" content={descriptionContent} />
        <meta property="twitter:image" content={ogImageUrl} />
        <meta property="twitter:title" content={titleContent} />
        <meta property="twitter:description" content={descriptionContent} />
      </Head>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full gap-4 px-4">
        <Typography fontVariant="extraLargeBold" style={{fontSize: '32px'}}>{domainString}</Typography>
            <UserProfile
              {...{
                domainString,
              }}
            />
        </div>
      </div>
    </>
  );
};

export default Home;
