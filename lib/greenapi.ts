/**
 * Green API WhatsApp auto-reply config.
 *
 * Each WhatsApp number that should auto-reply is a separate Green API
 * "instance" (idInstance + apiTokenInstance). The webhook route uses the
 * `[contact]` path segment to pick which instance to reply with.
 */

export type ContactKey = "rsm" | "scm" | "gdn";

interface ContactConfig {
  name: string;
  idInstance: string | undefined;
  apiToken: string | undefined;
}

export const CONTACTS: Record<ContactKey, ContactConfig> = {
  rsm: {
    name: "Rodolfo Sandoval Monroy",
    idInstance: process.env.GREENAPI_ID_RSM,
    apiToken: process.env.GREENAPI_TOKEN_RSM,
  },
  scm: {
    name: "Sylvi Cruz Monroy",
    idInstance: process.env.GREENAPI_ID_SCM,
    apiToken: process.env.GREENAPI_TOKEN_SCM,
  },
  gdn: {
    name: "Gilberto Davalos Nava",
    idInstance: process.env.GREENAPI_ID_GDN,
    apiToken: process.env.GREENAPI_TOKEN_GDN,
  },
};

export function isContactKey(value: string): value is ContactKey {
  return value === "rsm" || value === "scm" || value === "gdn";
}

export function isConfigured(c: ContactConfig): c is ContactConfig & {
  idInstance: string;
  apiToken: string;
} {
  return Boolean(c.idInstance && c.apiToken);
}

/** Green API host is derived from the first 4 digits of the instance id. */
function instanceUrl(idInstance: string, apiToken: string, method: string) {
  const prefix = idInstance.slice(0, 4);
  return `https://${prefix}.api.greenapi.com/waInstance${idInstance}/${method}/${apiToken}`;
}

/** Interactive button message sent as the automatic reply. */
function buildButtonsPayload(chatId: string) {
  return {
    chatId,
    body: "Es un gusto estar a tus órdenes",
    buttons: [
      {
        type: "url",
        buttonId: "catalogo_btn",
        buttonText: "📦 Catálogo",
        url: "https://catalogo-intelite.vercel.app/",
      },
      {
        type: "url",
        buttonId: "web_btn",
        buttonText: "🌐 El Medio de Medios",
        url: "https://www.elmediodemedios.com/",
      },
    ],
  };
}

/** Send the interactive button reply via Green API. Returns true on success. */
export async function sendButtons(
  idInstance: string,
  apiToken: string,
  chatId: string,
): Promise<boolean> {
  const res = await fetch(
    instanceUrl(idInstance, apiToken, "sendInteractiveButtons"),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildButtonsPayload(chatId)),
    },
  );

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[greenapi] send failed ${res.status}: ${detail}`);
    return false;
  }
  return true;
}

/** Keyword that triggers the auto-reply (accent/case-insensitive substring). */
const TRIGGER_KEYWORD = "intelite";

/** True if the incoming message text contains the trigger keyword. */
export function matchesKeyword(text: string): boolean {
  const normalized = text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
  return normalized.includes(TRIGGER_KEYWORD);
}
