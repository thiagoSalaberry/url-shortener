type UrlRecord = {
  id: number;
  original_url: string;
  short_url: string;
  created_at: Date;
  hit_count: number;
};
//API RESPONSES
type UrlResponse = {
  message: string;
  url: string;
};
