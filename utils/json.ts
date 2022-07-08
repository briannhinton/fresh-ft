import { Dbjson } from "dbjson";
import "https://deno.land/std@0.146.0/dotenv/load.ts";

import Hash from "./hash.ts";
// TODO: update export json info
export default async function ExportJson() {
  const currentHash = Hash();
  const rawLinks = fetch(`${Deno.env.get("URL")}${Deno.env.get("DATA")}?api_key=${Deno.env.get("API")}`);
  const links = await (await rawLinks).json()
  // set the relative path of the json
  const dbjson = new Dbjson(`./data/data-${currentHash}.json`, `links`); 

  // this gonna write it in the place and with name we choose it in the instance we did in "new Dbjson"
  await dbjson.writeJSON(links);
  // return links context for use with pageprops
  return [links, currentHash];
}