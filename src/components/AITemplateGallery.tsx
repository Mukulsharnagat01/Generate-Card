// // import { useState, useEffect, useRef } from "react";
// // import { BusinessCardData } from "./BusinessCardForm";
// // import { DynamicCard } from "./templates/DynamicCard";
// // import { Button } from "./ui/button";
// // import { Loader2, Sparkles, Check, Download } from "lucide-react";
// // import { useToast } from "@/hooks/use-toast";
// // import { generateDesigns } from "@/services/designService";
// // import { downloadAsImage } from "@/lib/utils";

// // interface TemplateCardProps {
// //   design: any;
// //   index: number;
// //   selectedDesignId?: string;
// //   onSelectTemplate: (designConfig: any) => void;
// //   data: BusinessCardData;
// // }

// // const TemplateCard = ({ design, index, selectedDesignId, onSelectTemplate, data }: TemplateCardProps): JSX.Element => {
// //   const cardRef = useRef<HTMLDivElement>(null);

// //   const handleDownload = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     if (cardRef.current) {
// //       downloadAsImage(cardRef.current, `business-card-${design.id}.png`);
// //     }
// //   };

// //   return (
// //     <div className="relative group cursor-pointer" onClick={() => onSelectTemplate(design)}>
// //       <div ref={cardRef} className="aspect-[1.75/1]">
// //         <DynamicCard data={data} designConfig={design} />
// //       </div>
// //       {selectedDesignId === design.id && (
// //         <>
// //           <div className="absolute top-2 left-2">
// //             <Check className="w-4 h-4 text-green-500 bg-white rounded-full p-1" />
// //           </div>
// //           <div className="absolute top-2 right-2">
// //             <Button size="sm" onClick={handleDownload} variant="secondary">
// //               <Download className="w-4 h-4" />
// //             </Button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // interface AITemplateGalleryProps {
// //   data: BusinessCardData;
// //   onSelectTemplate: (designConfig: any) => void;
// //   selectedDesignId?: string;
// // }

// // export const AITemplateGallery = ({ data, onSelectTemplate, selectedDesignId }: AITemplateGalleryProps) => {
// //   const [designs, setDesigns] = useState<any[]>([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const { toast } = useToast();

// //     const requestDesigns = async (count: number = 100) => {
// //     setIsLoading(true);
// //     try {
// //       const designs = await generateDesigns(count, data);
      
// //       // Process and validate the designs
// //       if (!Array.isArray(designs)) {
// //         throw new Error('Invalid response format from AI service');
// //       }

// //       const processedDesigns = designs.map((design: any, index: number) => ({
// //         id: design.id || `design-${index}`,
// //         name: design.name || `Design ${index + 1}`,
// //         bgStyle: design.bgStyle || 'gradient',
// //         bgColors: Array.isArray(design.bgColors) ? design.bgColors : ['#ffffff', '#f0f0f0'],
// //         textColor: design.textColor || '#000000',
// //         accentColor: design.accentColor || '#0ea5e9',
// //         layout: design.layout || 'centered',
// //         decoration: design.decoration || 'none',
// //         fontWeight: design.fontWeight || 'normal',
// //         fontFamily: design.fontFamily || 'Arial',
// //         borderStyle: design.borderStyle || 'none'
// //       }));

// //       setDesigns(processedDesigns);

// //       toast({
// //         title: "Success!",
// //         description: `Generated ${processedDesigns.length} unique business card designs`,
// //       });
// //     } catch (error: any) {
// //       console.error('Error generating designs:', error);
// //       toast({
// //         variant: "destructive",
// //         title: "Error",
// //         description: error.message || "Failed to generate designs",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     requestDesigns(100);
// //   }, []);

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
// //           <Sparkles className="w-6 h-6 text-primary" />
// //           AI-Generated Templates
// //         </h2>
// //         <Button
// //           onClick={() => requestDesigns(100)}
// //           disabled={isLoading}
// //           variant="outline"
// //           className="gap-2"
// //         >
// //           {isLoading ? (
// //             <>
// //               <Loader2 className="w-4 h-4 animate-spin" />
// //               Generating...
// //             </>
// //           ) : (
// //             <>
// //               <Sparkles className="w-4 h-4" />
// //               Regenerate
// //             </>
// //           )}
// //         </Button>
// //       </div>

// //       {isLoading && designs.length === 0 ? (
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //           {[...Array(12)].map((_, i) => (
// //             <div
// //               key={i}
// //               className="aspect-[1.75/1] bg-muted rounded-lg animate-pulse"
// //               style={{
// //                 animationDelay: `${i * 0.1}s`,
// //               }}
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //           {designs.map((design, index) => (
// //             <TemplateCard
// //               key={design.id}
// //               design={design}
// //               index={index}
// //               selectedDesignId={selectedDesignId}
// //               onSelectTemplate={onSelectTemplate}
// //               data={data}
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };


