import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Enquiry intake.
 *
 * Every submission is appended to `data/enquiries.jsonl` so nothing is lost even
 * before delivery is wired up. If ENQUIRY_WEBHOOK_URL is set (Zapier, Make,
 * Formspree, a Google Apps Script, an internal endpoint — anything that accepts
 * JSON), the enquiry is also forwarded there so it reaches a human inbox.
 */

export const runtime = "nodejs";

const MAX_FIELD = 4000;

type Enquiry = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
};

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export async function POST(request: Request) {
  let raw: Record<string, unknown>;

  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields, humans do not. Accept silently so the
  // bot does not learn it was rejected.
  if (clean(raw.website) !== "") {
    return NextResponse.json({ ok: true });
  }

  const enquiry: Enquiry = {
    name: clean(raw.name),
    companyName: clean(raw.companyName),
    email: clean(raw.email),
    phone: clean(raw.phone),
    product: clean(raw.product),
    quantity: clean(raw.quantity),
    message: clean(raw.message),
  };

  if (!enquiry.name || !enquiry.companyName || !enquiry.message) {
    return NextResponse.json(
      { ok: false, error: "Name, company and requirement are required." },
      { status: 400 },
    );
  }

  if (!isEmail(enquiry.email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const record = { ...enquiry, receivedAt: new Date().toISOString() };

  // 1. Always persist locally so an enquiry is never dropped.
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "enquiries.jsonl"), JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    console.error("[enquiry] could not write to disk:", err);
  }

  // 2. Forward onward if a webhook is configured.
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        console.error("[enquiry] webhook responded", res.status);
      }
    } catch (err) {
      console.error("[enquiry] webhook failed:", err);
    }
  } else {
    console.warn(
      "[enquiry] ENQUIRY_WEBHOOK_URL is not set — enquiry stored to data/enquiries.jsonl only.",
    );
  }

  return NextResponse.json({ ok: true });
}
