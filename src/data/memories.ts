import { PolaroidPhoto, DiaryEntry } from '../types';

export const INITIAL_PHOTOS: PolaroidPhoto[] = [
  {
    id: 'photo1',
    title: 'Coaching Days Partner',
    caption: 'Coaching days & endless laughs 🏫✨',
    defaultImage: 'https://raw.githubusercontent.com/ramlalapatel/Bauni/main/photo1.jpg',
    fallbackImage: 'https://raw.githubusercontent.com/ramlalapatel/Bauni/master/photo1.jpg',
    rotation: -3,
    date: 'Coaching Days, 5:30 PM',
    tag: 'Unstoppable Giggles',
    memoryStory: 'From sitting together on the coaching benches trying not to burst out laughing in class, to racing down the stairs the second the bell rang. The best partner in crime!'
  },
  {
    id: 'photo2',
    title: 'Car Vibes & Casual Fits',
    caption: 'Casual hangs, car rides & good vibes 🚗💫',
    defaultImage: 'https://raw.githubusercontent.com/ramlalapatel/Bauni/main/photo2.jpg',
    fallbackImage: 'https://raw.githubusercontent.com/ramlalapatel/Bauni/master/photo2.jpg',
    rotation: 2.5,
    date: 'Unfiltered Days',
    tag: 'Pure Comfort',
    memoryStory: 'Zero awkwardness, 100% comfort. Just casual conversations, inside jokes that nobody else understands, and endless gossip.'
  },
  {
    id: 'photo3',
    title: 'The Iconic Radiant Smile',
    caption: 'That gorgeous Khushi smile ✨🌸',
    defaultImage: 'https://raw.githubusercontent.com/ramlalapatel/Bauni/main/photo3.jpg',
    fallbackImage: 'https://raw.githubusercontent.com/ramlalapatel/Bauni/master/photo3.jpg',
    rotation: -2,
    date: 'Pure Glow',
    tag: 'Classic Bauni Vibe',
    memoryStory: 'Effortlessly radiant! No matter how stressful coaching or life gets, that smile and infectious energy always light up the whole room.'
  },
  {
    id: 'photo4',
    title: 'The Ultimate Street Food Face-off',
    caption: 'Momos vs Golgappe: The Sacred Ritual 🥟💥',
    defaultImage: 'https://raw.githubusercontent.com/ramlalapatel/Bauni/main/photo4.jpg',
    fallbackImage: 'https://raw.githubusercontent.com/ramlalapatel/Bauni/master/photo4.jpg',
    rotation: 3,
    date: 'Every Evening Routine',
    tag: 'Extra Teekha Pani',
    memoryStory: 'Piping hot steamed momos with fiery red chutney on one side, crispy golgappe bursting with tangy spicy mint water on the other. Our post-class debate that always ended in ordering both!'
  }
];

export const DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: 'entry-1',
    title: 'The 5:15 PM Golgappe Sprint',
    tag: 'Street Food Chronicles',
    iconType: 'golgappe',
    preview: 'The bell would ring, and before the teacher could assign homework, our eye contact said everything...',
    fullStory: 'The bell would ring, and before the teacher could even close the textbook, our eye contact said everything. We had 15 minutes before the crowd piled up at the corner stall. You always demanded "extra teekha", drank the spicy mint water like a champion, and made sure we got two complimentary papdis at the end.',
    favoriteFoodQuote: '"Bhaiya thoda aur teekha banana!"'
  },
  {
    id: 'entry-2',
    title: 'The Great Momos & Gossip Summit',
    tag: 'Coaching Drama Debrief',
    iconType: 'momos',
    preview: 'One plate steamed, extra spicy red chutney, and exactly 45 minutes of breaking down everyone in batch B...',
    fullStory: 'One plate of piping hot steamed momos, the kind that burns your tongue but tastes heavenly. We would sit on the nearby boundary wall, dissecting the latest coaching rumors, discussing how impossible the mock tests were, and laughing till our stomachs ached.',
    favoriteFoodQuote: '"Steamed momos with red chutney fix every bad test score."'
  },
  {
    id: 'entry-3',
    title: 'Corner Bench Whispers & Silent Giggles',
    tag: 'Coaching Class Survival',
    iconType: 'coaching',
    preview: 'Trying not to laugh while the sir stared directly in our direction was an extreme sport...',
    fullStory: 'Trying not to laugh when we made eye contact across the wooden benches was genuinely harder than the entire physics syllabus. Passing silly sticky notes, drawing caricatures in the margins of formulas, and surviving three-hour lectures together.',
    favoriteFoodQuote: '"Don\'t look at me or we\'ll both get kicked out of class."'
  }
];

export const FRIENDSHIP_STATS = [
  { label: 'Origin Story', value: 'Coaching Benches', icon: '🏫' },
  { label: 'Golgappe Eaten', value: '10,000+', icon: '🥟' },
  { label: 'Miles Apart', value: 'Many', icon: '📍' },
  { label: 'Bond Difference', value: '0.00%', icon: '✨' },
];
