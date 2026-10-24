# maku. — portfolio of Maku Mazakpe

**Africa-built. Global-grade.** Personal site for Maku Mazakpe, an AI-native software engineer (Android · Kotlin Multiplatform · backend · multi-LLM systems).

Live: https://ma-za-kpe.github.io/portfolio/ · Brand kit: https://ma-za-kpe.github.io/portfolio/brand.html

## Stack
Static HTML, CSS and vanilla JS with no build step and no framework, so it loads fast and deploys as-is to GitHub Pages (served from the `gh-pages` branch).

```
index.html            main page (SEO meta, Open Graph, JSON-LD Person/ProfilePage)
brand.html            brand guidelines + downloadable assets
404.html              custom not-found page
assets/css/main.css   design tokens + all styles
assets/js/main.js     animations: reveals, counters, rotator, magnetic buttons
assets/js/analytics.js GA4 + engagement events (set GA4_ID to enable)
assets/brand/         logo SVGs, favicons, avatar, OG image, LinkedIn/X banners
sitemap.xml, robots.txt, llms.txt, site.webmanifest
resort.html, Happy-trails-travel-agency.html   legacy URLs → redirect to home
```

## Run locally
```
cd .. && python3 -m http.server 8000   # then open http://localhost:8000/portfolio/
```

## Analytics
Paste your GA4 Measurement ID into `GA4_ID` in `assets/js/analytics.js`. In GA4, mark `book_call`, `email_copy` and `resume_download` as key events.

## License
Code: Apache 2.0. Brand assets and content © Maku Mazakpe.
