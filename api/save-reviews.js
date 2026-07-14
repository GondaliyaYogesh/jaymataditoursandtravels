export default async function handler(request) {
  // Enforce method block validation
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    // Correctly extract body elements in standard fetch syntax
    const body = await request.json();
    const { name, route, rating, comment } = body;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: 'POST',
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify({ name, route, rating, comment })
    });
    
    const data = await response.json();
    
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
