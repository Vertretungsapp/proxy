import type { Config, Context } from "https://edge.netlify.com";

const cors = {
    "Access-Control-Allow-Origin": "*",
}

export default async (request: Request, context: Context) => {
    const { url, headers } = await request.json();

    const req = await fetch(url, {
        headers
    });

    if(req.status === 404) return new Response("Not Found", { status: 404, headers: cors });
    if(req.status === 401) return new Response("Unauthorized", { status: 401, headers: cors });
    if(req.status !== 200) return new Response("Error", { status: 500, headers: cors });

    return new Response(await req.text(), { status: 200, headers: cors });
};

export const config: Config = {
    path: "/",
};