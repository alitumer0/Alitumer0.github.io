import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "euRvDqWQWf9GgETa6";
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_qqvxwzk";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_xcy6kkv";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export async function sendContactMail(payload: ContactPayload) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name: payload.name,
      from_email: payload.email,
      reply_to: payload.email,
      message: payload.message,
      to_name: "Ali Eren Tumer"
    },
    {
      publicKey: EMAILJS_PUBLIC_KEY
    }
  );
}
