export function generateVCard({
  name,
  email,
  phone,
  url,
  title,
}: {
  name: string;
  email: string;
  phone: string;
  url: string;
  title: string;
}) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `TITLE:${title}`,
    `EMAIL;TYPE=INTERNET:${email}`,
    `TEL;TYPE=CELL:${phone}`,
    `URL:${url}`,
    "END:VCARD",
  ].join("\n");
}
