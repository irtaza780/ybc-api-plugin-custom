export default function generateRandomId() {
  // Generate a random three-letter prefix
  const prefix = String.fromCharCode(
    65 + Math.floor(Math.random() * 26), // Random uppercase letter
    65 + Math.floor(Math.random() * 26),
    65 + Math.floor(Math.random() * 26)
  );

  // Current timestamp in milliseconds
  const timestamp = Date.now();

  // Random number between 1 and 99999
  const randomNumber = Math.floor(Math.random() * 99999) + 1;

  // Combine the prefix, timestamp, and random number
  const uniqueId = `${prefix}${String(timestamp).slice(-5)}${String(randomNumber).padStart(5, '0')}`;

  return uniqueId;
}

// Example usage:
const randomUniqueId = generateRandomId();
console.log(randomUniqueId);
