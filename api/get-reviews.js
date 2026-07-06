export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(455).json({ message: 'Method Not Allowed' });
  }

  const SUPABASE_URL = "process.env.SUPABASE_URL";
  const SUPABASE_KEY = "process.env.SUPABASE_SERVICE_ROLE_KEY";
  const { name, route, rating, comment } = req.body;

  try {
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
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
