/** @jsx h */
import { h } from "preact";
import { tw } from "../utils/twind.ts";

export default function Footer(){
	return (
	<footer class={tw`flex justify-center w-full py-12 bg-[#FFFCF2]`}>
		<p class={tw`max-w-5xl mx-auto`}><span class={tw`uppercase font-bold`}>FigmaLinks</span> is maintained by <a class={tw`underline`} href="https://realtinypenguin.com">Brian Hinton</a>.</p>
	</footer>
	)
}
