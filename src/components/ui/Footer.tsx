import { navigation, footerLinks } from "@/lib/data";
import type { Testimonial } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#09090b] pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F2CB38] to-[#E5B830] flex items-center justify-center">
                       <svg
                          className="w-full h-full"
                          viewBox="-14 -14 94.48 80.94"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                          <path
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="currentColor"
                          d="M65.49,24.02c-.98-2.02-2.41-3.72-4.19-5.11l-1.61-1.25c-.35-3.05-2.22-5.95-4.38-8.11C48.6,2.82,39.24-.49,29.77.06c-7.39.43-14.46,3.13-19.96,8.11l-2.55,2.58C3.12,15.42.61,21.23.08,27.45c-.07.86-.14,1.61.05,2.47,4.25-9.8,11.04-15.91,21.98-16.26,5.19-.17,10.27.71,15.22,2.42-.31,2.22,0,4.35,1.12,6.24,1.65,2.77,4.86,4.14,7.99,3.4,1.62-.41,2.95-1.29,3.82-2.72l-1.62-.47c-2.26,1.87-5.67,1.56-7.42-.81-.99-1.34-1.23-3-1.02-4.6l1.89.79.61.79c1.2,1.21,2.81,1.64,4.4,1.51,1.75.83,3.43,1.48,5.27,1.95l5.33,1.37c-4.39,2.49-7.89,5.99-9.97,10.6,2.78-2.54,5.56-4.68,9.33-5.1,2.74-.22,5.51.76,5.9,3.57.14.98.02,1.89-.16,3.03,3.65-2.67,4.69-7.56,2.71-11.62ZM56.39,19.01c-1,1.13-3.41.46-4.97-.29l-5.73-2.72c-3.16-1.5-6.29-2.79-9.68-3.74-7.53-2.12-15.34-2.58-23.02-.98l1.49-1.31c6.17-4.59,13.85-6.83,21.56-6.15,3.93.35,7.57,1.58,11,3.46,3.17,1.74,6.55,4.44,8.65,7.38,1,1.4,1.83,3.11.72,4.35Z"
                          />
                          <path
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="currentColor"
                          d="M24.18,42.26c-.97-2.28-1.06-4.75-.21-7.07,1.83-4.61,5.95-6.7,10.74-7.71-3.12-1.31-6.15-2.11-9.36-2.45-6.47-.66-12.65.26-17.9,4.2-2.34,1.76-4.13,4.02-5.39,6.66-.15.31-.32.57-.34.93,2.6-2.96,5.66-5.31,9.29-6.88,4.45-1.86,9.29-2.43,14.19-1.7-4.06,3.26-5.92,8.48-4.23,13.44.94,2.69,2.6,4.87,4.74,6.68,2.73,2.16,5.84,3.83,9.37,4.58-4.5-2.59-8.89-5.87-10.9-10.68Z"
                          />
                        </svg>
              </div>
              <span className="text-sm font-semibold text-zinc-100 tracking-tight">
                Haurus
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[220px] mb-4">
              Intelligence artificielle pour les paris sportifs tennis. Plus de 276 000 matchs analysés.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-md bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-md bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-md bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section: typeof footerLinks[0]) => (
            <div key={section.title}>
              <p className="text-xs font-medium text-zinc-400 mb-4 uppercase tracking-wider">
                {section.title}
              </p>
              <ul className="flex flex-col gap-2">
                {section.links.map((link: { name: string; href: string }) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.05]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-600">
              © 2026 Haurus. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              {["Confidentialité", "CGU", "Cookies"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Responsible Gambling Disclaimer */}
          <div className="mt-6 p-4 rounded-xl bg-[#F2CB38]/5 border border-[#F2CB38]/10">
            <div className="flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="text-xs font-medium text-[#F2CB38] mb-1">
                  Jeu responsable
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Les paris sportifs comportent des risques. Ne misez jamais plus que ce que vous pouvez vous permettre de perdre. 
                  Value Bet AI est un outil d&apos;aide à la décision, pas une garantie de gain. 
                  Jouer compulsivement est néfaste pour la santé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
