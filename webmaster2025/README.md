# Community Resource Hub

A modern, warm, and accessible web platform that empowers users to discover local services, explore community data, read inspiring stories, and interact with an AI concierge.

## Features

### 🏠 Home Page
- Welcoming hero section with mission statement
- Prominent search bar for instant resource discovery
- Spotlight carousel featuring 3-5 selected community resources
- Announcements/alerts area for time-sensitive updates
- Quick action cards for easy navigation

### 📚 Directory Page
- Large search box for keyword exploration
- Color-coded category filters (Family Services, Health Support, Education, Emergency Aid, Events, Non-Profits)
- Resource cards with images, descriptions, and tags
- Smooth animated transitions when filters are applied

### 📄 Resource Detail Page
- Banner with resource image and category
- Comprehensive description and contact information
- Operating hours with "Open now / Closed" indicator
- Interactive map showing location
- Accessibility information (wheelchair access, languages, transit)
- Step-by-step process guide

### ✍️ Resource Submission Form
- Multi-step flow with progress indicator
- Guided experience for adding new resources
- Live resource preview
- Friendly confirmation page

### 💬 AI Concierge
- Modern messaging app interface
- Conversational helper for users unsure where to start
- Quick suggestion buttons
- Personalized resource recommendations

### 🗺️ Community Needs Heatmap
- Interactive map with color-gradient heat zones
- Category selector for different needs
- Real-time map updates
- Insights panel with trends, service gaps, and weekly changes
- Neighborhood statistics on hover

### 📖 Community Stories
- Dynamic story wall grid with mixed text and photo cards
- Full-story reader modal
- Weekly themes and community highlights
- Uplifting, warm, and authentic tone

### ⭐ Resource of the Day
- Daily featured resource
- Large banner image and clean presentation
- "Why it matters" section
- Previous picks archive

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Maps**: Leaflet & React Leaflet
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
webmaster2025/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── directory/         # Directory page
│   ├── resource/[id]/     # Resource detail page
│   ├── submit/            # Resource submission form
│   ├── concierge/         # AI Concierge page
│   ├── heatmap/           # Community needs heatmap
│   ├── stories/           # Community stories
│   ├── resource-of-the-day/ # Resource of the day
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── ResourceCard.tsx
│   ├── CategoryFilter.tsx
│   ├── MapComponent.tsx
│   └── HeatmapMap.tsx
├── constants/             # Theme and constants
│   └── theme.ts
├── lib/                   # Utilities and mock data
│   └── mockData.ts
└── public/                # Static assets
```

## Design Principles

- **Warm & Modern**: Soft gradients, gentle shadows, rounded corners
- **Accessible**: High contrast colors, screen reader compatible
- **Responsive**: Mobile-first design that works on all devices
- **Smooth Animations**: Subtle transitions that guide the user's eye
- **Consistent**: Unified typography, spacing, and color palette

## Color Palette

- **Primary**: Warm orange (#f17a0f) - Trust, accessibility
- **Secondary**: Sky blue (#0ea5e9) - Support, guidance
- **Warm**: Soft red (#ef4444) - Urgency, care
- **Neutral**: Grays for text and backgrounds

## Features in Detail

### Search & Discovery
- Full-text search across resource names, descriptions, and tags
- Category-based filtering
- Real-time results as you type

### Maps & Location
- Interactive Leaflet maps
- Marker clustering for multiple resources
- Heatmap visualization for community needs

### Accessibility
- WCAG 2.1 AA compliant color contrast
- Keyboard navigation support
- Screen reader friendly
- Wheelchair accessibility indicators

## Mock Data

The application includes comprehensive mock data for:
- 5+ community resources
- 3+ community stories
- Heatmap data points
- Category definitions

All data is located in `lib/mockData.ts` and can be easily replaced with real API calls.

## Future Enhancements

- [ ] Admin dashboard for resource management
- [ ] User authentication and profiles
- [ ] Real-time chat with AI concierge
- [ ] Resource reviews and ratings
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app version

## License

This project is created for the Community Resource Hub platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
