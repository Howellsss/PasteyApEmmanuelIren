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
    image: '/images/teachings/grace-of-giving.webp',
    imagePosition: 'center 34%',
    watchUrl: 'https://youtu.be/53oy7e5CTKQ',
  },
  {
    series: 'The Word',
    title: 'The God Who Blesses',
    description: 'A powerful message on the nature of God as the One who blesses — and what it means to walk in His covenant promises.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/god-who-blesses-3.webp',
    imagePosition: 'center 70%',
    watchUrl: 'https://youtu.be/WWDlFiYpBOY',
  },
  {
    series: 'The Word',
    title: 'Fervent in Spirit',
    description: 'Rekindling the flame of spiritual fervency and learning how to maintain a burning heart in every season of life.',
    date: 'September 2025',
    type: 'Video',
    image: '/images/teachings/fervent-in-spirit-2.webp',
    imagePosition: 'center 36%',
    watchUrl: 'https://www.youtube.com/watch?v=x71RhblDHdE',
  },
];

export interface Book {
  title: string;
  theme: string;
  description: string;
  cover: string;
  /** Where the book is sold: its page in the Flutterwave store. */
  url: string;
}

export const BOOK_STORE_URL = 'https://flutterwave.com/store/emmanuelirenbooks';

/** His books, with their covers and store links. */
export const books: Book[] = [
  {
    title: 'Leading Seeks You',
    theme: 'Leadership',
    description: 'On the call to lead — why leadership is not a title to chase but a responsibility that finds the faithful.',
    cover: '/images/books/leading-seeks-you.webp',
    url: BOOK_STORE_URL,
  },
  {
    title: 'Purposefully',
    theme: 'Purpose',
    description: 'On discovering, developing and deploying the purpose God placed in you, one deliberate step at a time.',
    cover: '/images/books/purposefully.webp',
    url: BOOK_STORE_URL,
  },
  {
    title: 'Saving Grace',
    theme: 'Grace',
    description: 'On the grace of God that saves and then keeps teaching us how to live.',
    cover: '/images/books/saving-grace.webp',
    url: BOOK_STORE_URL,
  },
  {
    title: 'LoveCode',
    theme: 'Love & relationships',
    description: 'On love as God designed it — for friendships, courtship and marriage built to last.',
    cover: '/images/books/lovecode.webp',
    url: BOOK_STORE_URL,
  },
  {
    title: 'Am I Being Fooled?',
    theme: 'Discernment',
    description: 'On discernment: learning to tell truth from error in a world full of voices.',
    cover: '/images/books/am-i-being-fooled.webp',
    url: BOOK_STORE_URL,
  },
  {
    title: 'Pray Book',
    theme: 'Prayer',
    description: 'A companion for a life of prayer — practical, scriptural and honest about how prayer really works.',
    cover: '/images/books/pray-book.webp',
    url: BOOK_STORE_URL,
  },
];

export interface MediaSection {
  label: string;
  path: string;
  blurb: string;
}

/** The Media menu, in order. Sermons, series and study notes live on the Teaching page. */
export const mediaSections: MediaSection[] = [
  { label: 'Overview', path: '/media', blurb: 'Everything in one place.' },
  { label: 'Gallery', path: '/media/gallery', blurb: 'Photographs from the pulpit, the studio and beyond.' },
  { label: 'Films', path: '/media/films', blurb: 'Films he has produced, and where to watch them.' },
  { label: 'Music', path: '/media/music', blurb: 'Albums, singles and official music videos.' },
  { label: 'Podcast', path: '/media/podcast', blurb: 'Endless Life: sermons and teachings to listen to.' },
  { label: 'The Irens', path: '/media/the-irens', blurb: 'Emmanuel and Laju Iren, and their family.' },
  { label: 'The Books', path: '/media/books', blurb: 'Six books for a practical life of faith.' },
];

/** Series in the teaching library, listed on the Teaching page. */
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

export type GalleryCategory = 'On stage' | 'Portraits' | 'Studio';

export interface GalleryPhoto {
  src: string;
  alt: string;
  category: GalleryCategory;
}

