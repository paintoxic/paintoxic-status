import type { APIRoute } from "astro";
import { buildStatusApi } from "../../lib/api.ts";
import type { Snapshot } from "../../lib/types.ts";
import snapshot from "../../data/snapshot.json";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(buildStatusApi(snapshot as Snapshot, new Date().toISOString().slice(0, 10)), null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
