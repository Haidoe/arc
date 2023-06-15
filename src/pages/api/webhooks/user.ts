import type { IncomingHttpHeaders } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import { Webhook, type WebhookRequiredHeaders } from "svix";
import { buffer } from "micro";
import { prisma } from "~/server/db";

// Disable the bodyParser so we can access the raw
// request body for verification.
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.SVIX_WEBHOOK_SECRET || "";

export default async function handler(
  req: NextApiRequestWithSvixRequiredHeaders,
  res: NextApiResponse
) {
  // Verify the webhook signature
  // See https://docs.svix.com/receiving/verifying-payloads/how
  const payload = (await buffer(req)).toString();
  const headers = req.headers;
  const wh = new Webhook(webhookSecret);

  let evt: Event | null = null;

  try {
    evt = wh.verify(payload, headers) as Event;
  } catch (_) {
    return res.status(400).json({});
  }

  // Handle the webhook
  const eventType: EventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;

    const email = extractEmail({
      primary_email_address_id: attributes.primary_email_address_id ?? "",
      email_addresses: attributes.email_addresses ?? [],
    } as ClerkRecord);

    await prisma.user.upsert({
      where: {
        externalId: id as string,
      },
      create: {
        externalId: (id as string) ?? "",
        email,
        name: `${attributes.first_name ?? ""} ${attributes.last_name ?? ""}`,
      },
      update: {
        email,
      },
    });
  }

  res.json({});
}

const extractEmail = (record: ClerkRecord): string => {
  const item = record.email_addresses.find(
    (item) => item.id === record.primary_email_address_id
  );

  if (item) return item.email_address;

  return "";
};

type ClerkRecordEmailAddresses = {
  email_address: string;
  id: string;
};

type ClerkRecord = {
  primary_email_address_id: string;
  email_addresses: ClerkRecordEmailAddresses[];
};

type NextApiRequestWithSvixRequiredHeaders = NextApiRequest & {
  headers: IncomingHttpHeaders & WebhookRequiredHeaders;
};

type EventType = "user.created" | "user.updated" | "*";

type Event = {
  data: Record<string, string | number>;
  object: "event";
  type: EventType;
};
