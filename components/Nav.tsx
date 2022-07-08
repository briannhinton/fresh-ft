/** @jsx h */
import { h } from "preact";
import { tw } from "../utils/twind.ts";

export default function Nav () {
    return (
    <nav class={tw`pt-8 mb-24 max-w-5xl mx-auto flex justify-between`}>
        <h1 class={tw`uppercase text-2xl font-bold`}>FigmaLinks</h1>
        <ul class={tw`flex gap-x-8 uppercase`}>
          <li><a href="/" aria-current="page" class={tw`font-bold hover:underline`}>Home</a></li>
          <li><a href="/all-links" class={tw`hover:underline`}>All Links</a></li>
        </ul>
    	<p class={tw`hidden sm:inline-block`}>Made with <span class={tw`sr-only`}>love</span> <img src="/icon-heart.svg" class={tw`w-6 h-6 inline`} alt=""/> in Florida.</p>
    </nav>
    )
}