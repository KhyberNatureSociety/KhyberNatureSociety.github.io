# Khyber Nature Society (KNS) Website

This repository contains the official website for **Khyber Nature Society (KNS)**, a nonprofit conservation organization based in Peshawar, Pakistan, working across northern Pakistan to protect wildlife, ecosystems, and promote community-based environmental stewardship.

The site is built as a highly responsive, modern static website using only semantic **HTML5**, modern **CSS3** (with CSS variables, flexbox/grid layout, and keyframe animations), and vanilla **JavaScript** (no heavy external library dependencies).

---

## Folder Structure

```text
KNS/
├── assets/
│   ├── logo.png       # Official KNS branding logo
│   ├── abid.jpg       # Founder & Conservation Lead profile
│   ├── noman.jpg      # Endocrinology & Wildlife Research Lead profile (Amir's picture file)
│   ├── amir.jpg       # Community Outreach Lead profile (Noman's picture file)
│   ├── zahid.jpg      # Geospatial Research Associate profile
│   └── hero_bg.png    # Misty mountains and forest hero background
├── index.html         # Main website markup (fully SEO optimized)
├── styles.css         # Custom layout, design system, and responsive rules
├── script.js          # Filtering tabs, menu triggers, and scroll reveal animations
└── README.md          # Technical documentation and deployment guide
```

---

## Key Features

1. **Design System Matching Brand Identity**: Cohesive forest green, sage, and accent gold color palette extracted directly from the KNS logo. High-end modern typography (`Outfit` and `Plus Jakarta Sans`) and card layouts.
2. **Interactive Filtering Tabs**: Segmented category tabs for Publications and Media grids, allowing users to instantly filter reports and updates using responsive CSS states.
3. **Optimized Animations**: Uses CSS transitions and the native JavaScript `Intersection Observer` API to trigger fade-in and slide-up reveals on scroll, ensuring a 60fps scrolling experience.
4. **Accessible Forms**: Standardized client-side validations and custom feedback states for three distinct forms:
    *   **Contact Form**: General inquiries and partnership requests.
    *   **Citizen Science Record Form** (Amber Yellow tab): Detailed coordinates, record types, and sample preservation entries.
    *   **Become a Member Form**: Local city details, membership types, and interest areas.
5. **SEO & Mobile First**: Full set of standard SEO metadata, Open Graph (OG) tags, mobile layout viewport controls, and favicon configs. Completely responsive across mobile, tablet, and widescreen desktops.

---

## Running Locally

Because the project is written in pure vanilla static assets, you do not need to install complex dependencies or node servers to run it. 

### Method 1: Double-Click File
Simply navigate to the project directory and double-click `index.html` to open the site directly in your web browser.

### Method 2: Local HTTP Server (Recommended for Scroll Effects & Assets)
If you want to view the site via a local dev server (which mimics actual hosting conditions and ensures assets load with proper HTTP protocols), you can run a simple server:

**Using Python:**
If you have Python installed, open your command terminal in this directory and run:
*   Python 3.x: `python -m http.server 8000`
*   Python 2.x: `python -m SimpleHTTPServer 8000`
*   Then open [http://localhost:8000](http://localhost:8000) in your browser.

**Using VS Code:**
If you use Visual Studio Code, install the **Live Server** extension, click "Go Live" in the status bar, and it will serve and auto-reload the page in your browser.

---

## Deploying to GitHub Pages

This website is pre-configured and optimized to be hosted completely free on **GitHub Pages**.

### Step 1: Create a GitHub Repository
1. Log in to your GitHub account and click **New Repository**.
2. Name the repository (e.g., `kns-website`).
3. Set the repository visibility to **Public** (required for free GitHub Pages).
4. Do not initialize with a README, `.gitignore`, or license, as you already have these.

### Step 2: Initialize Git and Commit Code
Open your terminal (PowerShell, Command Prompt, or Git Bash) inside the project's root folder (`KNS/`) and execute the following commands:

```bash
# Initialize local git repository
git init

# Add all files (HTML, CSS, JS, and assets)
git add .

# Create initial commit
git commit -m "Initial commit: KNS interactive website"

# Rename default branch to main (if not already)
git branch -M main

# Link your local repo to the GitHub repository you created
# (Replace the URL with your repository's URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push your code to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.com.
2. Click on the **Settings** tab.
3. In the left-hand sidebar, scroll down to the **Code and automation** section and click **Pages**.
4. Under the **Build and deployment** section, select **Deploy from a branch** as the source.
5. In the **Branch** dropdown, select **main** and set the folder dropdown next to it to `/ (root)`.
6. Click **Save**.

Within 1–2 minutes, GitHub will build and host your site. A notification banner will appear at the top of the Pages settings page showing your live URL (usually `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`).
