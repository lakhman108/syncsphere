/**
 * Generate a colorful SVG avatar based on user initials
 * @param name - Full name of the user
 * @returns Data URI string of the generated SVG avatar
 */
export function generateAvatar(name: string): string {
    // Extract initials (max 2 characters)
    const words = name.trim().split(/\s+/);
    let initials = '';

    if (words.length === 1) {
        // Single word: take first 2 chars or just 1 if name is single char
        initials = words[0].substring(0, 2).toUpperCase();
    } else {
        // Multiple words: take first char of first two words
        initials = (words[0][0] + words[1][0]).toUpperCase();
    }

    // Generate deterministic color based on name
    const colors = [
        { from: '#667eea', to: '#764ba2' }, // Purple
        { from: '#f093fb', to: '#f5576c' }, // Pink
        { from: '#4facfe', to: '#00f2fe' }, // Blue
        { from: '#43e97b', to: '#38f9d7' }, // Green
        { from: '#fa709a', to: '#fee140' }, // Warm
        { from: '#30cfd0', to: '#330867' }, // Teal-Purple
        { from: '#a8edea', to: '#fed6e3' }, // Pastel
        { from: '#ff9a9e', to: '#fecfef' }, // Light Pink
        { from: '#ffecd2', to: '#fcb69f' }, // Peach
        { from: '#ff6e7f', to: '#bfe9ff' }, // Coral-Blue
    ];

    // Simple hash function to pick a color
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    const selectedColor = colors[colorIndex];

    // Create SVG
    const svg = `
    <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${selectedColor.from};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${selectedColor.to};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" fill="url(#grad)" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="Arial, sans-serif" font-size="52" font-weight="bold" fill="white">
        ${initials}
      </text>
    </svg>
  `.trim();

    // Convert to data URI
    const base64 = Buffer.from(svg).toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
}
