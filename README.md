# The First Light Newspaper 📰

"The First Light" is a premium, fully responsive digital newspaper platform designed for a seamless reading experience across all devices. It features real-time news updates, a global search engine, and a dynamic category-based layout.

---

## 🚀 Project Setup

Since the project uses the JavaScript `fetch()` API to load news data from local JSON files, it needs to be served through a web server to avoid CORS (Cross-Origin Resource Sharing) browser restrictions.

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).
- A local development server.

### Steps to Run
1. **Clone/Download** the repository to your local machine.
2. **Open the folder** in your preferred code editor (e.g., VS Code).
3. **Start a Local Server**:
   - If using VS Code, right-click `Index.html` and select **"Open with Live Server"**.
   - Alternatively, use Python: `python -m http.server 8000` and navigate to `localhost:8000`.
4. The application will automatically fetch and display news from the `Assets/` directory.

---

## 📁 Folder Structure

```text
The-First-Light-Newspaper/
├── Index.html                # Main landing page with all categories
├── details.html              # Dynamic article details view
├── style.css                 # Global styles, design tokens & responsiveness
├── App.js                    # Core logic, AJAX fetching, & Global Search
├── Assets/                   # Static resources and data
│   ├── Images/               # Brand logos, icons, and UI assets
│   ├── business.json         # Business news data
│   ├── entertainment.json    # Entertainment news data
│   ├── health.json           # Health news data
│   ├── home.json             # Homepage featured news data
│   ├── international.json    # International news data
│   ├── latest.json           # Latest updates feed
│   ├── national.json         # National news data
│   ├── sports.json           # Sports news data
│   ├── technology.json       # Technology news data
│   └── videos.json           # Video carousel content
└── README.md                 # Project documentation
```

---

## 💡 Key Decisions

### 1. JSON-Driven Architecture
To simulate a real-world news portal without requiring a complex backend database, I implemented a **JSON-based Data Architecture**. This allows for static hosting while maintaining the flexibility of dynamic content. Each category has its own JSON file, making it easy to scale or migrate to an API in the future.

### 2. Global Multi-Category Search
One of the core features is the **Global Search Logic**. Instead of searching only the current view, the search engine indexes all 9 JSON files simultaneously upon load. This provides a "Google-like" experience where users can find any article by Keyword, Title, or Description from any page.

### 3. Custom Responsive Grid System (Vanilla CSS)
I chose to build a custom grid system using **Vanilla CSS Flexbox and Grid** rather than using frameworks like Tailwind or Bootstrap. This decision was made to:
- Achieve a highly specific "Newspaper" aesthetic that frameworks often make look generic.
- Ensure the lightest possible page weight for fast loading.
- Maintain total control over the 3-column desktop layout, which collapses into a logical 2-column tablet and 1-column mobile view.

### 4. Modular Sectional Design
Each section (Sports, Technology, Business, etc.) follows a **Modular Design Pattern**. This allows the layout for any specific category to be independently modified in the CSS without affecting the rest of the site's structural integrity.

### 5. Dynamic Video Carousel
For the Video section, I built a custom **JavaScript-based Carousel**. It calculates the number of visible slides based on the user's screen width, ensuring that navigation indicators and transitions remain functional and visually balanced regardless of the device.

### 6. User Experience (UX) Polish
- **Time-Ago Formatting**: All news items feature a relative timestamp (e.g., "1 hour ago") to instill a sense of urgency and freshness.
- **Smart Truncation**: Descriptions are intelligently truncated based on their position in the grid to prevent layout shifting and maintain design harmony.
- **Interactive Branding**: Micro-animations on the logo and navigation items provide immediate visual feedback.

---

## 🛠️ Technologies Used
- **HTML5**: Semantic structure for SEO and accessibility.
- **CSS3**: Advanced Grid, Flexbox, and transitions for a premium feel.
- **JavaScript (ES6+)**: Async fetching, UI logic, and Search indexing.
- **JSON**: Local data storage and simulation.
- **Font Awesome**: iconography.

## website Link
Link - [https://the-first-light-newspaper.onrender.com/]
