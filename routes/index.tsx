/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import TimeSincePub from "../components/TimeSincePub.tsx";
import LinkFooter from "../components/LinkFooter.tsx";
import { Dbjson } from "dbjson";

// this is a temporary hack to get the current date for a generated hash for a new db.json file
const today = Date.now();
const date = new Date(today);
const day = date.getDate().toString();
const month = (date.getMonth() + 1).toString();
const year = date.getFullYear();
const generatedDate = day + month + year;

export const handler: Handlers<Project> = {
  async GET(__req, ctx) {
    const rawLinks = fetch("");
    const links = await (await rawLinks).json()
    
    // set the relative path of the json
    const dbjson = new Dbjson(`./db/db-${generatedDate}.json`, `link`); 

    // this gonna write it in the place and with name we choose it in the instance we did in "new Dbjson"
    await dbjson.writeJSON(links);
    // return links context for use with pageprops
    return ctx.render(links.records);
  }
}

// TODO: border right on main container
export default function Home(props: PageProps) {
  const currentDate = Date.now()
  const sliceLink = props.data.slice(0, 6);

  return (
    <Fragment>
      <div class={tw`w-full border-gray-900 border-b-4`}
      style="background: url('/halftone.png'), #FFF2CC;
      background-repeat: repeat;">
        <nav class={tw`pt-8 mb-24 max-w-5xl mx-auto flex justify-between`}>
          <h1 class={tw`uppercase text-2xl font-bold`}>FigmaLinks</h1>
          <ul class={tw`flex gap-x-8 uppercase`}>
            <li><a href="/" aria-current="page" class={tw`font-bold hover:underline`}>Home</a></li>
            <li><a href="/all-links" class={tw`hover:underline`}>All Links</a></li>
          </ul>
          <p class={tw`hidden sm:inline-block`}>Made with <span class={tw`sr-only`}>love</span> <img src="/icon-heart.svg" class={tw`w-6 h-6 inline`} alt=""/> in Florida.</p>
        </nav>
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
            {sliceLink.map(link => {
              return (
                <article class={tw`border-4 border-gray-900 px-6 pt-9 pb-12 -mr-1 -mb-1 w-full sm:w-[calc(50%+0.25rem)] lg:w-[calc(33.333333%+0.25rem)]`} data-key={link.id}
                style="background: url('/cornertone.png'), #fafafa;
                background-position: top left;
                background-size: 100% 100%;
                background-repeat: no-repeat;">
                  <ul class={tw`flex gap-1`}>
                    {link.fields.tag.map((tag, index, arr) => {
                      return index === arr.length - 1 
                      ? <li class={tw`uppercase text-xs font-extrabold text-[#2D67BE] mb-4`}>{tag}</li> 
                      : <li class={tw`uppercase text-xs font-extrabold text-[#2D67BE] mb-4`}>{tag},</li>
                    })}
                  </ul>
                  <h3 class={tw`text-2xl text-gray-800 mb-2`}>{link.fields.linkTitle}</h3>
                  <ul class={tw`mb-2 flex gap-2 text-gray-500`}>
                    <li class={tw`text-xs uppercase`}>
                      by <a class={tw`hover:underline hover:text-gray-800`} href={link.fields.authorUrl}> {link.fields.author},</a>
                    </li>
                    <li class={tw`text-xs uppercase`}>
                      <p><TimeSincePub start={link.fields.age} end={currentDate}/></p>
                    </li>
                  </ul>
                  <p class={tw`text-gray-500 mb-4`}>{link.fields.linkDesc}</p>
                  <LinkFooter linkType={link.fields.linkType} linkUrl={link.fields.linkUrl}/>
                </article>
              )
            })}
            <a href="/all-links" class={tw`grow w-full border-4 border-r-0 border-gray-900 py-6 flex justify-center cursor-pointer bg-[#fafafa] hover:bg-white`}>
              <span class={tw`underline text-2xl`}>Browse All</span>
            </a>  
          </div>
        </section>
      </main>
      <footer class={tw`flex justify-center w-full py-12 bg-[#FFFCF2]`}>
        <p class={tw`max-w-5xl mx-auto`}><span class={tw`uppercase font-bold`}>FigmaLinks</span> is maintained by <a class={tw`underline`} href="https://realtinypenguin.com">Brian Hinton</a>.</p>
      </footer>
    </Fragment>
  );
}
