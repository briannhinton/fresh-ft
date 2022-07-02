/** @jsx h */
import { h } from "preact";
import { tw } from "../utils/twind.ts";

type LinkFooterProps = {
	linkType: string;
	linkUrl: string;
};
  
export default function LinkFooter({ linkType, linkUrl }: LinkFooterProps) {
  if (linkType === "article") {
    return <a class={tw`underline`} href={linkUrl}>Read Article</a>
  } else if (linkType === "video") {
		return <a class={tw`underline`} href={linkUrl}>Watch Video</a>
	}
  return <a class={tw`underline`} href={linkUrl}>Open in Community</a>;
}