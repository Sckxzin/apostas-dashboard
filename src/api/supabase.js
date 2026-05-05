import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://acnfsfllxahqfqmfkivu.supabase.co",
  "sb_publishable_bmI_jGP2Q5X368mesq3aAg_W9ekEcyb"
);

export default supabase;