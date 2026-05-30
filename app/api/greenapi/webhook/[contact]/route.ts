import { NextRequest, NextResponse } from "next/server";
import {
  CONTACTS,
  isContactKey,
  isConfigured,
  alreadyGreeted,
  sendButtons,
} from "@/lib/greenapi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Green API webhook. One instance (WhatsApp number) per `contact` segment.
 * Set each instance's webhook (SetSettings: incomingWebhook=yes) pointing to:
 *   https://<domain>/api/greenapi/webhook/<rsm|scm|gdn>
 * and set webhookUrlToken = GREENAPI_WEBHOOK_SECRET (sent as Bearer token).
 *
 * On the first inbound message from a contact, replies with interactive buttons.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ contact: string }> },
) {
  const { contact } = await params;

  if (!isContactKey(contact)) {
    return NextResponse.json({ error: "unknown contact" }, { status: 404 });
  }

  // Shared-secret check. Green API sends webhookUrlToken as "Authorization:
  // Bearer <token>"; also accept ?key= / x-webhook-secret for manual testing.
  const secret = process.env.GREENAPI_WEBHOOK_SECRET;
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const provided =
    bearer ??
    req.nextUrl.searchParams.get("key") ??
    req.headers.get("x-webhook-secret");
  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const config = CONTACTS[contact];
  if (!isConfigured(config)) {
    console.error(`[greenapi] missing instance config for "${contact}"`);
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  try {
    const chatId = extractInboundChatId(body);
    if (
      chatId &&
      !(await alreadyGreeted(config.idInstance, config.apiToken, chatId))
    ) {
      await sendButtons(config.idInstance, config.apiToken, chatId);
    }
  } catch (err) {
    console.error("[greenapi] error handling message", err);
  }

  return NextResponse.json({ ok: true });
}

/**
 * Return the sender chatId for an inbound 1:1 message, or null otherwise.
 * Green API delivers an incoming message as:
 *   { typeWebhook: "incomingMessageReceived",
 *     senderData: { chatId: "5215545641120@c.us", ... }, ... }
 */
function extractInboundChatId(body: unknown): string | null {
  const b = body as {
    typeWebhook?: string;
    senderData?: { chatId?: string };
  };
  if (b?.typeWebhook !== "incomingMessageReceived") return null;
  const chatId = b.senderData?.chatId;
  if (typeof chatId !== "string") return null;
  if (chatId.endsWith("@g.us")) return null; // ignore group chats
  return chatId;
}
