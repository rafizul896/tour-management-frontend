export interface DivisionTravelInfo {
  slug: string;
  bestPlaces: string[];
  foods: string[];
  culture: string;
  nature: string;
  history: string;
  activities: string[];
  bestSeason: string;
  idealFor: string[];
  topAttraction: string;
}

export const divisionTravelInfo: Record<string, DivisionTravelInfo> = {
  "dhaka-division": {
    slug: "dhaka-division",
    bestPlaces: [
      "Lalbagh Fort",
      "Ahsan Manzil",
      "National Parliament House",
      "Old Dhaka",
      "Sonargaon",
    ],
    foods: ["Kacchi Biryani", "Bakarkhani", "Old Dhaka street food"],
    culture:
      "A 400-year-old capital where Mughal forts, colonial-era architecture, and modern high-rises sit within walking distance of each other.",
    nature: "Buriganga River boat life and pockets of green around Ramna Park.",
    history:
      "Former Mughal provincial capital, home to some of South Asia's best-preserved 17th-century forts and mosques.",
    activities: ["Heritage walks", "River boat rides", "Street food tours"],
    bestSeason: "Winter (Nov–Feb)",
    idealFor: ["History", "Food", "Culture"],
    topAttraction: "Lalbagh Fort",
  },
  "chattogram-division": {
    slug: "chattogram-division",
    bestPlaces: [
      "Cox's Bazar",
      "Sajek Valley",
      "Bandarban",
      "Rangamati",
      "Patenga Beach",
    ],
    foods: ["Mezban Beef", "Kala Bhuna", "Shutki (dried fish)"],
    culture:
      "A hill-and-coast region shaped by the port city's trade history and the indigenous communities of the Chittagong Hill Tracts.",
    nature:
      "The world's longest natural sea beach, cloud-covered hill valleys, and the Kaptai Lake basin.",
    history:
      "A centuries-old maritime trading port, later a key hill-tract frontier region.",
    activities: ["Beach days", "Hill trekking", "Lake cruising"],
    bestSeason: "Winter (Nov–Feb)",
    idealFor: ["Beach", "Mountains", "Adventure"],
    topAttraction: "Cox's Bazar",
  },
  "sylhet-division": {
    slug: "sylhet-division",
    bestPlaces: [
      "Jaflong",
      "Ratargul Swamp Forest",
      "Bisnakandi",
      "Srimangal",
      "Lawachara National Park",
    ],
    foods: ["Seven-layer tea", "Satkora beef", "Traditional Sylheti dishes"],
    culture:
      "Rolling tea gardens and Sufi shrine towns, with a distinct Sylheti dialect and diaspora identity.",
    nature: "Freshwater swamp forest, rainforest, and terraced tea estates.",
    history: "Long-standing center of Sufism, dotted with shrines and old zamindar estates.",
    activities: ["Tea garden walks", "Boat trips through Ratargul", "Wildlife spotting"],
    bestSeason: "Monsoon (Jun–Sep) & Winter",
    idealFor: ["Nature", "Tea & Nature", "Romantic"],
    topAttraction: "Jaflong",
  },
  "khulna-division": {
    slug: "khulna-division",
    bestPlaces: [
      "Sundarbans",
      "Bagerhat",
      "Sixty Dome Mosque",
      "Karamjal Wildlife Centre",
    ],
    foods: ["Chui Jhal", "Seafood", "Prawn dishes"],
    culture:
      "Life shaped by the world's largest mangrove forest — fishing communities, honey collectors, and river trade.",
    nature: "The Sundarbans mangrove forest, home to the Bengal tiger.",
    history: "A UNESCO World Heritage mosque city dating to the 15th century.",
    activities: ["Sundarbans boat safaris", "Wildlife watching", "Heritage mosque tours"],
    bestSeason: "Winter (Nov–Feb)",
    idealFor: ["Wildlife", "Nature", "Adventure"],
    topAttraction: "Sundarbans",
  },
  "rajshahi-division": {
    slug: "rajshahi-division",
    bestPlaces: [
      "Puthia Temple Complex",
      "Varendra Research Museum",
      "Mahasthangarh",
      "Padma River",
      "Bagha Mosque",
    ],
    foods: ["Mango", "Kalai Ruti", "Local sweets"],
    culture:
      "Known as Bangladesh's silk and mango capital, with some of the country's oldest archaeological sites nearby.",
    nature: "The wide Padma River and mango orchards stretching across the plains.",
    history: "Home to Mahasthangarh, among the oldest urban archaeological sites in Bengal.",
    activities: ["Temple complex tours", "River sunsets", "Mango orchard visits"],
    bestSeason: "Winter (Nov–Feb)",
    idealFor: ["History", "Food", "Culture"],
    topAttraction: "Puthia Temple Complex",
  },
  "barishal-division": {
    slug: "barishal-division",
    bestPlaces: ["Floating Guava Market", "Kuakata", "Durga Sagar", "Guthia Mosque"],
    foods: ["Hilsa", "Pitha", "River fish"],
    culture:
      "The 'Venice of Bengal' — a delta region where rivers and canals are the main streets.",
    nature: "A dense network of rivers, canals, and the Kuakata sea beach where sunrise and sunset are both visible.",
    history: "Centuries-old river trade routes that still define the region's floating markets.",
    activities: ["Floating market tours", "River cruising", "Beach visits"],
    bestSeason: "Winter (Nov–Feb)",
    idealFor: ["Rivers", "Beach", "Family"],
    topAttraction: "Floating Guava Market",
  },
  "rangpur-division": {
    slug: "rangpur-division",
    bestPlaces: ["Tajhat Palace", "Kantajew Temple", "Teesta River", "Ramsagar"],
    foods: ["Local rice dishes", "Pitha", "Traditional northern cuisine"],
    culture:
      "A northern agricultural heartland with intricate terracotta temple architecture and riverside village life.",
    nature: "The Teesta River basin and wide open northern plains.",
    history: "Home to the ornate 18th-century Kantajew Temple, a landmark of Bengal terracotta art.",
    activities: ["Palace and temple tours", "River-side walks", "Rural village visits"],
    bestSeason: "Winter (Nov–Feb)",
    idealFor: ["Heritage", "Nature", "History"],
    topAttraction: "Kantajew Temple",
  },
  "mymensingh-division": {
    slug: "mymensingh-division",
    bestPlaces: [
      "Muktagacha",
      "Shashi Lodge",
      "Bangladesh Agricultural University campus",
      "Brahmaputra River",
    ],
    foods: ["Muktagacha Monda", "River fish", "Traditional Bengali dishes"],
    culture:
      "A quieter riverside division known for its zamindar-era estates and a famous local sweet tradition.",
    nature: "The old Brahmaputra riverbank and lush university-town greenery.",
    history: "Zamindar palaces like Shashi Lodge reflect the region's 19th-century landed-gentry era.",
    activities: ["Heritage estate tours", "Riverside walks", "Local sweet tasting"],
    bestSeason: "Winter (Nov–Feb)",
    idealFor: ["Culture", "History", "Family"],
    topAttraction: "Shashi Lodge",
  },
};

