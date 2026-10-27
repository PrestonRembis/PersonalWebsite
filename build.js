// Assembles the static site into dist/: injects the header/footer partials,
// marks the active nav link, and fills in the Web3Forms key from the environment.
const fs = require('fs');
const path = require('path');

// Locally the key comes from .env; on Cloudflare Pages it's a build environment variable
try {
    process.loadEnvFile();
} catch {
    // No .env file
}

const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
if (!accessKey || accessKey === 'your_access_key_here') {
    console.error('WEB3FORMS_ACCESS_KEY is not set. Add it to .env or your build environment.');
    process.exit(1);
}

const outDir = path.join(__dirname, 'dist');

// Page file -> nav key used to highlight the current page
const pages = {
    'index.html': 'home',
    'About/index.html': 'about',
    'Contact/index.html': 'contact',
};

const assets = ['nav.js', 'time.js', 'ME.jpg'];

const navLinkBase = "relative inline-block py-1 text-orange-500 transition-colors duration-300 hover:text-orange-300 "
    + "after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-orange-400 "
    + "after:origin-left after:scale-x-0 after:transition-transform after:duration-300";
const navLinkActive = ' text-orange-300 font-semibold after:scale-x-100';
const navLinkInactive = ' hover:after:scale-x-100';

const header = fs.readFileSync(path.join(__dirname, 'components/header.html'), 'utf8');
const footer = fs.readFileSync(path.join(__dirname, 'components/footer.html'), 'utf8');

for (const [page, currentPage] of Object.entries(pages)) {
    const pageHeader = header.replace(/\{\{navLink:(\w+)\}\}/g, (_, pageKey) =>
        navLinkBase + (pageKey === currentPage ? navLinkActive : navLinkInactive));

    const html = fs.readFileSync(path.join(__dirname, page), 'utf8')
        .replace('<!-- include:header -->', pageHeader)
        .replace('<!-- include:footer -->', footer)
        .replaceAll('{{WEB3FORMS_ACCESS_KEY}}', accessKey);

    const outFile = path.join(outDir, page);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
}

for (const asset of assets) {
    fs.copyFileSync(path.join(__dirname, asset), path.join(outDir, asset));
}

console.log(`Built ${Object.keys(pages).length} pages to dist/`);