/** Photographs for the Gallery, in display order. */
export const galleryPhotos: GalleryPhoto[] = [
  { src: '/images/teachings/ee26a11e-6a6d-46ab-8ac2-7450784831e3.webp', alt: 'Emmanuel Iren preaching, one finger raised', category: 'On stage' },
  { src: '/images/about/image.webp', alt: 'Emmanuel Iren in a blue suit, smiling', category: 'Portraits' },
  { src: '/images/creative/image copy 2.webp', alt: 'Emmanuel Iren at a podcast desk with a microphone', category: 'Studio' },
  { src: '/images/teachings/god-who-blesses.webp', alt: 'Emmanuel Iren preaching in a red suit', category: 'On stage' },
  { src: '/images/creative/e5.webp', alt: 'Emmanuel Iren seated, hand on his chin', category: 'Portraits' },
  { src: '/images/hero/image copy 11.webp', alt: 'Emmanuel Iren reaching out to a full congregation', category: 'On stage' },
  { src: '/images/creative/image copy 3.webp', alt: 'Emmanuel Iren speaking into a microphone in a conversation', category: 'Studio' },
  { src: '/images/teachings/image copy.webp', alt: 'Emmanuel Iren in a plum suit against a pink backdrop', category: 'Portraits' },
  { src: '/images/about/image copy.webp', alt: 'Emmanuel Iren on stage in black and white', category: 'On stage' },
  { src: '/images/creative/image copy.webp', alt: 'Emmanuel Iren in a green knit, seated', category: 'Portraits' },
  { src: '/images/teachings/fervent-in-spirit.webp', alt: 'Emmanuel Iren preaching in a white shirt', category: 'On stage' },
  { src: '/images/hero/image copy 3.webp', alt: 'Emmanuel Iren at a desk with a tablet', category: 'Studio' },
  { src: '/images/teachings/image copy 2.webp', alt: 'Emmanuel Iren in a navy suit against wood panelling', category: 'Portraits' },
  { src: '/images/hero/image copy 12.webp', alt: 'Emmanuel Iren on a pink-lit stage', category: 'On stage' },
  { src: '/images/creative/image.webp', alt: 'Emmanuel Iren in a grey jacket, seated', category: 'Portraits' },
  { src: '/images/teachings/image copy 4.webp', alt: 'Emmanuel Iren mid-sermon, hand raised', category: 'On stage' },
  { src: '/images/ministry/e6.webp', alt: 'Emmanuel Iren in a pinstripe suit and red tie', category: 'Portraits' },
  { src: '/images/hero/image copy 13.webp', alt: 'Emmanuel Iren on a red-lit stage', category: 'On stage' },
  { src: '/images/creative/image copy 4.webp', alt: 'Emmanuel Iren under a spotlight in black and white', category: 'On stage' },
  { src: '/images/teachings/image copy 5.webp', alt: 'Emmanuel Iren preaching to the congregation', category: 'On stage' },
  { src: '/images/hero/image copy 10.webp', alt: 'Emmanuel Iren on stage in black and white, wide', category: 'On stage' },
];

/** Where enquiries, invitations and messages from the site go. */
export const CONTACT_EMAIL = 'Emmanuelirenassist@gmail.com';

/* ── Films, music and podcast ─────────────────────────────────────────── */

export interface Film {
  title: string;
  year?: string;
  role: string;
  description: string;
  /** The YouTube video the card opens. */
  videoId: string;
  /** What the video is, shown on the button. */
  watchLabel: string;
  /** maxresdefault exists for this video's thumbnail. */
  hiRes?: boolean;
}

export const films: Film[] = [
  {
    title: 'What About Us?',
    year: '2024',
    role: 'Executive producer',
    description:
      'His cinema debut as executive producer: a film about marriage, relationship struggles and the challenges Christian couples face, starring Kunle Remi, Folu Storms and Uzor Arukwe.',
    videoId: 'RHHZdMU9-m0',
    watchLabel: 'Watch the official trailer',
    hiRes: true,
  },
  {
    title: 'Up Next: LOVE',
    year: '2025',
    role: 'Narrative Entertainment',
    description:
      'A film released on YouTube on 7 October 2025, exploring modern love and relationships — a move toward digital-first film distribution.',
    videoId: 'FMduWO_X930',
    watchLabel: 'Watch the full film',
    hiRes: true,
  },
  {
    title: 'Meltdown',
    year: '2026',
    role: 'Story & executive producer',
    description: 'A drama exploring anger, trauma, identity and emotional healing, with a spotlight on men’s mental health.',
    videoId: 'zA3eOjLtUic',
    watchLabel: 'Watch the official trailer',
    hiRes: true,
  },
  {
    title: 'Nigerian Son',
    year: '2020',
    role: 'Executive producer',
    description: 'An eight-minute Nigerian drama written and directed by Laju Iren, starring Ifeanyi Kalu and Uche Leona.',
    videoId: 'jmsoYq6Yy1o',
    watchLabel: 'Watch the full film',
    hiRes: true,
  },
];

export const filmChannels = [
  {
    name: 'Emmanuel Iren Live',
    description: 'Sermons, worship sessions, music videos, Bible teaching, Q&A sessions and conversations about relationships and Christian living.',
    url: 'https://www.youtube.com/@pst_iren',
  },
  {
    name: 'Narrative Entertainment',
    description: 'His film production venture, telling culturally relevant stories about relationships, family and human experience.',
    url: 'https://www.youtube.com/@thenarrativentertainment',
  },
];

