import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, ShoppingBag, X, Mail, Phone, Globe, MapPin } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, remove, total } = useCart();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  // Function to generate a dynamic back side preview if image is not available
  const renderBackSidePreview = (item: any) => {
    // If image URL exists, use it
    if (item.backImageUrl) {
      return (
        <img
          src={item.backImageUrl}
          alt="Back of Business Card"
          className="w-full h-full object-cover"
          onError={(e) => {
            // If image fails to load, show dynamic preview
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const dynamicPreview = document.createElement('div');
              dynamicPreview.className = "w-full h-full flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-50 to-blue-50";
              dynamicPreview.innerHTML = renderDynamicBackPreview(item);
              parent.appendChild(dynamicPreview);
            }
          }}
        />
      );
    }

    // If no image URL, show dynamic preview directly
    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-50 to-blue-50">
        {renderDynamicBackPreview(item)}
      </div>
    );
  };

  // Function to render dynamic back preview content
  const renderDynamicBackPreview = (item: any) => {
    const hasContactInfo = item.data?.email || item.data?.phone || item.data?.website || item.data?.address;
    
    return `
      <div class="text-center w-full">
        <div class="text-gray-500 text-xs font-medium mb-3">BACK SIDE PREVIEW</div>
        
        ${hasContactInfo ? `
          <div class="space-y-2 text-left max-w-full">
            ${item.data?.email ? `
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 flex items-center justify-center text-blue-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span class="text-gray-700 text-[10px] truncate">${item.data.email}</span>
              </div>
            ` : ''}
            
            ${item.data?.phone ? `
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 flex items-center justify-center text-blue-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span class="text-gray-700 text-[10px]">${item.data.phone}</span>
              </div>
            ` : ''}
            
            ${item.data?.website ? `
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 flex items-center justify-center text-blue-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                  </svg>
                </div>
                <span class="text-gray-700 text-[10px] truncate">${item.data.website}</span>
              </div>
            ` : ''}
            
            ${item.data?.address ? `
              <div class="flex items-center gap-2">
                <div class="w-5 h-5 flex items-center justify-center text-blue-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span class="text-gray-700 text-[10px] truncate">${item.data.address}</span>
              </div>
            ` : ''}
          </div>
          
          <!-- QR Code Placeholder -->
          <div class="mt-4 flex justify-center">
            <div class="w-16 h-16 bg-white border border-gray-300 rounded flex items-center justify-center">
              <div class="text-[8px] text-center text-gray-500">
                QR<br/>CODE
              </div>
            </div>
          </div>
        ` : `
          <div class="text-gray-500 text-[10px] text-center">
            Contact information<br/>
            will appear here
          </div>
          <div class="mt-3 w-12 h-12 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
            <div class="text-[8px] text-center text-gray-500">
              QR
            </div>
          </div>
        `}
      </div>
    `;
  };

  return (
    <>
      {/* Header - Same as before */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <h1
              className="text-2xl lg:text-4xl font-bold text-blue-700 cursor-pointer select-none"
              onClick={() => navigate("/")}
            >
              Businesscard
            </h1>

            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-10">
              <div className="flex items-center bg-gray-100 rounded-lg px-5 py-3 w-full">
                <Search className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 w-full"
                />
              </div>
            </div>

            {/* Desktop Progress Bar */}
            <div className="hidden lg:flex items-center gap-8 text-xs font-medium">
              {["Cart", "Address", "Payment", "Summary"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {i + 1}
                  </div>
                  <span className={i === 0 ? "text-blue-600 font-semibold" : "text-gray-600"}>
                    {step}
                  </span>
                  {i < 3 && <div className="w-12 h-px bg-gray-300" />}
                </div>
              ))}
            </div>

            {/* Mobile Search + Cart */}
            <div className="flex items-center gap-4">
              <button onClick={() => setSearchOpen(!searchOpen)} className="lg:hidden">
                <Search className="w-6 h-6 text-gray-700" />
              </button>
              <div className="relative">
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {items.length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Dropdown */}
          {searchOpen && (
            <div className="lg:hidden border-t bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 outline-none"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          )}

          {/* MOBILE PROGRESS BAR */}
          <div className="lg:hidden border-t bg-gray-50">
            <div className="px-4 py-4">
              <div className="flex items-center justify-center gap-3 text-xs font-medium">
                {/* Step 1 - Cart (Active) */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-600 font-semibold">Cart</span>
                </div>

                <div className="w-10 h-px bg-gray-300"></div>

                {/* Step 2 */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <span className="text-gray-500">Address</span>
                </div>

                <div className="w-10 h-px bg-gray-300"></div>

                {/* Step 3 */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <span className="text-gray-500">Payment</span>
                </div>

                <div className="w-10 h-px bg-gray-300"></div>

                {/* Step 4 */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                  <span className="text-gray-500">Summary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Empty Cart */}
          {items.length === 0 ? (
            <div className="text-center py-20 lg:py-32">
              <div className="mb-10">
                <div className="inline-block p-12 bg-white rounded-3xl shadow-lg">
                  <ShoppingBag className="w-24 h-24 lg:w-32 lg:h-32 text-gray-300" />
                </div>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                Your cart is empty!
              </h2>
              <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added anything yet.</p>
              <Button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items - Left Side */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                    My Cart ({items.length} {items.length > 1 ? "Items" : "Item"})
                  </h2>

                  <div className="space-y-6">
                    {items.map((item) => {
                      // Check if this is edited layout
                      const isEditedLayout = item.frontData?.isEditLayout || item.backData?.isEditLayout;

                      // Check for customizations
                      const hasCustomFont = item.selectedFont !== "Inter, Arial, sans-serif";
                      const hasCustomSize = item.fontSize !== 16;
                      const hasCustomTextColor = item.textColor !== "#000000";
                      const hasCustomAccentColor = item.accentColor !== "#0ea5e9";
                      const hasCustomizations = hasCustomFont || hasCustomSize || hasCustomTextColor || hasCustomAccentColor || isEditedLayout;

                      return (
                        <div
                          key={item.id}
                          className="bg-gray-50/50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="p-5 lg:p-6">
                            <div className="space-y-4">
                              {/* Card Preview - Using Generated Images */}
                              <div className="flex flex-col gap-2 w-full lg:w-auto">
                                <div className="flex gap-3">
                                  {/* Front Side Preview - Using Image URL */}
                                  <div className="flex-1 lg:w-64 bg-white rounded-lg overflow-hidden shadow-md relative aspect-[1.75/1]">
                                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded z-10">Front</div>
                                    {item.frontImageUrl ? (
                                      <img
                                        src={item.frontImageUrl}
                                        alt="Front of Business Card"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          // Fallback if image fails to load
                                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/560x320/f3f4f6/000000?text=${encodeURIComponent(item.data?.name || 'Card Front')}`;
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 p-4">
                                        <div className="text-gray-500 text-sm mb-2">Front Preview</div>
                                        <div className="text-xs text-center">
                                          <div className="font-bold text-gray-800">{item.data?.name || 'Your Name'}</div>
                                          <div className="text-blue-600">{item.data?.title || 'Job Title'}</div>
                                          <div className="text-gray-600">{item.data?.company || 'Company'}</div>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Back Side Preview - Fixed */}
                                  <div className="flex-1 lg:w-64 bg-white rounded-lg overflow-hidden shadow-md relative aspect-[1.75/1]">
                                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded z-10">Back</div>
                                    {item.backImageUrl ? (
                                      <img
                                        src={item.backImageUrl}
                                        alt="Back of Business Card"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          // If image fails to load, create a dynamic preview
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                          
                                          // Create dynamic preview container
                                          const previewDiv = document.createElement('div');
                                          previewDiv.className = "w-full h-full flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-50 to-blue-50";
                                          
                                          // Add contact information
                                          const hasContactInfo = item.data?.email || item.data?.phone || item.data?.website || item.data?.address;
                                          
                                          previewDiv.innerHTML = `
                                            <div class="text-center w-full">
                                              <div class="text-gray-500 text-xs font-medium mb-3">BACK SIDE PREVIEW</div>
                                              
                                              ${hasContactInfo ? `
                                                <div class="space-y-2 text-left max-w-full">
                                                  ${item.data?.email ? `
                                                    <div class="flex items-center gap-2">
                                                      <div class="w-4 h-4 flex items-center justify-center text-blue-600">
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                          <polyline points="22,6 12,13 2,6"></polyline>
                                                        </svg>
                                                      </div>
                                                      <span class="text-gray-700 text-[9px] truncate">${item.data.email}</span>
                                                    </div>
                                                  ` : ''}
                                                  
                                                  ${item.data?.phone ? `
                                                    <div class="flex items-center gap-2">
                                                      <div class="w-4 h-4 flex items-center justify-center text-blue-600">
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                        </svg>
                                                      </div>
                                                      <span class="text-gray-700 text-[9px]">${item.data.phone}</span>
                                                    </div>
                                                  ` : ''}
                                                  
                                                  ${item.data?.website ? `
                                                    <div class="flex items-center gap-2">
                                                      <div class="w-4 h-4 flex items-center justify-center text-blue-600">
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                          <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                                                        </svg>
                                                      </div>
                                                      <span class="text-gray-700 text-[9px] truncate">${item.data.website}</span>
                                                    </div>
                                                  ` : ''}
                                                  
                                                  ${item.data?.address ? `
                                                    <div class="flex items-center gap-2">
                                                      <div class="w-4 h-4 flex items-center justify-center text-blue-600">
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                                                          <circle cx="12" cy="10" r="3"></circle>
                                                        </svg>
                                                      </div>
                                                      <span class="text-gray-700 text-[9px] truncate">${item.data.address}</span>
                                                    </div>
                                                  ` : ''}
                                                </div>
                                                
                                                <!-- QR Code Placeholder -->
                                                <div class="mt-3 flex justify-center">
                                                  <div class="w-12 h-12 bg-white border border-gray-300 rounded flex items-center justify-center">
                                                    <div class="text-[7px] text-center text-gray-500">
                                                      QR<br/>CODE
                                                    </div>
                                                  </div>
                                                </div>
                                              ` : `
                                                <div class="text-gray-500 text-[9px] text-center">
                                                  Contact information<br/>
                                                  will appear here
                                                </div>
                                                <div class="mt-2 w-10 h-10 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
                                                  <div class="text-[7px] text-center text-gray-500">
                                                    QR
                                                  </div>
                                                </div>
                                              `}
                                            </div>
                                          `;
                                          
                                          target.parentElement?.appendChild(previewDiv);
                                        }}
                                      />
                                    ) : (
                                      // If no image URL, show detailed back side preview directly
                                      <div className="w-full h-full flex flex-col justify-center items-center p-3 bg-gradient-to-br from-gray-50 to-blue-50">
                                        <div className="text-center w-full">
                                          <div className="text-gray-500 text-xs font-medium mb-2">BACK SIDE</div>
                                          
                                          {(item.data?.email || item.data?.phone || item.data?.website || item.data?.address) ? (
                                            <>
                                              <div className="space-y-1.5 text-left max-w-full">
                                                {item.data?.email && (
                                                  <div className="flex items-center gap-1.5">
                                                    <Mail className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                                    <span className="text-gray-700 text-[9px] truncate">{item.data.email}</span>
                                                  </div>
                                                )}
                                                
                                                {item.data?.phone && (
                                                  <div className="flex items-center gap-1.5">
                                                    <Phone className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                                    <span className="text-gray-700 text-[9px]">{item.data.phone}</span>
                                                  </div>
                                                )}
                                                
                                                {item.data?.website && (
                                                  <div className="flex items-center gap-1.5">
                                                    <Globe className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                                    <span className="text-gray-700 text-[9px] truncate">{item.data.website}</span>
                                                  </div>
                                                )}
                                                
                                                {item.data?.address && (
                                                  <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-3 h-3 text-blue-600 flex-shrink-0" />
                                                    <span className="text-gray-700 text-[9px] truncate">{item.data.address}</span>
                                                  </div>
                                                )}
                                              </div>
                                              
                                              {/* QR Code Placeholder */}
                                              <div className="mt-2 flex justify-center">
                                                <div className="w-10 h-10 bg-white border border-gray-300 rounded flex items-center justify-center">
                                                  <div className="text-[7px] text-center text-gray-500">
                                                    QR<br/>CODE
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              <div className="text-gray-500 text-[9px] text-center mb-2">
                                                Contact information<br/>
                                                will appear here
                                              </div>
                                              <div className="w-10 h-10 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
                                                <div className="text-[7px] text-center text-gray-500">
                                                  QR
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Item Details */}
                              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-2 border-t border-dashed border-gray-200">
                                <div className="space-y-2 text-sm text-gray-600">
                                  {/* Show "Edited Design" if any customization is applied */}
                                  {hasCustomizations ? (
                                    <span className="text-xs uppercase tracking-wide text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-full">
                                      ✓ Edited Design
                                    </span>
                                  ) : (
                                    <span className="text-xs uppercase tracking-wide text-gray-600 font-semibold bg-gray-100 px-2 py-1 rounded-full">
                                      Standard Design
                                    </span>
                                  )}

                                  <h3 className="text-xl font-semibold text-gray-900">
                                    {item.serverMeta?.name || "Business Card"}
                                  </h3>

                                  <div className="space-y-1">
                                    <p>Card Type: <span className="font-medium">{item.data?.cardType || "Standard"}</span></p>
                                    <p>Paper: <span className="font-medium">{item.data?.paperType || "300 GSM Matte"}</span></p>

                                    {/* Show customization details */}
                                    {hasCustomizations && (
                                      <div className="pt-2 border-t border-gray-100">
                                        <p className="text-xs font-medium text-gray-700">Customizations:</p>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                          {hasCustomFont && (
                                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                                              Font: {item.selectedFont?.split(',')[0]?.trim()}
                                            </span>
                                          )}
                                          {hasCustomSize && (
                                            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">
                                              Size: {item.fontSize}px
                                            </span>
                                          )}
                                          {hasCustomTextColor && (
                                            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">
                                              <div className="flex items-center gap-1">
                                                <span>Text:</span>
                                                <div
                                                  className="w-3 h-3 rounded-full border border-gray-300"
                                                  style={{ backgroundColor: item.textColor }}
                                                />
                                              </div>
                                            </span>
                                          )}
                                          {hasCustomAccentColor && (
                                            <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-100">
                                              <div className="flex items-center gap-1">
                                                <span>Accent:</span>
                                                <div
                                                  className="w-3 h-3 rounded-full border border-gray-300"
                                                  style={{ backgroundColor: item.accentColor }}
                                                />
                                              </div>
                                            </span>
                                          )}
                                          {isEditedLayout && (
                                            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100">
                                              Layout Edited
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 w-full lg:w-auto">
                                  <div className="text-3xl font-bold text-gray-900">
                                    ₹{item.price.toFixed(0)}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(item.id)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full h-12 w-12"
                                  >
                                    <X className="w-6 h-6" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Price Summary - Right Side */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-800 mb-5">Order Summary</h2>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total MRP</span>
                      <span className="font-medium">₹{(total * 2).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount (20%)</span>
                      <span className="text-green-600 font-medium">-₹{(total * 0.2).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charges</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>

                    <div className="border-t-2 border-dashed pt-4 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-2xl text-blue-600">₹{total.toFixed(0)}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm font-medium text-center">
                      You saved ₹{(total * 0.2).toFixed(0)} on this order!
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate("/checkout")}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-7 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Proceed to Checkout
                  </Button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Secure checkout • No payment charged yet
                  </p>

                  <div className="mt-6 pt-6 border-t text-center">
                    <p className="text-sm font-medium text-gray-700 flex items-center justify-center gap-2">
                      <span className="text-green-600">🔒</span>
                      100% Safe & Secure Payments
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}