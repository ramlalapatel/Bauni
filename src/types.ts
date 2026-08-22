export interface PolaroidPhoto {
  id: string;
  title: string;
  caption: string;
  defaultImage: string;
  customImage?: string;
  rotation: number;
  date?: string;
  tag?: string;
  memoryStory: string;
}

export interface DiaryEntry {
  id: string;
  title: string;
  tag: string;
  iconType: 'golgappe' | 'momos' | 'coaching' | 'tea';
  preview: string;
  fullStory: string;
  favoriteFoodQuote: string;
}