/**
 * Looks up static travel content for a division from the API.
 * Falls back to a name-derived key if the API slug doesn't match
 * the "name-division" convention used above.
 */
export function getDivisionInfo(division: {
  slug?: string;
  name: string;
}): DivisionTravelInfo | undefined {
  if (division.slug && divisionTravelInfo[division.slug]) {
    return divisionTravelInfo[division.slug];
  }
  const fallbackKey = `${division.name.toLowerCase()}-division`;
  return divisionTravelInfo[fallbackKey];
}

export const travelStyles = [
  { value: "beach", label: "Beach", emoji: "🏖️", divisions: ["Chattogram", "Barishal"] },
  { value: "mountains", label: "Mountains", emoji: "🏔️", divisions: ["Chattogram"] },
  { value: "nature", label: "Nature", emoji: "🌿", divisions: ["Sylhet", "Khulna"] },
  { value: "wildlife", label: "Wildlife", emoji: "🐅", divisions: ["Khulna"] },
  { value: "history", label: "History", emoji: "🏛️", divisions: ["Dhaka", "Rajshahi"] },
  { value: "food", label: "Food", emoji: "🍛", divisions: ["Dhaka", "Rajshahi"] },
  { value: "adventure", label: "Adventure", emoji: "🏕️", divisions: ["Chattogram", "Khulna"] },
  { value: "romantic", label: "Romantic", emoji: "❤️", divisions: ["Sylhet", "Barishal"] },
  { value: "family", label: "Family", emoji: "👨‍👩‍👧", divisions: ["Barishal", "Mymensingh"] },
] as const;

