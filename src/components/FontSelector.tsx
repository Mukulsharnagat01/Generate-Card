import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Type } from "lucide-react";

interface FontSelectorProps {
  selectedFont: string;
  onFontSelect: (font: string) => void;
}

const fonts = [
  { name: "Arial", family: "Arial, sans-serif" },
  { name: "Helvetica", family: "Helvetica, sans-serif" },
  { name: "Times New Roman", family: "Times New Roman, serif" },
  { name: "Georgia", family: "Georgia, serif" },
  { name: "Verdana", family: "Verdana, sans-serif" },
  { name: "Courier New", family: "Courier New, monospace" },
  { name: "Trebuchet MS", family: "Trebuchet MS, sans-serif" },
  { name: "Impact", family: "Impact, sans-serif" },
];

export const FontSelector = ({ selectedFont, onFontSelect }: FontSelectorProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Type className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Choose Font</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {fonts.map((font) => (
          <button
            key={font.name}
            onClick={() => onFontSelect(font.family)}
            className={`relative p-3 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedFont === font.family
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            {selectedFont === font.family && (
              <div className="absolute top-2 right-2">
                <Check className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className="text-sm font-medium mb-1"
              style={{ fontFamily: font.family }}
            >
              {font.name}
            </div>
            <div
              className="text-xs text-muted-foreground"
              style={{ fontFamily: font.family }}
            >
              The quick brown fox
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
