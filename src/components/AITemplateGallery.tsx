import { useState, useEffect } from "react";
import { BusinessCardData } from "./BusinessCardForm";
import { DynamicCard } from "./templates/DynamicCard";
import { Button } from "./ui/button";
import { Loader2, Sparkles, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateDesigns } from "@/services/designService";

interface AITemplateGalleryProps {
  data: BusinessCardData;
  onSelectTemplate: (designConfig: any) => void;
  selectedDesignId?: string;
}

export const AITemplateGallery = ({ data, onSelectTemplate, selectedDesignId }: AITemplateGalleryProps) => {
  const [designs, setDesigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

    const requestDesigns = async (count: number = 100) => {
    setIsLoading(true);
    try {
      const designs = await generateDesigns(count, data);
      
      // Process and validate the designs
      if (!Array.isArray(designs)) {
        throw new Error('Invalid response format from AI service');
      }

      const processedDesigns = designs.map((design: any, index: number) => ({
        id: design.id || `design-${index}`,
        name: design.name || `Design ${index + 1}`,
        bgStyle: design.bgStyle || 'gradient',
        bgColors: Array.isArray(design.bgColors) ? design.bgColors : ['#ffffff', '#f0f0f0'],
        textColor: design.textColor || '#000000',
        accentColor: design.accentColor || '#0ea5e9',
        layout: design.layout || 'centered',
        decoration: design.decoration || 'none',
        fontWeight: design.fontWeight || 'normal',
        fontFamily: design.fontFamily || 'Arial',
        borderStyle: design.borderStyle || 'none'
      }));

      setDesigns(processedDesigns);

      toast({
        title: "Success!",
        description: `Generated ${processedDesigns.length} unique business card designs`,
      });
    } catch (error: any) {
      console.error('Error generating designs:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate designs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestDesigns(100);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          AI-Generated Templates
        </h2>
        <Button
          onClick={() => requestDesigns(100)}
          disabled={isLoading}
          variant="outline"
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Regenerate
            </>
          )}
        </Button>
      </div>

      {isLoading && designs.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="aspect-[1.75/1] bg-muted rounded-lg animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {designs.map((design, index) => (
            <button
              key={design.id}
              onClick={() => onSelectTemplate(design)}
              className={`relative rounded-lg overflow-hidden transition-all border-2 group hover:scale-105 animate-fade-in ${
                selectedDesignId === design.id
                  ? "border-primary shadow-[var(--shadow-hover)] scale-105"
                  : "border-border hover:border-primary/50 hover:shadow-[var(--shadow-card)]"
              }`}
              style={{
                animationDelay: `${index * 0.05}s`,
                animationFillMode: "backwards",
              }}
            >
              {selectedDesignId === design.id && (
                <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1 animate-scale-in">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="transform scale-[0.45] origin-top-left pointer-events-none">
                <DynamicCard data={data} designConfig={design} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-medium text-xs truncate">{design.name}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
