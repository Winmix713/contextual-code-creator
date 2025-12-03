import { z } from "zod";

const envSchema = z.object({
  // Supabase Configuration (Kötelezők a megadott .env alapján)
  VITE_SUPABASE_URL: z.string().url("Érvénytelen Supabase URL"),
  VITE_SUPABASE_ANON_KEY: z.string().min(1, "Supabase anon key szükséges"),
  VITE_SUPABASE_PROJECT_ID: z.string().optional(), // A .env-ben benne van, de a kód lehet nem használja közvetlenül

  // Environment (Opcionális, default: development)
  VITE_ENV: z.enum(["development", "production", "staging"]).default("development"),

  // Feature Flags (Opcionálisak, default: false)
  VITE_FEATURE_PHASE5: z.coerce.boolean().default(false),
  VITE_FEATURE_PHASE6: z.coerce.boolean().default(false),
  VITE_FEATURE_PHASE7: z.coerce.boolean().default(false),
  VITE_FEATURE_PHASE8: z.coerce.boolean().default(false),
  VITE_FEATURE_PHASE9: z.coerce.boolean().default(false),

  // Egyéb opcionális változók (Hogy ne dobjon hibát, ha nincsenek definiálva)
  VITE_API_ORIGIN: z.string().url().optional(),
  VITE_EDGE_FUNCTION_ORIGIN: z.string().url().optional(),
});

// Nyers process.env vagy import.meta.env adatok
const rawEnv = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_PROJECT_ID: import.meta.env.VITE_SUPABASE_PROJECT_ID,
  VITE_ENV: import.meta.env.VITE_ENV,
  VITE_FEATURE_PHASE5: import.meta.env.VITE_FEATURE_PHASE5,
  VITE_FEATURE_PHASE6: import.meta.env.VITE_FEATURE_PHASE6,
  VITE_FEATURE_PHASE7: import.meta.env.VITE_FEATURE_PHASE7,
  VITE_FEATURE_PHASE8: import.meta.env.VITE_FEATURE_PHASE8,
  VITE_FEATURE_PHASE9: import.meta.env.VITE_FEATURE_PHASE9,
  VITE_API_ORIGIN: import.meta.env.VITE_API_ORIGIN,
  VITE_EDGE_FUNCTION_ORIGIN: import.meta.env.VITE_EDGE_FUNCTION_ORIGIN,
};

const parsedEnv = envSchema.safeParse(rawEnv);

if (!parsedEnv.success) {
  console.error("❌ Érvénytelen környezeti változók:", parsedEnv.error.flatten().fieldErrors);
  // Development módban dobunk hibát, productionben megpróbálunk továbbmenni (vagy logolni)
  if (import.meta.env.DEV) {
    throw new Error("Hibás .env konfiguráció. Ellenőrizd a konzolt a részletekért.");
  }
}

// Ha hiba van, akkor is visszaadunk egy üres objektumot type castinggal, hogy ne omoljon össze azonnal az app buildje,
// de runtime hibát fog dobni a kritikus helyeken.
export const env = parsedEnv.success ? parsedEnv.data : (rawEnv as any);

export const phaseFlags = {
  phase5: env.VITE_FEATURE_PHASE5,
  phase6: env.VITE_FEATURE_PHASE6,
  phase7: env.VITE_FEATURE_PHASE7,
  phase8: env.VITE_FEATURE_PHASE8,
  phase9: env.VITE_FEATURE_PHASE9,
};

export default env;
