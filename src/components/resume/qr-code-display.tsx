"use client";

import { QRCodeSVG } from "qrcode.react";

export function QRCodeDisplay({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5">
      <QRCodeSVG value={url} size={140} marginSize={0} />
    </div>
  );
}
