/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import Nav from "../components/Nav.tsx";
import LinkCard from "../components/LinkCard.tsx";
import Footer from "../components/Footer.tsx";

import { Dbjson } from "dbjson";
import "https://deno.land/std@0.146.0/dotenv/load.ts";

// this is a temporary hack to get the current date for a generated hash for a new db.json file
const today = Date.now();
const date = new Date(today);
const day = date.getDate().toString();
const month = (date.getMonth() + 1).toString();
const year = date.getFullYear();
const generatedDate = day + month + year;

export const handler: Handlers = {
  async GET(__req, ctx) {
    const rawLinks = fetch(`${Deno.env.get("URL")}${Deno.env.get("DATA")}?api_key=${Deno.env.get("API")}`);
    const links = await (await rawLinks).json()
    // set the relative path of the json
    const dbjson = new Dbjson(`./db/db-${generatedDate}.json`, `link`); 

    // this gonna write it in the place and with name we choose it in the instance we did in "new Dbjson"
    await dbjson.writeJSON(links);
    // return links context for use with pageprops
    return ctx.render(links.records);
  }
}

export default function Home(props: PageProps) {
  const sliceLink = props.data.slice(0, 6);
  console.log(sliceLink)

  return (
    <Fragment>
      <div class={tw`w-full border-gray-900 border-b-4`}
      style="background: url('/halftone.png'), #FFF2CC;
      background-repeat: repeat;">
        <Nav />
        <section class={tw`max-w-5xl mx-auto flex mb-20`}>
          <div>
          <h2 class={tw`my-6 text-6xl max-w-md`}>
            Browse Figma bookmarks on education, presentation, meetups and more.
          </h2>
          <a class={tw`text-2xl underline flex gap-x-1 items-center`} href="#recent">
            Start Exploring <img src="/icon-down-arrow.svg" class={tw`inline w-9 h-9`} alt="" aria-hidden="true"/>
          </a>
          </div>
          <img src="/heroillustration.svg" class={tw`hidden sm:block`}></img>
        </section>
      </div>
      <main class={tw`w-full pt-20 bg-[#FFFCF2]`}>
        <section class={tw`max-w-5xl mx-auto`}>
          <h2 id="recent" class={tw`text-3xl mb-2`}>Recently Added</h2>
          <p class={tw`uppercase text-xs mb-4`}>
            Last updated <time dateTime="2022-07-04T19:00">July 4, 2022</time>.</p>
          <div class={tw`w-full flex flex-wrap overflow-hidden border-r-4 border-gray-900`}>
          {sliceLink.map( (link) => 
            <LinkCard
            id={link.id}
            tags={link.fields.tag}
            linkTitle={link.fields.linkTitle}
            authorUrl={link.fields.authorUrl}
            author={link.fields.author}
            age={link.fields.age}
            linkDesc={link.fields.linkDesc}
            linkType={link.fields.linkType}
            linkUrl={link.fields.linkUrl}
            />
          )}
          <a href="/links" class={tw`grow w-full border-4 border-r-0 border-gray-900 py-6 flex justify-center cursor-pointer bg-[#fafafa] hover:bg-white`}>
            <span class={tw`underline text-2xl`}>Browse All</span>
          </a>  
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}