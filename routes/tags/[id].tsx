// /** @jsx h */
// import { h } from "preact";
// import { Handlers, PageProps } from "$fresh/server.ts";

// export const handler: Handlers<Project> = {
//     async GET(__req, ctx) {
//       const id: string = ctx.params.id
//       const rawTalk = fetch(`https://api.airtable.com/v0/appR8MGMnlxPB6fNZ/Talks?api_key=key6EcFk2WCtWHQZT`);
//       const talk = await (await rawTalk).json()
      
// 			return ctx.render(talk);
//     }
//   }

// export default function Talk(props: PageProps) {
//   return (
// 		<div>
// 			<h1>{props.data.title}</h1>
// 			<p>{props.data.body}</p>
// 		</div>
// 	);
// }
