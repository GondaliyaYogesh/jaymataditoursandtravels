export default async function handler(req, res) {
  const SUPABASE_URL = "https://lxjuwsnzzzjjhstlnnac.supabase.co";
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4anV3c256enpqamhzdGxubmFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNjA3OTksImV4cCI6MjA5ODgzNjc5OX0.kgvc48jDE_yKVvp24ptbQSwIZW3KPg4APzIVuWt-VAw";

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