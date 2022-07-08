/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Dbjson } from "dbjson";
import "https://deno.land/std@0.146.0/dotenv/load.ts";

// this is a temporary hack to get the current date for a generated hash for a new db.json file
const today = Date.now();
const date = new Date(today);
const day = date.getDate().toString();
const month = (date.getMonth() + 1).toString();
const year = date.getFullYear();
const generatedDate = day + month + year;

export const handler: Handlers = {
  async GET(__req, ctx) {
    const rawLinks = fetch(`${Deno.env.get("URL")}${Deno.env.get("DATA")}?api_key=${Deno.env.get("API")}`);
    const links = await (await rawLinks).json()
    // set the relative path of the json
    const dbjson = new Dbjson(`./db/db-${generatedDate}.json`, `link`); 

    // this gonna write it in the place and with name we choose it in the instance we did in "new Dbjson"
    await dbjson.writeJSON(links);
    // return links context for use with pageprops
    return ctx.render(links.records);
  }
}