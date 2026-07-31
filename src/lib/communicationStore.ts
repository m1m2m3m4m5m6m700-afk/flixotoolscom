import { useState, useEffect } from "react";

export type ConversationCategory =
  | "Ask a Question"
  | "Report a Bug"
  | "Request a Tool"
  | "Business Inquiry"
  | "Sponsor Request"
  | "Partnership"
  | "General Support";

export type ConversationStatus =
  "New" | "Open" | "Waiting for Reply" | "In Progress" | "Resolved" | "Closed";

export type ConversationPriority = "Low" | "Medium" | "High" | "Urgent";

export interface Attachment {
  id: string;
  name: string;
  type: "image" | "video" | "pdf" | "document" | "zip";
  url: string;
  size: string;
}

export interface Message {
  id: string;
  sender: "visitor" | "owner" | "system";
  senderName: string;
  text: string;
  timestamp: string;
  readStatus: "sent" | "delivered" | "read";
  attachments?: Attachment[];
}

export interface InternalNote {
  id: string;
  text: string;
  createdAt: string;
  authorName: string;
}

export interface UserInfo {
  browser: string;
  os: string;
  location: string;
  ip: string;
  pageUrl: string;
}

export interface Conversation {
  id: string;
  visitorName: string;
  visitorEmail: string;
  visitorAvatar?: string;
  category: ConversationCategory;
  subject: string;
  status: ConversationStatus;
  priority: ConversationPriority;
  starred: boolean;
  pinned: boolean;
  archived: boolean;
  unreadByVisitor: boolean;
  unreadByAdmin: boolean;
  userInfo: UserInfo;
  messages: Message[];
  internalNotes: InternalNote[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "flixo_owner_communication_conversations_v1";

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-101",
    visitorName: "Alex Mercer",
    visitorEmail: "alex.mercer@techstudio.io",
    category: "Sponsor Request",
    subject: "Sponsoring Flixo Image Tools Hub",
    status: "New",
    priority: "High",
    starred: true,
    pinned: true,
    archived: false,
    unreadByVisitor: false,
    unreadByAdmin: true,
    userInfo: {
      browser: "Chrome 126.0 (macOS)",
      os: "macOS Sonoma 14.5",
      location: "San Francisco, CA, USA",
      ip: "192.0.2.45",
      pageUrl: "https://flixotools.com/contact",
    },
    internalNotes: [
      {
        id: "note-1",
        text: "TechStudio is interested in a 3-month sponsorship tier for the Image Compressor & Enhancer tools.",
        createdAt: "2026-07-30T20:15:00Z",
        authorName: "Flixo Owner",
      },
    ],
    messages: [
      {
        id: "msg-101",
        sender: "visitor",
        senderName: "Alex Mercer",
        text: "Hi Flixo team! We love the privacy-first suite and would like to sponsor the Image Tools directory. Attached is our company sponsorship deck.",
        timestamp: "2026-07-30T20:10:00Z",
        readStatus: "read",
        attachments: [
          {
            id: "att-1",
            name: "TechStudio_Sponsorship_Deck.pdf",
            type: "pdf",
            url: "#",
            size: "2.4 MB",
          },
        ],
      },
    ],
    createdAt: "2026-07-30T20:10:00Z",
    updatedAt: "2026-07-30T20:10:00Z",
  },
  {
    id: "conv-102",
    visitorName: "Elena Rostova",
    visitorEmail: "elena.design@creatives.co",
    category: "Request a Tool",
    subject: "SVG Path Optimizer & Converter Tool Request",
    status: "In Progress",
    priority: "Medium",
    starred: false,
    pinned: false,
    archived: false,
    unreadByVisitor: false,
    unreadByAdmin: false,
    userInfo: {
      browser: "Firefox 127.0 (Windows)",
      os: "Windows 11",
      location: "Berlin, Germany",
      ip: "198.51.100.12",
      pageUrl: "https://flixotools.com/#categories",
    },
    internalNotes: [
      {
        id: "note-2",
        text: "Great suggestion! Adding SVG clean/minifier to roadmap for Q3.",
        createdAt: "2026-07-30T18:40:00Z",
        authorName: "Flixo Owner",
      },
    ],
    messages: [
      {
        id: "msg-102",
        sender: "visitor",
        senderName: "Elena Rostova",
        text: "Would it be possible to add an inline SVG optimizer tool to clean extra metadata and shrink vector sizes?",
        timestamp: "2026-07-30T18:30:00Z",
        readStatus: "read",
      },
      {
        id: "msg-103",
        sender: "owner",
        senderName: "Flixo Owner",
        text: "Hey Elena! Thanks for reaching out. We are actually prototyping a vector optimization tool right now! Stay tuned for updates.",
        timestamp: "2026-07-30T18:38:00Z",
        readStatus: "read",
      },
    ],
    createdAt: "2026-07-30T18:30:00Z",
    updatedAt: "2026-07-30T18:38:00Z",
  },
  {
    id: "conv-103",
    visitorName: "Marcus Vance",
    visitorEmail: "m.vance@devstack.net",
    category: "Report a Bug",
    subject: "QR Generator batch export canvas sizing",
    status: "Waiting for Reply",
    priority: "Urgent",
    starred: true,
    pinned: false,
    archived: false,
    unreadByVisitor: true,
    unreadByAdmin: false,
    userInfo: {
      browser: "Safari 17.4 (macOS)",
      os: "macOS Sonoma 14.4",
      location: "Toronto, Canada",
      ip: "203.0.113.88",
      pageUrl: "https://flixotools.com/tools/qr-generator",
    },
    internalNotes: [],
    messages: [
      {
        id: "msg-104",
        sender: "visitor",
        senderName: "Marcus Vance",
        text: "Hello, when downloading high-DPI transparent QR codes on Safari, the canvas margin clips slightly on retina displays. Sample attached.",
        timestamp: "2026-07-30T16:20:00Z",
        readStatus: "read",
        attachments: [
          {
            id: "att-2",
            name: "qr_canvas_issue.png",
            type: "image",
            url: "https://images.unsplash.com/photo-1595079672139-cee4c0849f4a?w=400&auto=format&fit=crop&q=80",
            size: "412 KB",
          },
        ],
      },
      {
        id: "msg-105",
        sender: "owner",
        senderName: "Flixo Owner",
        text: "Hi Marcus, we identified the devicePixelRatio scaling parameter and released a hotfix! Could you test downloading again and let us know if it works?",
        timestamp: "2026-07-30T17:05:00Z",
        readStatus: "delivered",
      },
    ],
    createdAt: "2026-07-30T16:20:00Z",
    updatedAt: "2026-07-30T17:05:00Z",
  },
  {
    id: "conv-104",
    visitorName: "Sophia Lin",
    visitorEmail: "sophia@venturelabs.co",
    category: "Partnership",
    subject: "Developer API Ecosystem Collaboration",
    status: "Resolved",
    priority: "Low",
    starred: false,
    pinned: false,
    archived: false,
    unreadByVisitor: false,
    unreadByAdmin: false,
    userInfo: {
      browser: "Edge 125.0 (Windows)",
      os: "Windows 11",
      location: "Singapore",
      ip: "198.51.100.99",
      pageUrl: "https://flixotools.com/contact",
    },
    internalNotes: [],
    messages: [
      {
        id: "msg-106",
        sender: "visitor",
        senderName: "Sophia Lin",
        text: "Great work on Flixo! We would love to feature Flixo in our weekly developer productivity roundup newsletter.",
        timestamp: "2026-07-29T14:00:00Z",
        readStatus: "read",
      },
      {
        id: "msg-107",
        sender: "owner",
        senderName: "Flixo Owner",
        text: "Thank you Sophia! That would be fantastic. Feel free to use our official brand assets from our media kit.",
        timestamp: "2026-07-29T14:45:00Z",
        readStatus: "read",
      },
    ],
    createdAt: "2026-07-29T14:00:00Z",
    updatedAt: "2026-07-29T14:45:00Z",
  },
];

