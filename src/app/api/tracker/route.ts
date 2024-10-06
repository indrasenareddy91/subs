

import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request:NextApiRequest, response:NextApiResponse) {

    const { moviename } = request.body;

     console.log(moviename)
     
     return response.json({ status: 'ok' });
    
}