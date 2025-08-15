import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home, Users, MessageSquare, PenTool, Target, Zap, Info, Menu, ChevronDown, Palette, Grid3X3, Video, Book, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function HeaderNav() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allTools = [
    { label: "다정한 번역기", icon: Heart, href: "https://KindWhisper.replit.app" },
    { label: "테토vs에겐 성향분석", icon: Users, href: "https://teto-vs-egen-hongeunlee.replit.app" },
    { label: "삼행시 만들기", icon: PenTool, href: "https://threelinepoem.replit.app" },
    { label: "만다라트 캔버스", icon: Grid3X3, href: "https://mandalat-canvas.replit.app" },
    { label: "캐치업 미팅 MBTI", icon: Video, href: "https://catchup-meeting.replit.app" },
    { label: "속뜻 번역기", icon: Palette, href: "https://WhatTheyMeant.replit.app" },
    { label: "Tales of Me", icon: Book, href: "https://feeltoon.replit.app" }
  ];



  // 모든 도구 링크에 대해 프리로딩 설정
  useEffect(() => {
    allTools.forEach(tool => {
      // DNS 프리로딩
      const dnsLink = document.createElement('link');
      dnsLink.rel = 'dns-prefetch';
      dnsLink.href = new URL(tool.href).origin;
      document.head.appendChild(dnsLink);
      
      // 프리커넥트
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect'; 
      preconnectLink.href = new URL(tool.href).origin;
      document.head.appendChild(preconnectLink);
    });
  }, []);

  const mainNavItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/about", label: "사이트소개", icon: Info },
    { href: "/contact", label: "Q & A", icon: MessageSquare },
  ];



  return (
    <header className="sticky top-0 z-50 w-full border-b border-clay-200 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <img 
                src="/kindtoolai-logo.png" 
                alt="KINDTOOLAI 로고" 
                className="h-6 w-auto object-contain"
              />
              <span className="text-xl font-bold text-clay-800">KINDTOOLAI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 px-4 py-2 h-10 ${
                      isActive 
                        ? "bg-clay-100 text-clay-800 font-medium" 
                        : "text-clay-600 hover:text-clay-800 hover:bg-clay-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
            
            {/* Tools Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 px-4 py-2 h-10 text-clay-600 hover:text-clay-800 hover:bg-clay-50"
                >
                  <Zap className="h-4 w-4" />
                  <span>도구들</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="dropdown-menu-content w-80 max-h-[500px] overflow-y-auto z-[9999] bg-white border border-gray-200 shadow-xl rounded-lg p-2"
                sideOffset={8}
                alignOffset={-4}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {allTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <DropdownMenuItem 
                      key={`dropdown-tool-${index}-${tool.label}`}
                      onClick={() => {
                        trackEvent('tool_click', 'header_navigation', tool.label, 1);
                        window.open(tool.href, '_blank', 'noopener,noreferrer');
                      }}
                      className="flex items-center space-x-3 cursor-pointer py-3 px-4 hover:bg-clay-50 rounded-md transition-all duration-200 border-b border-gray-100 last:border-b-0"
                    >
                      <Icon className="h-5 w-5 flex-shrink-0 text-clay-600" />
                      <span className="text-sm font-medium text-clay-800">{tool.label}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">메뉴 열기</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="mt-6 space-y-4">
                  <nav className="space-y-2">
                    {mainNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location === item.href;
                      
                      return (
                        <Link 
                          key={item.href} 
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive 
                              ? "bg-clay-100 text-clay-800 font-medium" 
                              : "text-clay-600 hover:text-clay-800 hover:bg-clay-50"
                          }`}>
                            <Icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </div>
                        </Link>
                      );
                    })}
                    
                    {/* Mobile Tools Section */}
                    <div className="pt-4 border-t border-clay-200">
                      <h3 className="px-4 py-2 text-sm font-semibold text-clay-800">도구들</h3>
                      {allTools.map((tool, index) => {
                        const Icon = tool.icon;
                        return (
                          <button
                            key={`mobile-tool-${index}`}
                            onClick={() => {
                              trackEvent('tool_click', 'mobile_navigation', tool.label, 1);
                              window.open(tool.href, '_blank', 'noopener,noreferrer');
                              setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left text-clay-600 hover:text-clay-800 hover:bg-clay-50 rounded-lg transition-colors"
                          >
                            <Icon className="h-5 w-5" />
                            <span>{tool.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}