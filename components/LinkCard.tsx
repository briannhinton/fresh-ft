/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import TimeSincePub from "../components/TimeSincePub.tsx";
import LinkFooter from "../components/LinkFooter.tsx";

export interface LinkCardProps {
  id: string;
  tags: any;
  authorUrl: string;
  age: string;
  author: string;
  linkTitle: string;
  linkType: string
  linkDesc: string;
  linkUrl: string;
}

export default function LinkCard ({ tags, linkTitle, authorUrl, author, age, linkType, linkDesc, linkUrl, id } : LinkCardProps) {
  return (
  <article class={tw`border-4 border-gray-900 px-6 pt-9 pb-12 -mr-1 -mb-1 w-full sm:w-[calc(50%+0.25rem)] lg:w-[calc(33.333333%+0.25rem)]`} data-key={id}
  style="background: url('/cornertone.png'), #fafafa;
  background-position: top left;
  background-size: 100% 100%;
  background-repeat: no-repeat;">
    <ul class={tw`flex gap-1`}>
      {tags.map((tag: string, index: number, arr: string) => {
      return index === arr.length - 1 
      ? <li class={tw`uppercase text-xs font-extrabold text-[#2D67BE] mb-4`}>{tag}</li> 
      : <li class={tw`uppercase text-xs font-extrabold text-[#2D67BE] mb-4`}>{tag},</li>
      })}
    </ul>
    <h3 class={tw`text-2xl text-gray-800 mb-2`}>{linkTitle}</h3>
    <div class={tw`mb-2 text-xs text-gray-500`}>
      <p class={tw`text-xs`}>
      by <a class={tw`hover:underline hover:text-gray-800`} href={authorUrl}> {author}</a>
      </p>
      <p><TimeSincePub start={age}/></p>
    </div>
    <p class={tw`text-gray-500 mb-4`}>{linkDesc}</p>
    <LinkFooter linkType={linkType} linkUrl={linkUrl}/>
  </article>
  )
}
