import React from 'react';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-2 py-2 md:h-10 md:flex-row md:py-0 min-h-0">
        <div className="flex flex-col items-center gap-2 px-4 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-xs leading-tight text-muted-foreground md:text-left">
            Built with ❤️ for college applications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a 
            href="https://logo.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] text-muted-foreground hover:text-foreground underline"
          >
            Logos provided by Logo.dev
          </a>
        </div>
      </div>
    </footer>
  );
} 