import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50 bg-gradient-soft">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-heart-red" fill="currentColor" />
            <span className="text-lg font-heading font-bold">HridayMitra</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} HridayMitra. Built with ❤️ for GDG Hackathon.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