class CommunicationStore {
  private conversations: Conversation[] = INITIAL_CONVERSATIONS;
  private listeners: Set<() => void> = new Set();
  private isInitialized = false;

  constructor() {
    // Initialized with INITIAL_CONVERSATIONS to ensure initial SSR and client hydration HTML match perfectly.
  }

  public init() {
    if (this.isInitialized || typeof window === "undefined") return;
    this.isInitialized = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.conversations = JSON.parse(saved);
        this.notify();
      } else {
        this.save();
      }
    } catch {
      // ignore storage errors
    }
  }

  private save() {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.conversations));
      this.notify();
    } catch {
      // ignore storage errors
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getConversations(): Conversation[] {
    return [...this.conversations];
  }

  public getConversation(id: string): Conversation | undefined {
    return this.conversations.find((c) => c.id === id);
  }

  public createConversation(data: {
    visitorName: string;
    visitorEmail: string;
    category: ConversationCategory;
    subject: string;
    messageText: string;
    attachments?: Attachment[];
  }): Conversation {
    const now = new Date().toISOString();
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      visitorName: data.visitorName || "Anonymous Visitor",
      visitorEmail: data.visitorEmail || "visitor@example.com",
      category: data.category,
      subject: data.subject || `${data.category} Inquiry`,
      status: "New",
      priority:
        data.category === "Report a Bug"
          ? "High"
          : data.category === "Sponsor Request"
            ? "High"
            : "Medium",
      starred: false,
      pinned: false,
      archived: false,
      unreadByVisitor: false,
      unreadByAdmin: true,
      userInfo: {
        browser: typeof navigator !== "undefined" ? navigator.userAgent : "Browser Client",
        os: typeof navigator !== "undefined" ? navigator.platform : "Desktop",
        location: "Detected via Client IP",
        ip: "127.0.0.1",
        pageUrl: typeof window !== "undefined" ? window.location.href : "https://flixotools.com",
      },
      internalNotes: [],
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "visitor",
          senderName: data.visitorName || "Visitor",
          text: data.messageText,
          timestamp: now,
          readStatus: "sent",
          attachments: data.attachments || [],
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    this.conversations = [newConv, ...this.conversations];
    this.save();
    return newConv;
  }

  public sendMessage(
    conversationId: string,
    sender: "visitor" | "owner",
    senderName: string,
    text: string,
    attachments?: Attachment[],
  ) {
    const conv = this.conversations.find((c) => c.id === conversationId);
    if (!conv) return;

    const now = new Date().toISOString();
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender,
      senderName,
      text,
      timestamp: now,
      readStatus: "sent",
      attachments: attachments || [],
    };

    conv.messages.push(newMsg);
    conv.updatedAt = now;

    if (sender === "owner") {
      conv.status = "Waiting for Reply";
      conv.unreadByVisitor = true;
      conv.unreadByAdmin = false;
    } else {
      conv.status = conv.status === "Closed" || conv.status === "Resolved" ? "Open" : conv.status;
      conv.unreadByAdmin = true;
      conv.unreadByVisitor = false;
    }

    this.save();
  }

  public updateStatus(id: string, status: ConversationStatus) {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv) return;
    conv.status = status;
    conv.updatedAt = new Date().toISOString();

    // Add system notification message
    conv.messages.push({
      id: `sys-${Date.now()}`,
      sender: "system",
      senderName: "System",
      text: `Status updated to "${status}"`,
      timestamp: new Date().toISOString(),
      readStatus: "read",
    });

    this.save();
  }

  public updatePriority(id: string, priority: ConversationPriority) {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv) return;
    conv.priority = priority;
    conv.updatedAt = new Date().toISOString();
    this.save();
  }

  public toggleStar(id: string) {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv) return;
    conv.starred = !conv.starred;
    this.save();
  }

  public togglePin(id: string) {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv) return;
    conv.pinned = !conv.pinned;
    this.save();
  }

  public toggleArchive(id: string) {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv) return;
    conv.archived = !conv.archived;
    this.save();
  }

  public addInternalNote(id: string, text: string, authorName = "Flixo Owner") {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv || !text.trim()) return;
    conv.internalNotes.push({
      id: `note-${Date.now()}`,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      authorName,
    });
    this.save();
  }

  public deleteInternalNote(id: string, noteId: string) {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv) return;
    conv.internalNotes = conv.internalNotes.filter((n) => n.id !== noteId);
    this.save();
  }

  public markAsRead(id: string, forWho: "admin" | "visitor") {
    const conv = this.conversations.find((c) => c.id === id);
    if (!conv) return;
    if (forWho === "admin") {
      conv.unreadByAdmin = false;
    } else {
      conv.unreadByVisitor = false;
    }
    this.save();
  }

  public getAnalytics() {
    const total = this.conversations.length;
    const unreadAdmin = this.conversations.filter((c) => c.unreadByAdmin).length;
    const open = this.conversations.filter(
      (c) => c.status === "New" || c.status === "Open" || c.status === "In Progress",
    ).length;
    const resolved = this.conversations.filter(
      (c) => c.status === "Resolved" || c.status === "Closed",
    ).length;

    // Category distribution
    const categoryCounts: Record<string, number> = {};
    this.conversations.forEach((c) => {
      categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    });

    return {
      totalConversations: total,
      unreadAdmin,
      openConversations: open,
      resolvedConversations: resolved,
      categoryCounts,
      avgResponseTime: "18 mins",
      satisfactionScore: "4.9 / 5.0",
      topRequestedCategory: "Request a Tool",
    };
  }
}

