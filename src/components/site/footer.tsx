import { footerColumns } from "@/data/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pb-8 pt-16 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              AI-powered software, automation and digital solutions for businesses ready to work
              smarter.
            </p>

            <p className="mt-3 text-sm text-muted-foreground">
              Built in Uzbekistan. Ready for the world.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-medium tracking-wider text-foreground uppercase">
                  {column.title}
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#contact"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hairline mt-12 h-px w-full" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} RIVORA. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a href="#contact" className="transition-colors hover:text-foreground">
              Privacy
            </a>

            <a href="#contact" className="transition-colors hover:text-foreground">
              Terms
            </a>

            <a href="#contact" className="transition-colors hover:text-foreground">
              Security
            </a>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          backgroundImage: "var(--gradient-brand)",
          opacity: 0.14,
        }}
        aria-hidden="true"
      />
    </footer>
  );
}