export const comparisonTable = [
  { division: "Dhaka", bestFor: "History & Culture", season: "Winter", attraction: "Lalbagh Fort", food: "Kacchi Biryani" },
  { division: "Chattogram", bestFor: "Beach & Hills", season: "Winter", attraction: "Cox's Bazar", food: "Mezban Beef" },
  { division: "Sylhet", bestFor: "Tea & Nature", season: "Monsoon / Winter", attraction: "Jaflong", food: "Seven-layer tea" },
  { division: "Khulna", bestFor: "Wildlife", season: "Winter", attraction: "Sundarbans", food: "Chui Jhal" },
  { division: "Rajshahi", bestFor: "History & Food", season: "Winter", attraction: "Puthia Temple", food: "Mango" },
  { division: "Barishal", bestFor: "Rivers & Beaches", season: "Winter", attraction: "Floating Market", food: "Hilsa" },
  { division: "Rangpur", bestFor: "Heritage & Nature", season: "Winter", attraction: "Kantajew Temple", food: "Pitha" },
  { division: "Mymensingh", bestFor: "Culture & Riverside", season: "Winter", attraction: "Shashi Lodge", food: "Muktagacha Monda" },
];

export const seasons = [
  {
    id: "winter",
    name: "Winter",
    range: "November – February",
    best: ["Cox's Bazar", "Sundarbans", "Dhaka sightseeing", "Rajshahi", "Historical tours", "Road trips"],
    isBestOverall: true,
  },
  {
    id: "spring",
    name: "Spring",
    range: "March – April",
    best: ["Sylhet", "Tea gardens", "Nature trips", "Cultural experiences"],
    isBestOverall: false,
  },
  {
    id: "monsoon",
    name: "Monsoon",
    range: "June – September",
    best: ["Sylhet waterfalls", "Ratargul", "River journeys", "Green landscapes", "Haor areas"],
    isBestOverall: false,
  },
  {
    id: "autumn",
    name: "Autumn",
    range: "October",
    best: ["Beaches", "Hills", "Nature", "Photography"],
    isBestOverall: false,
  },
];

export const cultureCards = [
  { title: "Heritage", description: "Centuries-old forts, temples, and mosques spanning Mughal, Sultanate, and colonial eras." },
  { title: "Folk Culture", description: "Baul music, jatra folk theatre, and oral storytelling traditions passed down for generations." },
  { title: "Local Crafts", description: "Nakshi kantha embroidery, terracotta work, and Sylheti and Rajshahi silk weaving." },
  { title: "Festivals", description: "Pohela Boishakh, Nabanna, and regional harvest festivals that bring entire villages together." },
  { title: "Indigenous Communities", description: "Distinct traditions of the Chakma, Marma, Garo, and other communities across the hill and plains regions." },
  { title: "River Life", description: "Fishing villages, floating markets, and a way of life still built around the rhythm of the rivers." },
];