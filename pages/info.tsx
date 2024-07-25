import { Banner, RecordItem, Typography } from "@ensdomains/thorin";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { UserProfile } from "@/components/Profile";
import Head from "next/head";
import { fontSizes } from "@ensdomains/thorin/dist/types/tokens/typography";
import { MyHearder } from "@/components/MyHeader";

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
      <header className="bg-gray-50">
        <MyHearder />
      </header>
      <div className="bg-gray-50">
        <div className="flex items-center justify-center">
          <Typography
            className="mx-auto w-1/2  pl-3"
            fontVariant="extraLargeBold"
            style={{
              fontSize: "32px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            {domainString}
          </Typography>
        </div>
        <div className="flex items-center justify-center">
          <div className="mx-auto w-1/2 my-2.5">
            <UserProfile
              {...{
                domainString,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
