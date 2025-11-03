import { useState } from "react";
import { BusinessCardData } from "./BusinessCardForm";
import { MinimalCard } from "./templates/MinimalCard";
import { ModernCard } from "./templates/ModernCard";
import { ElegantCard } from "./templates/ElegantCard";
import { BoldCard } from "./templates/BoldCard";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  data: BusinessCardData;
  selectedFont?: string;
  fontSize?: number;
  textColor?: string;
  accentColor?: string;
}

const templates = [
  { id: "minimal", name: "Minimal", component: MinimalCard },
  { id: "modern", name: "Modern", component: ModernCard },
  { id: "elegant", name: "Elegant", component: ElegantCard },
  { id: "bold", name: "Bold", component: BoldCard },
];

export const TemplateSelector = ({
  data,
  selectedFont = "Arial, sans-serif",
  fontSize = 16,
  textColor = "#000000",
  accentColor = "#0ea5e9"
}: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");

  const SelectedComponent = templates.find((t) => t.id === selectedTemplate)?.component || MinimalCard;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border animate-fade-in [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Preview</h2>
        <div className="bg-gradient-to-br from-muted to-background p-8 rounded-lg">
          <div className="max-w-md mx-auto">
            <SelectedComponent
              data={data}
              fontFamily={selectedFont}
              fontSize={fontSize}
              textColor={textColor}
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border animate-fade-in [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Choose Template</h2>
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => {
            const Component = template.component;
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`relative rounded-lg overflow-hidden transition-all duration-300 border-2 transform hover:scale-105 ${
                  selectedTemplate === template.id
                    ? "border-primary shadow-[var(--shadow-hover)] scale-105"
                    : "border-border hover:border-primary/50 hover:shadow-[var(--shadow-card)]"
                }`}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <div className="pointer-events-none transform scale-75 origin-top-left">
                  <Component
                    data={data}
                    fontFamily={selectedFont}
                    fontSize={fontSize}
                    textColor={textColor}
                    accentColor={accentColor}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white font-medium text-sm">{template.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
