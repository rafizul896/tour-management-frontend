import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Compass } from "lucide-react";

const DivisionHero = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-background text-foreground flex items-center justify-center">
      {/* Background Map & Visuals */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_90%,var(--background)_40%,var(--primary)_100%)] motion-reduce:hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 900 700"
          className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 h-[90%] w-[120%] opacity-40 sm:opacity-75 sm:h-[110%] sm:w-[100%] md:right-[-5%] md:translate-x-0 md:h-[125%] md:w-[65%] lg:right-[0%] lg:w-[55%] xl:right-[2%] xl:w-[48%] transition-all duration-500 ease-out"
          fill="none"
        >
          <defs>
            <pattern
              id="eb-grid"
              width="46"
              height="46"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 46 0 L 0 0 0 46"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="eb-marker-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </radialGradient>
            {/* real Bangladesh boundary, projected from GeoJSON coordinates */}
            <clipPath id="eb-map-clip">
              <path d="M593.9,477.1 L592.1,546.7 L561.1,532.0 L566.9,610.0 L541.5,559.5 L536.3,510.1 L519.4,463.4 L482.3,407.0 L400.4,403.1 L408.5,443.0 L380.6,497.0 L342.8,477.3 L329.9,495.0 L304.7,484.4 L270.3,475.7 L256.5,395.9 L225.7,323.0 L240.8,264.6 L186.1,238.6 L205.8,203.2 L261.4,167.1 L197.2,115.8 L228.6,50.0 L299.0,91.9 L341.5,96.7 L349.3,164.1 L433.9,177.4 L516.3,176.0 L567.5,192.5 L526.6,274.6 L486.8,280.2 L459.4,335.3 L508.0,385.6 L522.5,323.6 L547.1,323.3 L593.9,477.1 Z" />
            </clipPath>
          </defs>

          {/* faint atlas grid, clipped to the real landmass so it reads as terrain */}
          <g clipPath="url(#eb-map-clip)">
            <rect
              x="0"
              y="0"
              width="900"
              height="700"
              fill="url(#eb-grid)"
              className="text-foreground"
            />
            <rect
              x="0"
              y="0"
              width="900"
              height="700"
              fill="var(--primary)"
              opacity="0.06"
            />
          </g>

          {/* country outline — real boundary, not decorative */}
          <path
            d="M593.9,477.1 L592.1,546.7 L561.1,532.0 L566.9,610.0 L541.5,559.5 L536.3,510.1 L519.4,463.4 L482.3,407.0 L400.4,403.1 L408.5,443.0 L380.6,497.0 L342.8,477.3 L329.9,495.0 L304.7,484.4 L270.3,475.7 L256.5,395.9 L225.7,323.0 L240.8,264.6 L186.1,238.6 L205.8,203.2 L261.4,167.1 L197.2,115.8 L228.6,50.0 L299.0,91.9 L341.5,96.7 L349.3,164.1 L433.9,177.4 L516.3,176.0 L567.5,192.5 L526.6,274.6 L486.8,280.2 L459.4,335.3 L508.0,385.6 L522.5,323.6 L547.1,323.3 L593.9,477.1 Z"
            stroke="var(--primary)"
            strokeWidth="1.75"
            strokeOpacity="0.85"
            fill="none"
          />

          {/* stylized river system — general course only, not survey-accurate */}
          <path
            d="M350,92 C334,150 356,196 336,252 C320,298 342,336 322,392 C308,432 332,470 316,516"
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="2"
            fill="none"
            className="text-foreground"
          />
          <path
            d="M430,150 C414,200 440,240 418,290 C400,332 424,370 396,414 C380,440 398,472 372,506"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeWidth="1.5"
            fill="none"
            className="text-foreground"
          />

          {/* division markers, projected from each division's actual coordinates. Dhaka pulses as the capital */}
          {[
            { x: 393.0, y: 305.6, label: "Dhaka", capital: true },
            { x: 291.9, y: 118.1, label: "Rangpur" },
            { x: 232.3, y: 250.9, label: "Rajshahi" },
            { x: 522.4, y: 200.4, label: "Sylhet" },
            { x: 514.8, y: 446.5, label: "Chattogram" },
            { x: 315.5, y: 399.1, label: "Khulna" },
            { x: 387.8, y: 413.2, label: "Barishal" },
            { x: 393.7, y: 214.8, label: "Mymensingh" },
          ].map((m) =>
            m.capital ? (
              <g key={m.label}>
                <circle cx={m.x} cy={m.y} r="26" fill="url(#eb-marker-glow)" />
                <circle
                  cx={m.x}
                  cy={m.y}
                  r="10"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  strokeOpacity="0.5"
                >
                  <animate
                    attributeName="r"
                    values="6;18;6"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-opacity"
                    values="0.6;0;0.6"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={m.x} cy={m.y} r="5" fill="var(--primary)" />
              </g>
            ) : (
              <circle
                key={m.label}
                cx={m.x}
                cy={m.y}
                r="3"
                fill="currentColor"
                fillOpacity="0.55"
                className="text-foreground"
              />
            ),
          )}
        </svg>
      </div>

      {/* Subtle fade overlay for seamless transitions */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

      {/* Main Container - 1 column on mobile, 12-col grid on md+ */}
      <div className="container relative mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-8 px-4 py-12 sm:px-6 sm:py-20 md:gap-8 md:py-24 lg:py-32 xl:py-5">
        {/* Content Column */}
        <div className="md:col-span-8 lg:col-span-7 flex flex-col items-center text-center md:items-start md:text-left gap-4 sm:gap-6 lg:gap-7 z-10">
          <Badge
            variant="secondary"
            className="gap-2 rounded-full border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-foreground shrink-0"
          >
            <Compass className="h-3.5 w-3.5 shrink-0 text-primary" />
            Explore Bangladesh
          </Badge>

          {/* Fluid Typography Header */}
          <h1 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[1.12] tracking-tight max-w-[20ch]">
            Discover Bangladesh,
            <br />
            <span className="relative inline-block text-primary">
              one division at a time
            </span>
          </h1>

          <p className="text-[clamp(0.95rem,2vw,1.125rem)] text-muted-foreground leading-relaxed max-w-prose">
            From misty hills and endless beaches to tea gardens, rivers, forests
            and centuries-old heritage — everything you need to know about each
            division, in one place.
          </p>

          {/* Responsive Stats Box */}
          <div className="grid w-full max-w-sm grid-cols-3 divide-x divide-border rounded-xl border border-border bg-muted/50 backdrop-blur-xs font-mono sm:max-w-md">
            {[
              { value: "8", label: "Divisions" },
              { value: "64", label: "Districts" },
              { value: "∞", label: "Adventures" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-0.5 px-2 py-3 sm:px-6 sm:py-4"
              >
                <div className="text-base sm:text-2xl font-semibold leading-tight">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-muted-foreground truncate max-w-full">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-2 w-full sm:w-auto gap-2 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95"
            onClick={() =>
              document
                .getElementById("division-nav")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start exploring
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Spatial Spacer Column for Medium+ Screens */}
        <div className="hidden md:block md:col-span-4 lg:col-span-5 aria-hidden:true" />
      </div>
    </section>
  );
};

export default DivisionHero;
