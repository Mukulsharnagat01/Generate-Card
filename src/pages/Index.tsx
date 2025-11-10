import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { BusinessCardForm, BusinessCardData } from "@/components/BusinessCardForm";
import { TemplateSelector } from "@/components/TemplateSelector";
import { AITemplateGallery } from "@/components/AITemplateGallery";
import { FontSelector } from "@/components/FontSelector";
import { CustomizationPanel } from "@/components/CustomizationPanel";
import { DynamicCard } from "@/components/templates/DynamicCard";
import { BackSideCard } from "@/components/templates/BackSideCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";
import { downloadAsImage } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [businessData, setBusinessData] = useState<BusinessCardData>({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    logo: "",
  });

  const [selectedDesign, setSelectedDesign] = useState<any>(null);
  const [selectedFont, setSelectedFont] = useState<string>("Arial, sans-serif");
  const [fontSize, setFontSize] = useState<number>(16);
  const [textColor, setTextColor] = useState<string>("#000000");
  const [accentColor, setAccentColor] = useState<string>("#0ea5e9");
  const cardRef = useRef<HTMLDivElement>(null);
  const [showBack, setShowBack] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold">Business Card Creator</Link>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {profile?.role === "admin" && (
                  <Link to="/admin/templates" className="border rounded px-3 py-1">Admin</Link>
                )}
                <button
                  onClick={async () => {
                    await signOut();
                    navigate("/");
                  }}
                  className="border rounded px-3 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <Link to="/login" className="border rounded px-3 py-1 w-full text-center">Login</Link>
                <div className="text-xs text-muted-foreground">
                  Don’t have an account? <Link to="/login?signup=1" className="underline">Sign up</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <Hero />
      
      <main className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <BusinessCardForm data={businessData} onChange={setBusinessData} />
          </div>
          
          <div>
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">Selected Design Preview</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setShowBack((prev) => !prev)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {showBack ? "Show Front" : "Show Back"}
                    </Button>
                    <Button
                      onClick={() => cardRef.current && downloadAsImage(cardRef.current, selectedDesign?.name || "business-card")}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-muted to-background p-8 rounded-lg">
                  <div className="max-w-md mx-auto">
                    <div ref={cardRef}>
                      {selectedDesign ? (
                        (() => {
                          const front = selectedDesign?.front || selectedDesign;
                          return showBack ? (
                            <BackSideCard
                              data={businessData}
                              background={{
                                style: front?.bgStyle || "solid",
                                colors: front?.bgColors || ["#ffffff", "#f0f0f0"],
                              }}
                              textColor={textColor || front?.textColor}
                              accentColor={accentColor || front?.accentColor}
                              fontFamily={selectedFont || front?.fontFamily}
                              fontSize={fontSize}
                              showLargeQR={true}
                            />
                          ) : (
                            <DynamicCard
                              data={businessData}
                              designConfig={{
                                ...(front || {}),
                                fontFamily: selectedFont,
                                fontSize,
                                textColor,
                                accentColor,
                              }}
                            />
                          );
                        })()
                      ) : (
                        <div className="text-center text-sm text-muted-foreground py-12">
                          Select a template from below to start editing.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border animate-fade-in [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
                <CustomizationPanel
                  selectedFont={selectedFont}
                  onFontSelect={setSelectedFont}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  textColor={textColor}
                  onTextColorChange={setTextColor}
                  accentColor={accentColor}
                  onAccentColorChange={setAccentColor}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-in [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="ai" className="gap-2">AI Templates (100+)</TabsTrigger>
              <TabsTrigger value="classic">Classic Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="space-y-6">
              <AITemplateGallery
                data={businessData}
                onSelectTemplate={setSelectedDesign}
                selectedDesignId={selectedDesign?.id}
              />
            </TabsContent>

            <TabsContent value="classic" className="space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-[var(--shadow-card)] border border-border">
                <TemplateSelector
                  data={businessData}
                  selectedFont={selectedFont}
                  fontSize={fontSize}
                  textColor={textColor}
                  accentColor={accentColor}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto max-w-7xl px-4 text-center text-muted-foreground text-sm">
          <p>© 2025 Business Card Creator. Create professional cards with AI-powered designs.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
