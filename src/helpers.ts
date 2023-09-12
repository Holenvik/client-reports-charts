export const generateRandomName = () => {
  const adjectives = [
    "Happy",
    "Funny",
    "Clever",
    "Silly",
    "Awesome",
    "Gentle",
    "Bright",
  ];

  const nouns = [
    "Cat",
    "Dog",
    "Penguin",
    "Elephant",
    "Kangaroo",
    "Dolphin",
    "Tiger",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
};
