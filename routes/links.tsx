/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import Nav from "../components/Nav.tsx";
import LinkCard from "../components/LinkCard.tsx";
import Footer from "../components/Footer.tsx";
import Hash from "../utils/hash.ts";
// todo: clean up
// check if exists and if not trigger building new data object
// check how many exist, and if > 2 exist remove older
export const handler: Handlers = {
  
  async GET(_req, ctx) {
    const rawLinks = await Deno.readTextFile(`data/data-${Hash()}.json`);
    const allLinks = JSON.parse(rawLinks).links;
    return ctx.render(allLinks.records);
  }
}

export default function Links(props: PageProps) {
  return (
    <Fragment>
      <div class={tw`w-full bg-[#FFFCF2]`}>
        <Nav />
      </div>
      <main class={tw`w-full bg-[#FFFCF2]`}>
        <section class={tw`max-w-5xl mx-auto`}>
          <h2 id="recent" class={tw`text-3xl mb-2`}>All Links</h2>
          <p class={tw`uppercase text-xs mb-4`}>
            Last updated <time dateTime="2022-07-04T19:00">July 4, 2022</time>.</p>
          <div class={tw`w-full flex flex-wrap`}>
          {props.data.map( (link, index ) => 
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
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