export const communicationStore = new CommunicationStore();

export function useCommunicationStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    communicationStore.init();
    return communicationStore.subscribe(() => {
      setTick((t) => t + 1);
    });
  }, []);

  return {
    conversations: communicationStore.getConversations(),
    getConversation: (id: string) => communicationStore.getConversation(id),
    createConversation: (data: Parameters<typeof communicationStore.createConversation>[0]) =>
      communicationStore.createConversation(data),
    sendMessage: (
      conversationId: string,
      sender: "visitor" | "owner",
      senderName: string,
      text: string,
      attachments?: Attachment[],
    ) => communicationStore.sendMessage(conversationId, sender, senderName, text, attachments),
    updateStatus: (id: string, status: ConversationStatus) =>
      communicationStore.updateStatus(id, status),
    updatePriority: (id: string, priority: ConversationPriority) =>
      communicationStore.updatePriority(id, priority),
    toggleStar: (id: string) => communicationStore.toggleStar(id),
    togglePin: (id: string) => communicationStore.togglePin(id),
    toggleArchive: (id: string) => communicationStore.toggleArchive(id),
    addInternalNote: (id: string, text: string) => communicationStore.addInternalNote(id, text),
    deleteInternalNote: (id: string, noteId: string) =>
      communicationStore.deleteInternalNote(id, noteId),
    markAsRead: (id: string, forWho: "admin" | "visitor") =>
      communicationStore.markAsRead(id, forWho),
    analytics: communicationStore.getAnalytics(),
  };
}
