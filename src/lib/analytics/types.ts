export interface AnalyticsEventParams {
  [key: string]: string | number | boolean | undefined | null;
}

export interface AnalyticsConfig {
  enabled: boolean;
  debug?: boolean;
  gaMeasurementId?: string;
  clarityProjectId?: string;
  customProviders?: AnalyticsProviderInterface[];
}

export interface AnalyticsProviderInterface {
  name: string;
  init(config: AnalyticsConfig): void | Promise<void>;
  trackPageView?(path: string, title?: string): void;
  trackSearch?(query: string, resultCount?: number, category?: string): void;
  trackToolClick?(toolId: string, toolName?: string, category?: string): void;
  trackCategoryClick?(categoryId: string, categoryName?: string): void;
  trackExternalLinkClick?(url: string, label?: string): void;
  trackCopy?(contentType: string, textLength?: number, toolId?: string): void;
  trackDownload?(fileName: string, fileType?: string, toolId?: string): void;
  trackEvent?(eventName: string, params?: AnalyticsEventParams): void;
}

export interface AnalyticsData {
  visitedCategories: Record<string, number>;
  openedTools: Record<string, number>;
  searchedKeywords: Record<string, number>;
  requestedTools: Record<string, number>;
  pageViews: Record<string, number>;
  landingPages: Record<string, number>;
  exitPages: Record<string, number>;
}
