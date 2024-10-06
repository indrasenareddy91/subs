


export async function POST(request:Request , response:Response) {   

    const body = await request.json();
    console.log(body);
    console.log(body.title)

    return new Response("OK");
    
}