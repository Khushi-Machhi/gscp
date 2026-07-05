import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const DebugCategories = () => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const restResultKey = "rawRest";
  const [raw, setRaw] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await supabase.from("categories").select("*").order("created_at", { ascending: false });
        if (res.error) throw res.error;
        setData(res.data ?? null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    // also perform a raw fetch to the REST endpoint so we can see status and body
    const rawFetch = async () => {
      try {
        const urlBase = (import.meta.env.VITE_SUPABASE_URL as string) || (import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string) || "";
        const anon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || (import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string) || "";
        if (!urlBase) {
          setRaw({ error: "No VITE_SUPABASE_URL configured" });
          return;
        }
        const url = `${urlBase.replace(/\/$/, "")}/rest/v1/categories?select=*&order=created_at.desc`;
        const resp = await fetch(url, {
          method: "GET",
          headers: {
            apikey: anon,
            Authorization: `Bearer ${anon}`,
          },
        });
        const text = await resp.text();
        let parsed = null;
        try {
          parsed = JSON.parse(text);
        } catch (e) {
          parsed = text;
        }
        setRaw({ status: resp.status, statusText: resp.statusText, body: parsed });
      } catch (err) {
        setRaw({ error: String(err) });
      }
    };
    rawFetch();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Debug: categories</h2>
      {loading && <div>Loading via supabase-js...</div>}
      {error && (
        <div style={{ color: "red" }}>
          <h3>supabase-js Error</h3>
          <pre>{String(error?.message ?? error)}</pre>
        </div>
      )}
      {data && (
        <div>
          <h3>Rows (via supabase-js)</h3>
          <pre style={{ maxHeight: 400, overflow: "auto" }}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <h3>Raw REST attempt</h3>
        {raw ? (
          <pre style={{ maxHeight: 400, overflow: "auto" }}>{JSON.stringify(raw, null, 2)}</pre>
        ) : (
          <div>Loading raw fetch...</div>
        )}
      </div>
    </div>
  );
};

export default DebugCategories;
