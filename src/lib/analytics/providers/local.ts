import type { AnalyticsConfig, AnalyticsData, AnalyticsProviderInterface } from "../types";

const STORAGE_KEY = "flixo_analytics_v1";
let lastVisitedPage: string | null = null;

function getInitialData(): AnalyticsData {
  return {
    visitedCategories: {},
    openedTools: {},
    searchedKeywords: {},
    requestedTools: {},
    pageViews: {},
    landingPages: {},
    exitPages: {},
  };
}

export class LocalAnalyticsProvider implements AnalyticsProviderInterface {
  name = "local";

  init(_config: AnalyticsConfig): void {
    if (typeof window === "undefined") return;

    // Attach beforeunload listener for exit page tracking
    window.addEventListener("beforeunload", () => {
      if (lastVisitedPage) {
        this.trackExitPage(lastVisitedPage);
      }
    });
  }

  getData(): AnalyticsData {
    if (typeof window === "undefined") return getInitialData();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as AnalyticsData) : getInitialData();
      return {
        visitedCategories: parsed.visitedCategories || {},
        openedTools: parsed.openedTools || {},
        searchedKeywords: parsed.searchedKeywords || {},
        requestedTools: parsed.requestedTools || {},
        pageViews: parsed.pageViews || {},
        landingPages: parsed.landingPages || {},
        exitPages: parsed.exitPages || {},
      };
    } catch {
      return getInitialData();
    }
  }

  saveData(data: AnalyticsData): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore write errors
    }
  }

  clearData(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }

  trackPageView(path: string): void {
    if (typeof window === "undefined") return;
    const pagePath = path || window.location.pathname;

    if (lastVisitedPage && lastVisitedPage !== pagePath) {
      this.trackExitPage(lastVisitedPage);
    }
    lastVisitedPage = pagePath;

    const data = this.getData();
    data.pageViews[pagePath] = (data.pageViews[pagePath] || 0) + 1;

    if (!sessionStorage.getItem("flixo_session_started")) {
      sessionStorage.setItem("flixo_session_started", "true");
      data.landingPages[pagePath] = (data.landingPages[pagePath] || 0) + 1;
    }
    this.saveData(data);
  }

  trackExitPage(path: string): void {
    if (!path) return;
    const data = this.getData();
    data.exitPages[path] = (data.exitPages[path] || 0) + 1;
    this.saveData(data);
  }

  trackSearch(query: string): void {
    const cleaned = query.trim().toLowerCase();
    if (!cleaned) return;
    const data = this.getData();
    data.searchedKeywords[cleaned] = (data.searchedKeywords[cleaned] || 0) + 1;
    this.saveData(data);
  }

  trackToolClick(toolId: string): void {
    if (!toolId) return;
    const data = this.getData();
    data.openedTools[toolId] = (data.openedTools[toolId] || 0) + 1;
    this.saveData(data);
  }

  trackCategoryClick(categoryId: string): void {
    if (!categoryId) return;
    const data = this.getData();
    data.visitedCategories[categoryId] = (data.visitedCategories[categoryId] || 0) + 1;
    this.saveData(data);
  }

  trackToolRequest(requestText: string): void {
    const cleaned = requestText.trim();
    if (!cleaned) return;
    const data = this.getData();
    data.requestedTools[cleaned] = (data.requestedTools[cleaned] || 0) + 1;
    this.saveData(data);
  }
}
