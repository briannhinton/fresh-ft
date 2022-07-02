/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<Project> = {
  async GET(__req, ctx) {
    // get our data
    const rawLinks = fetch("");
    const links = await (await rawLinks).json()
    return ctx.render(links.records);
  }
}

export default function Home(props: PageProps) {

  return (
    <Fragment>
      <div class={tw`w-full bg-[#FFFCF2]`}>
        <nav class={tw`pt-8 max-w-5xl mx-auto flex justify-between`}>
          <h1 class={tw`uppercase text-2xl font-bold`}>FigmaLinks</h1>
          <ul class={tw`flex gap-x-8 uppercase`}>
            <li><a href="/" class={tw`hover:underline`}>Home</a></li>
            <li><a href="/" aria-current="page" class={tw`font-bold hover:underline`}>All Links</a></li>
          </ul>
          <p class={tw`hidden sm:inline-block`}>Made with <span class={tw`sr-only`}>love</span> <img src="/love.svg" class={tw`w-6 h-6 inline`} alt=""/> in Florida.</p>
        </nav>
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
      <footer class={tw`flex justify-center w-full py-12 bg-[#FFFCF2]`}>
        <p class={tw`max-w-5xl mx-auto`}>FigmaLinks is maintained by <a class={tw`underline`} href="https://realtinypenguin.com">Brian Hinton</a>.</p>
      </footer>
    </Fragment>
  );
}
