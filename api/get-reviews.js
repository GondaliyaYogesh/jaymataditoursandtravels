export default async function handler(req, res) {
  const SUPABASE_URL = "process.env.SUPABASE_URL";
  const SUPABASE_KEY = "process.env.SUPABASE_SERVICE_ROLE_KEY";

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews?select=*&order=created_at.desc`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
