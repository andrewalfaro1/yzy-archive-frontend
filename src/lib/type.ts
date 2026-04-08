export interface Video {
  id: string;
  title: string;
  description: string;
  video_file:  { id: string };
  thumbnail: { id: string };
  tags: string[];
  duration: number;
  views: number;
  upload_date: string;
}

