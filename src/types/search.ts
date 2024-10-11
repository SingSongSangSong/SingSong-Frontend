interface SearchRecentType {
  id: number;
  date: string;
  recentText: string;
}

interface SearchLogResponse {
  data: {
    searchTexts: string[];
  };
  message: string;
}

export type {SearchRecentType, SearchLogResponse};