// // 🔹 Improved: Added dual-side (front + back) template preview support
// import { useState, useEffect } from "react";
// import { BusinessCardData } from "./BusinessCardForm";
// import { DynamicCard } from "./templates/DynamicCard";
// import { BackSideCard } from "./templates/BackSideCard"; // 🆕 Added
// import { Button } from "./ui/button";
// import { Loader2, Sparkles, Check, Download, RotateCcw } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { generateDesigns } from "@/services/designService";
// import { downloadAsImage } from "@/lib/utils";

// interface TemplateCardProps {
//   design: any;
//   index: number;
//   selectedDesignId?: string;
//   onSelectTemplate: (designConfig: any) => void;
//   data: BusinessCardData;
// }

// const TemplateCard = ({
//   design,
//   index,
//   selectedDesignId,
//   onSelectTemplate,
//   data,
// }: TemplateCardProps): JSX.Element => {
//   const [showBack, setShowBack] = useState(false); // 🆕 Added state for toggle
//   const cardId = `card-${design.id}`;

//   return (
//     <div
//       className="relative group cursor-pointer border rounded-lg shadow hover:shadow-xl transition"
//       onClick={() => onSelectTemplate(design)}
//     >
//       <div className="aspect-[1.75/1] overflow-hidden rounded-lg">
//         {/* 🆕 Flip between front and back */}
//         {showBack ? (
//           <BackSideCard
//             data={data}
//             background={design.front}
//             textColor={design.front?.textColor}
//             accentColor={design.front?.accentColor}
//           />
//         ) : (
//           <DynamicCard data={data} designConfig={design.front} />
//         )}
//       </div>

//       {/* 🆕 Back toggle button */}
//       <div className="absolute top-2 left-2">
//         <Button
//           size="sm"
//           variant="outline"
//           onClick={(e) => {
//             e.stopPropagation();
//             setShowBack((prev) => !prev);
//           }}
//         >
//           <RotateCcw className="w-4 h-4" />
//         </Button>
//       </div>

//       {/* ✅ Show checkmark if selected */}
//       {selectedDesignId === design.id && (
//         <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
//           <Check className="w-4 h-4" />
//         </div>
//       )}
//     </div>
//   );
// };

// interface AITemplateGalleryProps {
//   data: BusinessCardData;
//   onSelectTemplate: (designConfig: any) => void;
//   selectedDesignId?: string;
// }

// export const AITemplateGallery = ({
//   data,
//   onSelectTemplate,
//   selectedDesignId,
// }: AITemplateGalleryProps) => {
//   const [designs, setDesigns] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   const requestDesigns = async (count: number = 100) => {
//     setIsLoading(true);
//     try {
//       const result = await generateDesigns(count, data);
//       if (!Array.isArray(result)) throw new Error("Invalid format");

//       // 🆕 Normalize old vs new designs
//       const processed = result.map((d: any, i: number) => ({
//         id: d.id || `design-${i}`,
//         name: d.name || `Design ${i + 1}`,
//         front: d.front || d, // 🆕 ensure front/back compatibility
//         back: d.back || {
//           showEmail: true,
//           showPhone: true,
//           showWebsite: true,
//           showAddress: true,
//           includeQRCode: true,
//         },
//       }));

//       setDesigns(processed);
//       toast({
//         title: "AI Templates Ready!",
//         description: `${processed.length} creative designs generated.`,
//       });
//     } catch (error: any) {
//       console.error(error);
//       toast({
//         variant: "destructive",
//         title: "Generation Failed",
//         description: error.message || "Could not generate templates",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     requestDesigns(50);
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold flex items-center gap-2">
//           <Sparkles className="w-6 h-6 text-primary" /> AI Business Card Designs
//         </h2>
//         <Button onClick={() => requestDesigns(100)} disabled={isLoading} variant="outline">
//           {isLoading ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" /> Generating...
//             </>
//           ) : (
//             <>
//               <Sparkles className="w-4 h-4" /> Regenerate
//             </>
//           )}
//         </Button>
//       </div>

