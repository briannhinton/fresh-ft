/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import TimeSincePub from "../components/TimeSincePub.tsx";
import LinkFooter from "../components/LinkFooter.tsx";
import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";

export const handler: Handlers = {
  async GET(__req, ctx) {
    const rawLinks = fetch("");
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
      <main class={tw`w-full pt-20 bg-[#FFFCF2]`}>
        <section class={tw`max-w-5xl mx-auto`}>
          <h2 id="recent" class={tw`text-3xl mb-2`}>All Links</h2>
          <p class={tw`uppercase text-xs mb-4`}>
            Last updated <time dateTime="2022-07-04T19:00">July 4, 2022</time>.</p>
          <div class={tw`w-full flex flex-wrap`}>
            {props.data.map(link => {
              return (
                <article class={tw`border-4 border-gray-900 -mr-1 -mb-1 px-6 pt-9 pb-12 w-full sm:w-[calc(50%+0.25rem)] lg:w-[calc(33.333333%+0.25rem)]`} data-key={link.id}
                style="background: url('/cornertone.png'), #fafafa;
                background-position: top left;
                background-size: 100% 100%;
                background-repeat: no-repeat;">
                  <p class={tw`uppercase text-xs font-extrabold text-[#2D67BE] mb-4`}>{link.fields.type}</p>
                  <h3 class={tw`text-2xl text-gray-800 mb-2`}>{link.fields.linkTitle}</h3>
                  <a class={tw`text-xs uppercase mb-2 inline-block hover:underline`} href={link.fields.authorUrl}>by {link.fields.author}</a>
                  <p class={tw`text-gray-500 mb-4`}>{link.fields.linkDesc}</p>
                  <a class={tw `underline`} href={link.fields.linkUrl}>Download</a>
                </article>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}
