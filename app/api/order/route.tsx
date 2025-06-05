import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Parse the request body
  const body = await request.json();
  const { username, email, ingredientsList } = body;
 
  const newOrder = { id: Date.now(), username, email, ingredientsList };
 
  return new Response(JSON.stringify(newOrder), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}
