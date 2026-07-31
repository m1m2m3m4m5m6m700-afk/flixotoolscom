export interface AnalyticsData {
  visitedCategories: Record<string, number>;
  openedTools: Record<string, number>;
  searchedKeywords: Record<string, number>;
  requestedTools: Record<string, number>;
  pageViews: Record<string, number>;
  landingPages: Record<string, number>;
  exitPages: Record<string, number>;
}

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

export function getAnalytics(): AnalyticsData {
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

function saveAnalytics(data: AnalyticsData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("Failed to save analytics to localStorage:", err);
  }
}

export function trackCategoryVisit(categoryId: string) {
  const data = getAnalytics();
  data.visitedCategories[categoryId] = (data.visitedCategories[categoryId] || 0) + 1;
  saveAnalytics(data);
}

export function trackToolOpen(toolIdOrName: string) {
  const data = getAnalytics();
  data.openedTools[toolIdOrName] = (data.openedTools[toolIdOrName] || 0) + 1;
  saveAnalytics(data);
}

export function trackExitPage(path: string) {
  if (!path) return;
  const data = getAnalytics();
  data.exitPages[path] = (data.exitPages[path] || 0) + 1;
  saveAnalytics(data);
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  const pagePath = path || window.location.pathname;

  // Track exit for previous page if navigating internally
  if (lastVisitedPage && lastVisitedPage !== pagePath) {
    trackExitPage(lastVisitedPage);
  }
  lastVisitedPage = pagePath;

  const data = getAnalytics();
  data.pageViews[pagePath] = (data.pageViews[pagePath] || 0) + 1;

  // Track landing page if session started
  if (!sessionStorage.getItem("flixo_session_started")) {
    sessionStorage.setItem("flixo_session_started", "true");
    data.landingPages[pagePath] = (data.landingPages[pagePath] || 0) + 1;
  }
  saveAnalytics(data);
}

// Global window listener for tab close/unload exit page tracking
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    if (lastVisitedPage) {
      trackExitPage(lastVisitedPage);
    }
  });
}

export function trackKeywordSearch(keyword: string) {
  const cleaned = keyword.trim().toLowerCase();
  if (!cleaned) return;
  const data = getAnalytics();
  data.searchedKeywords[cleaned] = (data.searchedKeywords[cleaned] || 0) + 1;
  saveAnalytics(data);
}

export function trackToolRequest(requestText: string) {
  const cleaned = requestText.trim();
  if (!cleaned) return;
  const data = getAnalytics();
  data.requestedTools[cleaned] = (data.requestedTools[cleaned] || 0) + 1;
  saveAnalytics(data);
}

export function clearAnalytics() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore error
  }
}
