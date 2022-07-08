/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import Nav from "../components/Nav.tsx";
import LinkCard from "../components/LinkCard.tsx";
import Footer from "../components/Footer.tsx";

export const handler: Handlers = {
  async GET(__req, ctx) {
    const rawLinks = fetch(`${Deno.env.get("URL")}${Deno.env.get("DATA")}?api_key=${Deno.env.get("API")}`);
    const links = await (await rawLinks).json()

    return ctx.render(links.records);
  }
}

export default function Home(props: PageProps) {

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
