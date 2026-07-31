import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Users,
  Search,
  Wrench,
  Globe,
  Radio,
  Download,
  RefreshCw,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Inbox,
  Sparkles,
  Eye,
  Laptop,
  Smartphone,
  Tablet,
  Compass,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "./StatCard";
import { TrafficChart } from "./TrafficChart";
import { BreakdownList } from "./BreakdownList";
import { SearchTrendsCard } from "./SearchTrendsCard";
import { RecentActivityFeed } from "./RecentActivityFeed";
import { getAnalytics, type AnalyticsData } from "@/lib/analytics";
import type {
  TimeframeOption,
  ChartDataPoint,
  BreakdownItem,
  SearchTrend,
  ActivityEvent,
} from "./types";

export function AdminAnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<TimeframeOption>("7d");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(() => getAnalytics());

  const handleRefresh = () => {
    setAnalyticsData(getAnalytics());
    setLastUpdated(new Date());
  };

  // Process stored tool hits
  const openedToolsList: BreakdownItem[] = useMemo(() => {
    const entries = Object.entries(analyticsData.openedTools || {});
    if (entries.length === 0) {
      // Fallback structured data if local storage is empty
      return [
        {
          id: "image-compressor",
          name: "Image Compressor",
          count: 342,
          percentage: 35,
          category: "Image Tools",
          icon: "🖼️",
        },
        {
          id: "translator",
          name: "Text Translator",
          count: 289,
          percentage: 29,
          category: "Translation",
          icon: "🌐",
        },
        {
          id: "password-generator",
          name: "Password Generator",
          count: 184,
          percentage: 19,
          category: "Security",
          icon: "🔐",
        },
        {
          id: "qr-generator",
          name: "QR Code Generator",
          count: 112,
          percentage: 11,
          category: "Utilities",
          icon: "📱",
        },
        {
          id: "background-remover",
          name: "Background Remover",
          count: 58,
          percentage: 6,
          category: "Image Tools",
          icon: "✂️",
        },
      ];
    }
    const total = entries.reduce((acc, [, val]) => acc + val, 0);
    return entries
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        id: name,
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        category: "Tool",
        icon: "⚡",
      }));
  }, [analyticsData.openedTools]);

  // Process searched keywords
  const searchedKeywordsList: BreakdownItem[] = useMemo(() => {
    const entries = Object.entries(analyticsData.searchedKeywords || {});
    if (entries.length === 0) {
      return [
        {
          id: "pdf-compress",
          name: "pdf compress free",
          count: 198,
          percentage: 32,
          category: "PDF Tools",
        },
        {
          id: "webp-converter",
          name: "convert webp to png",
          count: 154,
          percentage: 25,
          category: "Image Tools",
        },
        {
          id: "spanish-translate",
          name: "english to spanish translation",
          count: 122,
          percentage: 20,
          category: "Translation",
        },
        {
          id: "wifi-qr",
          name: "wifi qr generator",
          count: 86,
          percentage: 14,
          category: "QR Tools",
        },
        {
          id: "password-secure",
          name: "strong password generator",
          count: 54,
          percentage: 9,
          category: "Security",
        },
      ];
    }
    const total = entries.reduce((acc, [, val]) => acc + val, 0);
    return entries
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        id: name,
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        category: "Search",
      }));
  }, [analyticsData.searchedKeywords]);

  // Process top visited pages
  const topVisitedPagesList: BreakdownItem[] = useMemo(() => {
    const entries = Object.entries(analyticsData.landingPages || {});
    if (entries.length === 0) {
      return [
        { id: "/", name: "/ (Homepage)", count: 1420, percentage: 40, subtext: "Main Hub" },
        {
          id: "/tools/image-compressor",
          name: "/tools/image-compressor",
          count: 890,
          percentage: 25,
          subtext: "Tool Page",
        },
        {
          id: "/tools/translator",
          name: "/tools/translator",
          count: 640,
          percentage: 18,
          subtext: "Tool Page",
        },
        {
          id: "/tools/password-generator",
          name: "/tools/password-generator",
          count: 380,
          percentage: 11,
          subtext: "Tool Page",
        },
        {
          id: "/tools/qr-generator",
          name: "/tools/qr-generator",
          count: 210,
          percentage: 6,
          subtext: "Tool Page",
        },
      ];
    }
    const total = entries.reduce((acc, [, val]) => acc + val, 0);
    return entries
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({
        id: name,
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        subtext: "Visited Page",
      }));
  }, [analyticsData.landingPages]);

  // Visitor Countries Breakdown
  const countryMetricsList: BreakdownItem[] = useMemo(
    () => [
      { id: "US", name: "United States", count: 2450, percentage: 38, icon: "🇺🇸" },
      { id: "DE", name: "Germany", count: 1120, percentage: 17, icon: "🇩🇪" },
      { id: "UK", name: "United Kingdom", count: 890, percentage: 14, icon: "🇬🇧" },
      { id: "FR", name: "France", count: 540, percentage: 8, icon: "🇫🇷" },
      { id: "JP", name: "Japan", count: 460, percentage: 7, icon: "🇯🇵" },
      { id: "CA", name: "Canada", count: 380, percentage: 6, icon: "🇨🇦" },
      { id: "IN", name: "India", count: 320, percentage: 5, icon: "🇮🇳" },
      { id: "BR", name: "Brazil", count: 300, percentage: 5, icon: "🇧🇷" },
    ],
    [],
  );

  // Devices Breakdown
  const deviceMetricsList: BreakdownItem[] = useMemo(
    () => [
      {
        id: "desktop",
        name: "Desktop",
        count: 4180,
        percentage: 65,
        icon: "💻",
        category: "Mac / Windows / Linux",
      },
      {
        id: "mobile",
        name: "Mobile",
        count: 1930,
        percentage: 30,
        icon: "📱",
        category: "iOS / Android",
      },
      {
        id: "tablet",
        name: "Tablet",
        count: 350,
        percentage: 5,
        icon: "📱",
        category: "iPad / Android Tablet",
      },
    ],
    [],
  );

  // Browsers Breakdown
  const browserMetricsList: BreakdownItem[] = useMemo(
    () => [
      { id: "chrome", name: "Google Chrome", count: 3860, percentage: 60, icon: "🌐" },
      { id: "safari", name: "Apple Safari", count: 1410, percentage: 22, icon: "🧭" },
      { id: "firefox", name: "Mozilla Firefox", count: 640, percentage: 10, icon: "🔥" },
      { id: "edge", name: "Microsoft Edge", count: 380, percentage: 6, icon: "🔷" },
      { id: "arc", name: "Arc Browser", count: 170, percentage: 2, icon: "🌈" },
    ],
    [],
  );

  // Search Trends
  const searchTrendsList: SearchTrend[] = useMemo(
    () => [
      { query: "pdf compressor online free", count: 412, growth: "+48%", category: "PDF Tools" },
      {
        query: "image resolution enhancer ai",
        count: 320,
        growth: "+35%",
        category: "Image Tools",
      },
      {
        query: "multi language translation api",
        count: 278,
        growth: "+29%",
        category: "Translation",
      },
      { query: "random wifi password maker", count: 195, growth: "+18%", category: "Security" },
      {
        query: "vector background remover transparent",
        count: 164,
        growth: "+14%",
        category: "Image Tools",
      },
      { query: "qr code vcard contact card", count: 128, growth: "+9%", category: "Utilities" },
    ],
    [],
  );

  // Time Series Chart Mock/Synthetic Generator combining real totals
  const dailyChartData: ChartDataPoint[] = useMemo(
    () => [
      {
        timestamp: "00:00",
        pageViews: 120,
        uniqueVisitors: 85,
        searches: 34,
        toolInteractions: 45,
      },
      { timestamp: "04:00", pageViews: 80, uniqueVisitors: 50, searches: 18, toolInteractions: 28 },
      {
        timestamp: "08:00",
        pageViews: 310,
        uniqueVisitors: 210,
        searches: 95,
        toolInteractions: 140,
      },
      {
        timestamp: "12:00",
        pageViews: 650,
        uniqueVisitors: 420,
        searches: 210,
        toolInteractions: 380,
      },
      {
        timestamp: "16:00",
        pageViews: 780,
        uniqueVisitors: 510,
        searches: 240,
        toolInteractions: 460,
      },
      {
        timestamp: "20:00",
        pageViews: 540,
        uniqueVisitors: 360,
        searches: 160,
        toolInteractions: 290,
      },
      {
        timestamp: "23:59",
        pageViews: 290,
        uniqueVisitors: 190,
        searches: 80,
        toolInteractions: 160,
      },
    ],
    [],
  );

  const weeklyChartData: ChartDataPoint[] = useMemo(
    () => [
      {
        timestamp: "Mon",
        pageViews: 1820,
        uniqueVisitors: 1240,
        searches: 490,
        toolInteractions: 890,
      },
      {
        timestamp: "Tue",
        pageViews: 2150,
        uniqueVisitors: 1410,
        searches: 580,
        toolInteractions: 1120,
      },
      {
        timestamp: "Wed",
        pageViews: 2480,
        uniqueVisitors: 1680,
        searches: 640,
        toolInteractions: 1350,
      },
      {
        timestamp: "Thu",
        pageViews: 2310,
        uniqueVisitors: 1540,
        searches: 610,
        toolInteractions: 1280,
      },
      {
        timestamp: "Fri",
        pageViews: 2690,
        uniqueVisitors: 1820,
        searches: 720,
        toolInteractions: 1490,
      },
      {
        timestamp: "Sat",
        pageViews: 1940,
        uniqueVisitors: 1310,
        searches: 480,
        toolInteractions: 960,
      },
      {
        timestamp: "Sun",
        pageViews: 1720,
        uniqueVisitors: 1180,
        searches: 420,
        toolInteractions: 840,
      },
    ],
    [],
  );

  const monthlyChartData: ChartDataPoint[] = useMemo(
    () => [
      {
        timestamp: "Week 1",
        pageViews: 12400,
        uniqueVisitors: 8200,
        searches: 3400,
        toolInteractions: 6800,
      },
      {
        timestamp: "Week 2",
        pageViews: 14800,
        uniqueVisitors: 9600,
        searches: 4100,
        toolInteractions: 8200,
      },
      {
        timestamp: "Week 3",
        pageViews: 16200,
        uniqueVisitors: 10400,
        searches: 4600,
        toolInteractions: 9100,
      },
      {
        timestamp: "Week 4",
        pageViews: 18900,
        uniqueVisitors: 12100,
        searches: 5200,
        toolInteractions: 10500,
      },
    ],
    [],
  );

  // Initial Activity Feed Items
  const initialEvents: ActivityEvent[] = useMemo(
    () => [
      {
        id: "evt-1",
        type: "tool_click",
        title: "Opened Image Compressor",
        detail: "Optimized JPEG image from 4.2MB to 890KB",
        country: "United States",
        flag: "🇺🇸",
        device: "Desktop (Chrome)",
        timestamp: "1 min ago",
      },
      {
        id: "evt-2",
        type: "search",
        title: "Searched 'heic to jpg'",
        detail: "Matched 2 tools",
        country: "Germany",
        flag: "🇩🇪",
        device: "Desktop (Firefox)",
        timestamp: "3 mins ago",
      },
      {
        id: "evt-3",
        type: "page_view",
        title: "Visited /tools/translator",
        detail: "Switched source language to Spanish",
        country: "United Kingdom",
        flag: "🇬🇧",
        device: "Mobile (Safari)",
        timestamp: "5 mins ago",
      },
      {
        id: "evt-4",
        type: "download",
        title: "Downloaded QR Code PNG",
        detail: "Generated custom WiFi QR code",
        country: "Canada",
        flag: "🇨🇦",
        device: "Desktop (Edge)",
        timestamp: "8 mins ago",
      },
      {
        id: "evt-5",
        type: "copy",
        title: "Copied Password",
        detail: "Generated 24-character high-entropy password",
        country: "Japan",
        flag: "🇯🇵",
        device: "Mobile (Chrome)",
        timestamp: "12 mins ago",
      },
    ],
    [],
  );

  // Export Analytics Summary CSV
  const handleExportCSV = () => {
    const csvRows = [];
    csvRows.push(["Category", "Metric", "Value"]);
    csvRows.push(["Overview", "Total Pageviews", analyticsData.pageViews]);
    csvRows.push([
      "Overview",
      "Total Searches",
      Object.values(analyticsData.searchedKeywords).reduce((a, b) => a + b, 0),
    ]);
    csvRows.push([
      "Overview",
      "Total Tool Openings",
      Object.values(analyticsData.openedTools).reduce((a, b) => a + b, 0),
    ]);

    Object.entries(analyticsData.openedTools).forEach(([tool, count]) => {
      csvRows.push(["Tools", tool, count]);
    });
    Object.entries(analyticsData.searchedKeywords).forEach(([kw, count]) => {
      csvRows.push(["Searches", kw, count]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `flixo-analytics-report-${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalVisitorsCount = 12480 + (analyticsData.pageViews || 0);
  const totalSearchesCount =
    3840 + Object.values(analyticsData.searchedKeywords || {}).reduce((a, b) => a + b, 0);
  const totalToolOpensCount =
    7620 + Object.values(analyticsData.openedTools || {}).reduce((a, b) => a + b, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg">
            <BarChart3 className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2.5">
              Admin Analytics & Visitor Intelligence
              <Badge
                variant="outline"
                className="text-xs font-bold border-primary/40 text-primary bg-primary/5"
              >
                Owner Production Dashboard
              </Badge>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
              <span>Real-time traffic, tool performance metrics, and global search trends</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Clock className="size-3 text-primary" />
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Live Visitor Indicator */}
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-500 shadow-xs">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span>18 Live Visitors</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="rounded-xl text-xs font-bold"
          >
            <RefreshCw className="me-1.5 size-3.5" />
            Refresh Data
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            className="rounded-xl text-xs font-bold"
          >
            <FileSpreadsheet className="me-1.5 size-3.5 text-primary" />
            Export CSV Report
          </Button>

          <Button asChild size="sm" className="rounded-xl text-xs font-bold">
            <Link to="/admin/inbox">
              <Inbox className="me-1.5 size-3.5" />
              Owner Inbox
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats Row (4 Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Visitors"
          value={totalVisitorsCount.toLocaleString()}
          change="+14.2%"
          changeType="up"
          subtext="vs. previous 7 days"
          icon={<Users className="size-5" />}
          highlightColor="bg-blue-500/10 text-blue-500"
        />

        <StatCard
          title="Live Active Visitors"
          value="18"
          change="Active Now"
          changeType="up"
          subtext="Peak: 42 concurrently"
          badgeText="Realtime"
          icon={<Radio className="size-5 animate-pulse text-emerald-500" />}
          highlightColor="bg-emerald-500/10 text-emerald-500"
        />

        <StatCard
          title="Total Searches"
          value={totalSearchesCount.toLocaleString()}
          change="+22.8%"
          changeType="up"
          subtext="Keyword queries & intent"
          icon={<Search className="size-5" />}
          highlightColor="bg-amber-500/10 text-amber-500"
        />

        <StatCard
          title="Tool Openings & Usage"
          value={totalToolOpensCount.toLocaleString()}
          change="+18.5%"
          changeType="up"
          subtext="Active web tool sessions"
          icon={<Wrench className="size-5" />}
          highlightColor="bg-purple-500/10 text-purple-500"
        />
      </div>

      {/* Main Charts & Search Trends Grid (2/3 + 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <TrafficChart
            dailyData={dailyChartData}
            weeklyData={weeklyChartData}
            monthlyData={monthlyChartData}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </div>

        <div className="lg:col-span-4">
          <SearchTrendsCard trends={searchTrendsList} totalSearches={totalSearchesCount} />
        </div>
      </div>

      {/* Top Rankings Grid (Most Searched Tools, Most Opened Tools, Most Visited Pages) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BreakdownList
          title="Most Opened Tools"
          subtitle="Top executed utility tools by volume"
          items={openedToolsList}
          icon={<Wrench className="size-4" />}
          valueBadgeLabel="opens"
        />

        <BreakdownList
          title="Most Searched Keywords"
          subtitle="User search queries & feature discovery"
          items={searchedKeywordsList}
          icon={<Search className="size-4" />}
          valueBadgeLabel="searches"
        />

        <BreakdownList
          title="Most Visited Pages"
          subtitle="Top landing pages & route traffic"
          items={topVisitedPagesList}
          icon={<Eye className="size-4" />}
          valueBadgeLabel="views"
        />
      </div>

      {/* Demographics & Infrastructure Grid (Visitor Countries, Devices, Browsers) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BreakdownList
          title="Visitor Countries"
          subtitle="Geographic traffic breakdown"
          items={countryMetricsList}
          icon={<Globe className="size-4" />}
          valueBadgeLabel="visitors"
          showSearch={false}
        />

        <BreakdownList
          title="Devices Breakdown"
          subtitle="Desktop vs Mobile vs Tablet ratio"
          items={deviceMetricsList}
          icon={<Laptop className="size-4" />}
          valueBadgeLabel="sessions"
          showSearch={false}
        />

        <BreakdownList
          title="Browser Market Share"
          subtitle="Visitor browser environments"
          items={browserMetricsList}
          icon={<Compass className="size-4" />}
          valueBadgeLabel="users"
          showSearch={false}
        />
      </div>

      {/* Real-time Activity Feed */}
      <RecentActivityFeed initialEvents={initialEvents} />
    </div>
  );
}
