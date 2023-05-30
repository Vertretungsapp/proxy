import type { Config, Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    const { url, headers } = await request.json();

    const req = await fetch(url, {
        headers
    });

    if(req.status === 404) return new Response("Not Found", { status: 404 });
    if(req.status === 401) return new Response("Unauthorized", { status: 401 });
    if(req.status !== 200) return new Response("Error", { status: 500 });

    return new Response(await req.text(), { status: 200 });
};

export const config: Config = {
    path: "/",
};