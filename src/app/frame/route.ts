import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  const siteUrl = `${protocol}://${host}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="og:title" content="StanleyPOA Minter" />
        <meta property="og:image" content="${siteUrl}/frame.png" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${siteUrl}/frame.png" />
        <meta property="fc:frame:button:1" content="Mint Your Proof-of-Attendance NFT" />
        <meta property="fc:frame:post_url" content="${siteUrl}/frame" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="${siteUrl}" />
      </head>
      <body>
        <h1>StanleyPOA Minter Frame</h1>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

// Farcaster Frames require a GET handler as well for the initial load.
export async function GET(req: NextRequest): Promise<NextResponse> {
  // We can reuse the POST handler's logic for the GET request.
  return POST(req);
}
