
const fs = require('fs');

const requiredVars = [
    'DATABASE_URL',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_CLERK_SIGN_IN_URL',
    'NEXT_PUBLIC_CLERK_SIGN_UP_URL',
    'UPLOADTHING_SECRET',
    'UPLOADTHING_APP_ID',
    'LIVEKIT_API_KEY',
    'LIVEKIT_API_SECRET',
    'NEXT_PUBLIC_LIVEKIT_URL',
    'NEXT_PUBLIC_SITE_URL'
];

console.log("Checking Environment Variables...");

// Try to load .env if dotenv is available, otherwise rely on process.env (which might be empty if not loaded)
// Since we are running with node, we might need to manually read .env
try {
    const envFile = fs.readFileSync('.env', 'utf8');
    const envLines = envFile.split('\n');
    const envVars = {};
    envLines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envVars[key.trim()] = value.trim();
        }
    });

    requiredVars.forEach(varName => {
        if (!envVars[varName]) {
            console.error(`MISSING: ${varName}`);
        } else {
            console.log(`OK: ${varName}`);
        }
    });

} catch (e) {
    console.error("Could not read .env file directly:", e.message);
}
