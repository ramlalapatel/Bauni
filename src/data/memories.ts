import { PolaroidPhoto, DiaryEntry } from '../types';

export const INITIAL_PHOTOS: PolaroidPhoto[] = [
  {
    id: 'photo1',
    title: 'That Unfiltered Laughter',
    caption: "That evening we couldn't stop laughing",
    // Beautiful warm illustrated placeholder evoking golden hour coaching days laughter
    defaultImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80',
    rotation: -3,
    date: 'Coaching Days, 5:30 PM',
    tag: 'Unstoppable Giggles',
    memoryStory: 'We were supposed to be solving mock exam question papers, but one silly joke set us off. We spent the entire break wiping tears of laughter by the staircase.'
  },
  {
    id: 'photo2',
    title: 'The Street Food Ritual',
    caption: 'Golgappe runs after coaching 🥟💦',
    defaultImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
    rotation: 2.5,
    date: 'Post-Class Rush',
    tag: 'Extra Teekha Pani',
    memoryStory: 'No coaching class was complete without racing to our favorite street vendor. "Bhaiya ek aur sukha puri dena!" was our sacred anthem.'
  },
  {
    id: 'photo3',
    title: 'The Pink Floral Outfit',
    caption: 'Momos + gossip = perfect combo',
    // Delicate pink floral with maroon tones matching the user description
    defaultImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    rotation: -2,
    date: 'Momos & Life Updates',
    tag: 'Pink & Maroon Vibe',
    memoryStory: 'Remember this day? Red spicy momos chutney, non-stop drama debriefs, and you looking effortlessly radiant in that pink floral fit.'
  },
  {
    id: 'photo4',
    title: 'Unfiltered Us',
    caption: 'Just us being us',
    defaultImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80',
    rotation: 3,
    date: 'Forever Best Friends',
    tag: 'Pure Gold',
    memoryStory: 'Zero filter, 100% drama, endless support. Through all the stressful coaching tests and life changes, some things stay eternally rock solid.'
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
