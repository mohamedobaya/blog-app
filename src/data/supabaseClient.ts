import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mkjjbhcxtktljgqmorrt.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rampiaGN4dGt0bGpncW1vcnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NjU3OTgsImV4cCI6MjA3NTI0MTc5OH0.dKGAkwuX69G4Aurily4y2DGw9_-m0yPKlgrqkuaI7bk";
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