export const musicProfiles = [
  {
    name: 'Spotify',
    description: 'His gospel music, including Anointed, Agbára Olórun Pọ̀, Shekinah and Holy Ghost (Live).',
    url: 'https://open.spotify.com/artist/1Ge81wiDXhRxTHVE1pdHyw',
    art: '/images/music/spirituals.webp',
    artAlt: 'Spirituals album cover',
    action: 'Open on Spotify',
  },
  {
    name: 'Apple Music',
    description: 'His albums, singles and collaborations — Kerygma, Apostolos: Sounds of Transition and Spirituals.',
    url: 'https://music.apple.com/us/artist/pastor-emmanuel-iren/1575782783',
    art: '/images/music/apostolos.webp',
    artAlt: 'Apostolos: Sounds of Transition album cover',
    action: 'Open on Apple Music',
  },
];

export interface MusicVideo {
  id: string;
  title: string;
  featuring?: string;
  duration: string;
  hiRes: boolean;
}

/** Official music videos from his YouTube channel, newest first. */
export const musicVideos: MusicVideo[] = [
  { id: '47IAfOSHbuc', title: 'Anointed', featuring: 'Godswill Oyor', duration: '7:05', hiRes: true },
  { id: 'zkLXuzx2-M0', title: 'I Believe', featuring: 'Joybliss', duration: '6:01', hiRes: true },
  { id: '9C4RqeQRAvI', title: 'Sing Over Me', featuring: '121Selah', duration: '7:03', hiRes: true },
  { id: 'hvNfJPQlbVg', title: 'Shekinah', featuring: 'Sunmisola Agbebi', duration: '7:00', hiRes: true },
  { id: 'aQ1TzUjA_sM', title: 'Lead Me', duration: '6:28', hiRes: true },
  { id: '4-GtqBrVIW0', title: 'Agbára Olórun Pọ̀', featuring: 'Yetunde Are', duration: '6:11', hiRes: true },
  { id: 'ZiBlRxdy3Cs', title: 'Agalliao', featuring: 'Nathaniel Bassey', duration: '6:13', hiRes: true },
  { id: 'dVtxHoSWlws', title: 'Glory of the Lord Reveals', duration: '5:27', hiRes: true },
  { id: 'h8iN2_9t64M', title: 'Holy Ghost', featuring: 'Sinach', duration: '7:04', hiRes: true },
  { id: 'hGZiTRreJ9g', title: 'Power in Abundance', featuring: 'Bajulaye Victor', duration: '5:35', hiRes: true },
  { id: 'UrGZuaaYTV0', title: 'Apostolos', duration: '3:06', hiRes: false },
  { id: 'EermVGUEShc', title: 'Overcome', featuring: 'E-Daniels', duration: '5:40', hiRes: true },
  { id: 'xDk3VqPHD4A', title: 'Grace Changes Everything', featuring: 'Sinach', duration: '6:45', hiRes: true },
  { id: 'WIhPlP6nwqc', title: 'Fire on My Altar', duration: '5:32', hiRes: true },
  { id: 'fjVJpUSaKXk', title: 'Prophetic Chant (Ayayaya)', featuring: 'Nosa', duration: '6:16', hiRes: false },
  { id: 'pgNueU7ajLk', title: 'The Glory', featuring: 'Outburst Music Group', duration: '8:04', hiRes: true },
];

export const podcast = {
  name: 'Endless Life with Emmanuel Iren',
  tag: 'Official sermons podcast',
  description:
    'The official Celebration Church International audio feed: Apostle Emmanuel Iren’s sermons, Bible teachings and messages for Christian living, updated twice weekly.',
  art: '/images/music/endless-life-podcast.webp',
  links: [
    { label: 'Listen on Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/celebration-church-international/id1482679477' },
    { label: 'Listen on Spotify', url: 'https://open.spotify.com/show/72UnJcDWdTnhHnYw25mvGS' },
  ],
};

/** The ministries' own homes on the web. */
export const ministryLinks: Record<string, { url: string; label: string }> = {
  'Celebration Church International': { url: 'https://joincci.org/', label: 'Visit joincci.org' },
  Manifest: { url: 'https://www.instagram.com/manifestbiblecourse/', label: 'Follow Manifest on Instagram' },
  Triumph30: { url: 'https://www.youtube.com/@t30devotion', label: 'Watch Triumph30 on YouTube' },
  Outburst: { url: 'https://www.youtube.com/@outburstmusic4444', label: 'Watch Outburst on YouTube' },
};

/** A YouTube thumbnail for a video id, at the best size the video has. */
export const youtubeThumb = (id: string, hiRes = false) => `https://i.ytimg.com/vi/${id}/${hiRes ? 'maxresdefault' : 'hqdefault'}.jpg`;
export const youtubeWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
