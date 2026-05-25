import Image from "next/image";
import { Section } from "./components/section";
import { ProjectRow } from "./components/project-row";
import { LinkRow } from "./components/link-row";
import { StackGroup } from "./components/stack-group";
import { ExperienceCard, Bullet } from "./components/experience-card";
import { AwardRow } from "./components/award-row";
import { FluidGradientText } from "./components/fluid-gradient-text";
import { RolePill } from "./components/role-pill";
import { ThemeToggle } from "./components/theme-toggle";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PinIcon,
  VerifiedIcon,
  CompassIcon,
} from "./components/icons";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] opacity-50 dark:opacity-100" />

      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 pt-8 md:pt-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          available for work
        </span>
        <ThemeToggle />
      </header>

      <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-10 md:pt-14">
        {/* HERO */}
        <section className="flex flex-col items-start gap-5">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src="/avatar.png"
              alt="Le Anh Quan"
              fill
              priority
              sizes="80px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold tracking-tight md:text-[34px]">
                Le Anh Quan
              </h1>
              <VerifiedIcon className="text-sky-500 dark:text-sky-400" size={22} />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <RolePill label="Java Backend" />
              <RolePill label="Project Lead" />
              <RolePill label="Open Source" />
            </div>

            <p className="text-[15px] leading-relaxed text-muted">
              Building backend systems with{" "}
              <span className="text-foreground">Spring Boot</span> &{" "}
              <span className="text-foreground">Kafka</span>. SQL Server
              performance nerd. Currently @{" "}
              <a
                href="https://bachasoftware.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground link-underline"
              >
                BHSoft
              </a>{" "}
              leading the KMA team.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <a
                href="https://maps.google.com/?q=Ha+Noi,+Viet+Nam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 link-underline"
              >
                <PinIcon className="text-subtle" />
                Ha Noi, Viet Nam
              </a>
              <span className="inline-flex items-center gap-1.5 text-subtle">
                <CompassIcon />
                GMT+7
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-2" aria-label="Social">
            <SocialButton href="https://github.com/quanla93" label="GitHub">
              <GitHubIcon size={16} />
            </SocialButton>
            <SocialButton
              href="https://www.linkedin.com/in/quanla-work"
              label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </SocialButton>
            <SocialButton
              href="mailto:quanla.work@gmail.com"
              label="Email"
              external={false}
            >
              <MailIcon size={16} />
            </SocialButton>
          </nav>
        </section>

        <Section id="about" title="About" meta="01">
          <div className="space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              I lead a 3-engineer sub-team on a large-scale inventory platform —
              owning code review, sprint scope with PO, mentoring on SQL Server
              tuning, and being the primary technical contact for international
              clients in English.
            </p>
            <p>
              On hot paths I cut a 30-minute inventory take procedure to{" "}
              <span className="text-foreground">5–10 minutes (~75% faster)</span>{" "}
              on tables exceeding 50M rows — refining join order, adding covering
              indexes, partitioning. Day-to-day I migrate legacy Java EE to
              Spring Boot, ship REST APIs, and run a small homelab on Proxmox.
            </p>
          </div>
        </Section>

        <Section id="stack" title="Tech Stack" meta="02">
          <div className="rounded-lg border border-line bg-surface px-4 md:px-5">
            <StackGroup label="Languages" items={["Java", "SQL", "C# (basic)"]} />
            <StackGroup
              label="Backend"
              items={[
                "Spring Boot",
                "Spring Security",
                "Spring Data JPA",
                "Hibernate",
                "Vaadin",
                "REST",
                "Kafka",
              ]}
            />
            <StackGroup
              label="Databases"
              items={["SQL Server", "PostgreSQL", "MySQL", "Redis"]}
            />
            <StackGroup
              label="Security"
              items={["OAuth2 / OIDC", "Keycloak", "JWT"]}
            />
            <StackGroup
              label="DevOps"
              items={[
                "Docker",
                "Proxmox VE",
                "LXC",
                "KVM/QEMU",
                "Tailscale",
                "Prometheus",
                "Grafana",
              ]}
            />
            <StackGroup label="VCS / CI" items={["Git", "GitLab", "Azure DevOps"]} />
          </div>
        </Section>

        <Section id="experience" title="Experience" meta="03">
          <ExperienceCard
            company="Bac Ha Software Co., Ltd. (BHSoft)"
            companyUrl="https://bachasoftware.com"
            role="Java Backend Developer (Middle) · Project Lead — KMA"
            period="Aug 2022 — Present"
            location="Ha Noi, Viet Nam"
            tags={[
              "Java",
              "Spring Boot",
              "SQL Server",
              "Kafka",
              "Vaadin",
              "Keycloak",
            ]}
          >
            <Bullet>
              Lead a 3-engineer sub-team on <strong>KMA</strong>: code reviews,
              sprint scoping with PO, mentoring on SQL Server tuning, primary
              technical contact for international clients in English.
            </Bullet>
            <Bullet>
              Rewrote the SQL Server stored procedure behind an inventory-take
              workflow (~50M records/session): refined join order and removed
              redundant scans to cut runtime from 30 min to{" "}
              <strong>5–10 min (~75% faster)</strong> without adding
              infrastructure.
            </Bullet>
            <Bullet>
              Cut stock-event report time <strong>50%+</strong> on tables exceeding
              50M rows by adding non-clustered covering indexes and partitioning
              on hot read paths.
            </Bullet>
            <Bullet>
              Implemented a LIFO/FIFO classification engine for vehicle parts
              under <strong>ISO 22628:2002</strong> — ~20% faster processing.
            </Bullet>
            <Bullet>
              Migrated legacy Java EE functionality to Spring Boot and integrated
              it through REST APIs.
            </Bullet>
          </ExperienceCard>
        </Section>

        <Section id="projects" title="Projects" meta="04">
          <div className="grid gap-3">
            <ProjectRow
              name="saga-demo"
              badge="Backend"
              description="Spring Boot microservices with Kafka & PostgreSQL — orchestration-based Saga, Transactional Outbox, Inbox deduplication, HTTP idempotency, compensating actions, Redis hot-path stock reservation, Thymeleaf/HTMX dashboard."
              tags={["Spring Boot", "Kafka", "Postgres", "Redis"]}
              href="https://github.com/quanla93?tab=repositories"
              external
            />
            <ProjectRow
              name="homelab"
              badge="Infra"
              description="Personal infra running quanla.org — Proxmox VE with KVM/LXC, Tailscale mesh, Prometheus + Grafana for observability, Linux administration end-to-end."
              tags={["Proxmox", "Tailscale", "Prometheus"]}
            />
          </div>
        </Section>

        <Section id="awards" title="Certifications & Education" meta="05">
          <div className="rounded-lg border border-line bg-surface px-4 md:px-5">
            <ul>
              <AwardRow
                title="TOEIC 680 (Listening & Reading)"
                issuer="ETS"
                year="2025"
              />
              <AwardRow
                title="Google Project Management"
                issuer="Online course"
                year="2023"
              />
              <AwardRow
                title="Academic English: Writing"
                issuer="Online course"
                year="2023"
              />
              <AwardRow
                title="User Experience Research and Design"
                issuer="Online course"
                year="2022"
              />
              <AwardRow
                title="Bachelor of IT — Software Technology"
                issuer="FPT University"
                year="2020 — 2023"
              />
            </ul>
          </div>
        </Section>

      </main>

      <footer className="overflow-x-hidden px-2 pb-10">
        <div className="screen-line-top mx-auto max-w-4xl border-x border-line bg-background">
          <div className="screen-line-top screen-line-bottom flex w-full before:z-1 after:z-1">
            <div className="mx-auto flex items-center justify-center border-x border-line bg-background px-4 py-3 font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
              landing only · quanla.org
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-2 px-4 py-5 font-mono text-[11px] text-subtle sm:flex-row sm:items-center">
            <span>© {new Date().getFullYear()} Le Anh Quan</span>
            <span>
              built with <span className="text-foreground">next.js</span> · hosted at{" "}
              <span className="text-foreground">quanla.org</span>
            </span>
          </div>
        </div>
        <div className="screen-line-bottom mx-auto h-36 max-w-6xl text-foreground after:z-1 after:bg-foreground/15 sm:h-48 md:h-60">
          <FluidGradientText text="Anh Quan" svgViewBoxWidth={1500} svgViewBoxHeight={300} />
        </div>
      </footer>
    </div>
  );
}

function SocialButton({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-foreground"
    >
      {children}
    </a>
  );
}
