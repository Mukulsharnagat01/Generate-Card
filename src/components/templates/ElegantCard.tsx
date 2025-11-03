import { QRCodeSVG } from "qrcode.react";
import { BusinessCardData } from "../BusinessCardForm";

interface ElegantCardProps {
  data: BusinessCardData;
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  accentColor?: string;
}

export const ElegantCard = ({ data, fontFamily = "Arial, sans-serif", fontSize, textColor = "#ffffff", accentColor = "#0ea5e9" }: ElegantCardProps) => {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${data.name}
TITLE:${data.title}
ORG:${data.company}
EMAIL:${data.email}
TEL:${data.phone}
URL:${data.website}
ADR:${data.address}
END:VCARD`;

  return (
    <div
      className="w-full aspect-[1.75/1] bg-gray-900 rounded-lg p-8 flex flex-col justify-between relative overflow-hidden shadow-lg"
      style={{ fontFamily, fontSize: fontSize ? `${fontSize}px` : '16px' }}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>

      <div className="relative z-10 pl-6">
        <h3 className="text-2xl font-bold mb-2 tracking-tight" style={{ color: textColor }}>{data.name || "Your Name"}</h3>
        <div className="h-px w-16 mb-2" style={{ backgroundColor: accentColor }}></div>
        <p className="text-sm mb-1 opacity-80" style={{ color: textColor }}>{data.title || "Job Title"}</p>
        <p className="text-xs opacity-60" style={{ color: textColor }}>{data.company || "Company Name"}</p>
      </div>

      <div className="flex justify-between items-end relative z-10 pl-6">
        <div className="space-y-1 text-xs opacity-80" style={{ color: textColor }}>
          {data.email && <div>{data.email}</div>}
          {data.phone && <div>{data.phone}</div>}
          {data.website && <div>{data.website}</div>}
        </div>

        {data.name && data.email && (
          <div className="bg-white p-2 rounded">
            <QRCodeSVG value={vCardData} size={60} />
          </div>
        )}
      </div>
    </div>
  );
};