//       {isLoading && designs.length === 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {Array.from({ length: 12 }).map((_, i) => (
//             <div key={i} className="aspect-[1.75/1] bg-muted animate-pulse rounded-lg" />
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {designs.map((design, index) => (
//             <TemplateCard
//               key={design.id}
//               design={design}
//               index={index}
//               selectedDesignId={selectedDesignId}
//               onSelectTemplate={onSelectTemplate}
//               data={data}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };



// 🔹 Improved: Dual-side preview + theme-linked backs + error-proof design rendering

import { useState, useEffect, useRef } from "react";
import { BusinessCardData } from "./BusinessCardForm";
import { DynamicCard } from "./templates/DynamicCard";
import { BackSideCard } from "./templates/BackSideCard"; // 🆕 Added
import { Button } from "./ui/button";
import { Loader2, Sparkles, Check, RotateCcw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateDesigns } from "@/services/designService";
import { downloadAsImage } from "@/lib/utils";

// ✅ Template card — handles each single card front/back toggle
const TemplateCard = ({
  design,
  selectedDesignId,
  onSelectTemplate,
  data,
}: {
  design: any;
  selectedDesignId?: string;
  onSelectTemplate: (designConfig: any) => void;
  data: BusinessCardData;
}) => {
  const [showBack, setShowBack] = useState(false);

  // 🧠 Safety: If design.front missing, use design itself
  const front = design.front || design;

  return (
    <div
      className="relative group cursor-pointer border rounded-xl shadow hover:shadow-xl transition bg-background"
      onClick={() => onSelectTemplate(design)}
    >
      {/* 🆕 Front & Back toggle with matching themes */}
      <div className="aspect-[1.75/1] overflow-hidden rounded-lg">
        {showBack ? (
          <BackSideCard
            data={data}
            background={{
              style: front?.bgStyle,
              colors: front?.bgColors,
            }}
            textColor={front?.textColor}
            accentColor={front?.accentColor}
            fontFamily={front?.fontFamily}
          />
        ) : (
          <DynamicCard data={data} designConfig={front} />
        )}
      </div>

      {/* 🆕 Flip button (doesn't trigger onSelectTemplate) */}
      <div className="absolute top-2 left-2 z-10">
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            setShowBack((prev) => !prev);
          }}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* ✅ Mark selected card */}
      {selectedDesignId === design.id && (
        <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
          <Check className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

// ✅ Main gallery component
export const AITemplateGallery = ({
  data,
  onSelectTemplate,
  selectedDesignId,
}: {
  data: BusinessCardData;
  onSelectTemplate: (designConfig: any) => void;
  selectedDesignId?: string;
}) => {
  const [designs, setDesigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [showBackSelected, setShowBackSelected] = useState(false);
  const selectedRef = useRef<HTMLDivElement>(null);

  const requestDesigns = async (count: number = 100) => {
    setIsLoading(true);
    try {
      const result = await generateDesigns(count, data);

      if (!Array.isArray(result)) throw new Error("Invalid design format");

      // 🧠 Ensure every design has front/back safely
      const processed = result.map((d: any, i: number) => ({
        id: d.id || `design-${i}`,
        name: d.name || `Design ${i + 1}`,
        front: d.front || d,
        back: d.back || {
          showEmail: true,
          showPhone: true,
          showWebsite: true,
          showAddress: true,
          includeQRCode: true,
        },
      }));

      setDesigns(processed);
      toast({
        title: "✅ AI Templates Ready",
        description: `${processed.length} stylish business card designs generated!`,
      });
    } catch (error: any) {
      console.error("Error generating:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate designs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 🧩 Auto-generate once on mount
  useEffect(() => {
    requestDesigns(50);
  }, []);

  return (
    <div className="space-y-6">
      {/* 🔹 Header Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" /> AI Business Card Designs
        </h2>
        <Button
          onClick={() => requestDesigns(100)}
          disabled={isLoading}
          variant="outline"
          className="gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Regenerate
            </>
          )}
        </Button>
      </div>

      {/* 🆕 Selected Design Preview (AI) */}
      {selectedDesignId && designs.length > 0 && (
        (() => {
          const sel = designs.find((d) => d.id === selectedDesignId);
          if (!sel) return null;
          const front = sel.front || sel;
          return (
            <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Selected Design Preview</h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowBackSelected((prev) => !prev)}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {showBackSelected ? "Show Front" : "Show Back"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => selectedRef.current && downloadAsImage(selectedRef.current, sel.name || sel.id)}
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-muted to-background p-6 rounded-lg">
                <div className="max-w-md mx-auto" ref={selectedRef}>
                  {showBackSelected ? (
                    <BackSideCard
                      data={data}
                      background={{ style: front?.bgStyle || "solid", colors: front?.bgColors || ["#ffffff", "#f0f0f0"] }}
                      textColor={front?.textColor}
                      accentColor={front?.accentColor}
                      fontFamily={front?.fontFamily}
                      fontSize={16}
                      showLargeQR={true}
                    />
                  ) : (
                    <DynamicCard data={data} designConfig={front} />
                  )}
                </div>
              </div>
            </div>
          );
        })()
      )}

      {/* 🔹 Loading Skeletons */}
      {isLoading && designs.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[1.75/1] bg-muted rounded-lg animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      ) : (
        // 🔹 Show generated templates
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {designs.map((design, i) => (
            <TemplateCard
              key={design.id}
              design={design}
              selectedDesignId={selectedDesignId}
              onSelectTemplate={onSelectTemplate}
              data={data}
            />
          ))}
        </div>
      )}
    </div>
  );
};
