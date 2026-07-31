import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronDown,
  Layers,
  Flame,
  History,
  Users,
  Scale,
  Briefcase,
  FileCode,
  BookOpen,
} from "lucide-react";
import { getToolSeo, type ToolSeoData } from "@/data/toolSeo";
import { tools, type Tool } from "@/data/tools";
import { categoryById, type CategoryId } from "@/data/categories";
import { trackPageView, trackToolOpen } from "@/lib/analytics";
import { LastUpdatedBadge } from "@/components/seo/LastUpdatedBadge";
import { ToolStatsWidget } from "@/components/seo/ToolStatsWidget";
import {
  comparisonRegistry,
  useCaseRegistry,
  fileTypeRegistry,
  questionRegistry,
  collectionRegistry,
} from "@/data/seoEnterpriseData";

interface ToolSeoSectionProps {
  slug: string;
  toolName: string;
  categoryName: string;
  categoryId?: CategoryId;
}

export function ToolSeoSection({ slug, toolName, categoryName, categoryId }: ToolSeoSectionProps) {
  const seo: ToolSeoData = getToolSeo(slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    trackPageView(`/tools/${slug}`);
    trackToolOpen(slug);
  }, [slug]);

  // Resolve current tool and category
  const currentTool = tools.find((t) => t.slug === slug || t.id === slug);
  const resolvedCategoryId = categoryId || currentTool?.categoryId || "utilities";
  const category = categoryById.get(resolvedCategoryId);

  // 1. Related Tools (Same category)
  const relatedTools = tools
    .filter((t) => t.categoryId === resolvedCategoryId && t.slug !== slug && t.id !== slug)
    .slice(0, 4);

  // 2. Similar Tools (Matching tags)
  const currentTags = currentTool?.tags || [];
  const similarTools = tools
    .filter(
      (t) =>
        t.id !== currentTool?.id &&
        t.tags?.some((tag) => currentTags.includes(tag)) &&
        !relatedTools.some((rt) => rt.id === t.id),
    )
    .slice(0, 4);

  // 3. Popular Tools (Ready tools across site)
  const popularTools = tools
    .filter((t) => t.status === "ready" && t.id !== currentTool?.id)
    .slice(0, 4);

  // 4. Recently Added Tools
  const recentlyAdded = tools
    .filter((t) => t.status === "ready")
    .slice(-4)
    .reverse();

  // 5. Users Also Use
  const usersAlsoUse = tools
    .filter((t) => t.id !== currentTool?.id && !relatedTools.some((rt) => rt.id === t.id))
    .slice(2, 6);

  // Schemas
  const siteUrl = "https://flixotools.com";
  const pageUrl = `${siteUrl}/tools/${slug}`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: seo.title,
    url: pageUrl,
    description: seo.description,
    applicationCategory: categoryName || "UtilityApplication",
    operatingSystem: "All",
    browserRequirements: "Requires Web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: toolName,
    operatingSystem: "Web",
    applicationCategory: categoryName,
    description: seo.description,
    url: pageUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1280",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName || "Tools",
        item: category?.route || `${siteUrl}/categories/${category?.id || "utilities"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: toolName,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: seo.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flixo",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    sameAs: ["https://twitter.com/FlixoTools"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Flixo Tools",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/#search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <article className="mt-16 border-t border-border/60 pt-12 text-foreground space-y-12">
      {/* 6 Schema.org JSON-LD Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* SEO Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex items-center flex-wrap gap-1.5">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="size-3 opacity-60 rtl:rotate-180" />
            </li>
            <li>
              <Link
                to="/categories/$slug"
                params={{ slug: resolvedCategoryId }}
                className="hover:text-foreground transition-colors"
              >
                {categoryName}
              </Link>
            </li>
            <li>
              <ChevronRight className="size-3 opacity-60 rtl:rotate-180" />
            </li>
            <li className="font-semibold text-foreground" aria-current="page">
              {toolName}
            </li>
          </ol>
        </nav>
        <LastUpdatedBadge />
      </div>

      {/* Tool Performance & Privacy Stats Widget */}
      <ToolStatsWidget toolId={slug} />

      {/* 1. Overview */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold tracking-tight md:text-2xl">Overview of {toolName}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{seo.overview}</p>
      </section>

      {/* 2. Features & 3. How It Works / Step-by-Step Guide Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Features */}
        <section className="rounded-2xl border border-border/80 bg-surface/40 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h3 className="text-base font-semibold">Features</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {seo.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <span className="text-muted-foreground">{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How It Works & Step-by-Step Guide */}
        <section className="rounded-2xl border border-border/80 bg-surface/40 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="size-4 text-primary" />
            <h3 className="text-base font-semibold">How It Works: Step-by-Step Guide</h3>
          </div>
          <ol className="space-y-3 text-xs sm:text-sm">
            {seo.howToUse.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* 4. Benefits */}
      <section className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-primary" />
          <h3 className="text-lg font-semibold">Benefits & Advantages</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {seo.benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm">
              <span className="size-2 rounded-full bg-primary" />
              <span className="text-muted-foreground font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="size-5 text-primary" />
          <h2 className="text-lg font-bold tracking-tight md:text-xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {seo.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-border/80 bg-surface/30 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-foreground focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-border/50 px-4 pb-4 pt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Linking Sections: Related, Similar, Popular, Recently Added, Users Also Use */}
      <section className="border-t border-border/60 pt-8 space-y-8">
        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Related Tools in {categoryName}
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {relatedTools.map((item) => (
                <ToolLinkCard key={item.id} tool={item} />
              ))}
            </div>
          </div>
        )}

        {/* Similar Tools */}
        {similarTools.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Similar Tools
              </h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {similarTools.map((item) => (
                <ToolLinkCard key={item.id} tool={item} />
              ))}
            </div>
          </div>
        )}

        {/* Popular Tools */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Flame className="size-4 text-amber-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Popular Tools
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {popularTools.map((item) => (
              <ToolLinkCard key={item.id} tool={item} />
            ))}
          </div>
        </div>

        {/* Recently Added */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <History className="size-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Recently Added Tools
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyAdded.map((item) => (
              <ToolLinkCard key={item.id} tool={item} />
            ))}
          </div>
        </div>

        {/* Users Also Use */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-primary" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Users Also Use
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {usersAlsoUse.map((item) => (
              <ToolLinkCard key={item.id} tool={item} />
            ))}
          </div>
        </div>

        {/* Enterprise SEO Guides & Comparisons Hub */}
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 space-y-4 mt-8">
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-5 text-primary" /> Explore Tool Benchmarks & Guides
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs font-semibold">
            <Link
              to="/compare"
              className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/50 text-foreground transition-all"
            >
              <Scale className="size-4 text-primary shrink-0" /> Tool Comparisons
            </Link>
            <Link
              to="/use-cases"
              className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/50 text-foreground transition-all"
            >
              <Briefcase className="size-4 text-primary shrink-0" /> Solution Workflows
            </Link>
            <Link
              to="/file-types"
              className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/50 text-foreground transition-all"
            >
              <FileCode className="size-4 text-primary shrink-0" /> File Format Directory
            </Link>
            <Link
              to="/questions"
              className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border/60 hover:border-primary/50 text-foreground transition-all"
            >
              <BookOpen className="size-4 text-primary shrink-0" /> How-To Questions
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

function ToolLinkCard({ tool }: { tool: Tool }) {
  const isReady = tool.status === "ready" && tool.slug;
  const destination = isReady ? `/tools/${tool.slug}` : `/#categories`;

  return (
    <Link
      to={destination}
      className="group rounded-xl border border-border/80 bg-card p-3.5 transition-all hover:border-primary/50 hover:shadow-xs flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {tool.name}
          </span>
          <ArrowRight className="size-3.5 shrink-0 text-muted-foreground group-hover:translate-x-0.5 group-hover:text-primary transition-transform" />
        </div>
        <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{tool.description}</p>
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[10px] uppercase font-bold text-muted-foreground/70">
          {tool.categoryId}
        </span>
        {isReady ? (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
            Ready
          </span>
        ) : (
          <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            Roadmap
          </span>
        )}
      </div>
    </Link>
  );
}
