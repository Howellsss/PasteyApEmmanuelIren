/**
 * Media content shared by the home page and the Media section: recent messages (with their real
 * YouTube links), the books, the dropdown sections and the archive of series.
 */

export interface Message {
  series: string;
  title: string;
  description: string;
  date: string;
  type: string;
  image: string;
  imagePosition: string;
  watchUrl: string;
}

/** The most recent messages, newest first; each opens on YouTube. */
export const messages: Message[] = [
  {
    series: 'The Word',
    title: 'Vigour: Stewarding the Body',
    description: 'A life-changing teaching on how God calls us to honour Him through the careful stewardship of our physical bodies.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 3.webp',
    imagePosition: 'center center',
    watchUrl: 'https://www.youtube.com/watch?v=iZAt3VZMJAI',
  },
  {
    series: 'The Word',
    title: "God's Good Design",
    description: "Discover the intentionality behind God's design for your life — purpose, pattern, and the beauty of His sovereign plan.",
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 4.webp',
    imagePosition: 'center center',
    watchUrl: 'https://www.youtube.com/live/qsTHhh7f8pQ',
  },
  {
    series: 'The Word',
    title: 'The Grace of Giving',
    description: 'Understanding giving not as an obligation but as a grace — a reflection of the generosity God has already shown us.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/image copy 5.webp',
    imagePosition: 'center center',
    watchUrl: 'https://youtu.be/53oy7e5CTKQ',
  },
  {
    series: 'The Word',
    title: 'The God Who Blesses',
    description: 'A powerful message on the nature of God as the One who blesses — and what it means to walk in His covenant promises.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/god-who-blesses.webp',
    imagePosition: 'center 22%',
    watchUrl: 'https://youtu.be/WWDlFiYpBOY',
  },
  {
    series: 'The Word',
    title: 'Fervent in Spirit',
    description: 'Rekindling the flame of spiritual fervency and learning how to maintain a burning heart in every season of life.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/fervent-in-spirit.webp',
    imagePosition: 'center 30%',
    watchUrl: 'https://www.youtube.com/watch?v=x71RhblDHdE',
  },
];

export interface Book {
  title: string;
  theme: string;
  description: string;
}

/** His books, as listed on the About page. Covers are set typographically until artwork is supplied. */
export const books: Book[] = [
  {
    title: 'Leading Seeks You',
    theme: 'Leadership',
    description: 'On the call to lead — why leadership is not a title to chase but a responsibility that finds the faithful.',
  },
  {
    title: 'Purposefully',
    theme: 'Purpose',
    description: 'On discovering, developing and deploying the purpose God placed in you, one deliberate step at a time.',
  },
  {
    title: 'Saving Grace',
    theme: 'Grace',
    description: 'On the grace of God that saves and then keeps teaching us how to live.',
  },
  {
    title: 'LoveCode',
    theme: 'Love & relationships',
    description: 'On love as God designed it — for friendships, courtship and marriage built to last.',
  },
  {
    title: 'Am I Being Fooled?',
    theme: 'Discernment',
    description: 'On discernment: learning to tell truth from error in a world full of voices.',
  },
  {
    title: 'Pray Book',
    theme: 'Prayer',
    description: 'A companion for a life of prayer — practical, scriptural and honest about how prayer really works.',
  },
];

export interface MediaSection {
  label: string;
  path: string;
  blurb: string;
}

/** The Media menu, in order. */
export const mediaSections: MediaSection[] = [
  { label: 'Overview', path: '/media', blurb: 'Everything in one place.' },
  { label: 'Reels', path: '/media/reels', blurb: 'Short moments from recent messages.' },
  { label: 'Messages', path: '/media/messages', blurb: 'Full sermons and teachings to watch.' },
  { label: 'Message Resources', path: '/media/resources', blurb: 'Notes, scriptures and study guides.' },
  { label: 'The Irens', path: '/media/the-irens', blurb: 'Emmanuel and Laju Iren, and their family.' },
  { label: 'The Books', path: '/media/books', blurb: 'Six books for a practical life of faith.' },
  { label: 'Archive', path: '/media/archive', blurb: 'Past series, gathered in one place.' },
];

/** Series in the teaching library, for the Archive. */
export const archiveSeries = [
  { title: 'The Word', kind: 'Sunday series', description: 'Sunday teachings from Celebration Church International.' },
  { title: 'The Gospel of Grace', kind: 'Series', description: 'Grace as God’s instruction for a life that honours Him.' },
  { title: 'Faith in Practice', kind: 'Series', description: 'What it looks like to walk by faith on ordinary days.' },
  { title: 'The Grace Advantage', kind: 'Series', description: 'Living from the advantage grace gives the believer.' },
  { title: '100 Days of Discipleship', kind: 'Programme', description: 'A hundred days of guided growth in following Christ.' },
  { title: 'Purposefully', kind: 'Series', description: 'Discovering, developing and deploying purpose.' },
  { title: 'Leading Seeks You', kind: 'Teaching', description: 'Leadership as a call to faithfulness.' },
  { title: 'Saving Grace', kind: 'Bible study', description: 'A verse-by-verse study on the grace that saves.' },
  { title: 'Endless Life', kind: 'Podcast', description: 'Conversations on faith, purpose and the Christian life.' },
  { title: 'Triumph30', kind: 'Gathering', description: 'Thirty days of prayer, fasting and spiritual renewal.' },
  { title: 'Manifest', kind: 'Conference', description: 'Worship and the word for a generation seeking God.' },
];
