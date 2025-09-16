# 🐉 Taming Flutter Dragons - Student Mentorship Website

A modern, responsive React application for connecting students with mentors through personalized mentorship programs and educational adventures.

## 🌟 Features

- **🏠 Interactive Homepage** - Engaging hero section with dragon-themed branding
- **🗺️ Learning Roadmap** - Track progress through structured mentorship phases
- **👩‍🏫 Mentor Matching** - Find the perfect mentor based on expertise and interests
- **📚 Resource Hub** - Curated learning materials, tools, and documentation
- **✈️ Educational Trips** - Reward system with educational adventures
- **💬 Student Stories** - Testimonials and success stories
- **📱 Mobile Responsive** - Fully optimized for all devices with stable navigation
- **🎨 Solid Color Design** - Clean, modern UI without gradients or shadows

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing with hash link support
- **Vite** - Fast development build tool
- **CSS3** - Custom CSS with CSS variables and modern features
- **JavaScript ES6+** - Modern JavaScript features
- **SVG Graphics** - Scalable dragon-themed icons and illustrations

## 📁 Project Structure

```
student-mentorship-website/
├── public/                    # Static assets
│   ├── dragon-icon.svg       # Main logo/favicon
│   ├── Angry-Green-Dragon.svg
│   └── Prismatic-Dragon-Head.svg
├── src/
│   ├── components/            # React components
│   │   ├── Navigation.jsx     # Main navigation
│   │   ├── Footer.jsx         # Site footer
│   │   └── ...
│   ├── pages/                 # Page components
│   │   ├── HomePage.jsx       # Main landing page
│   │   ├── RoadmapPage.jsx    # Learning roadmap
│   │   ├── MentorMatchingPage.jsx
│   │   └── ResourcesPage.jsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useAnimations.js   # Animation and interaction hooks
│   ├── styles/                # CSS stylesheets
│   │   └── main.css           # Main stylesheet
│   ├── config/                # Configuration files
│   │   └── constants.json     # Site data and content
│   ├── App.jsx                # Main app component
│   └── main.jsx               # Entry point
├── README.md
├── package.json
└── vite.config.js
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-mentorship-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

### Color Palette
- **Primary**: `#3a10e5` (Codecademy Purple)
- **Secondary**: `#00d4ff` (Cyan Blue)
- **Dragon Theme**: `#16a085` (Emerald Green)
- **Accent**: `#f1c40f` (Gold)
- **Neutrals**: Gray scale from `#f8fafc` to `#0f172a`

### Typography
- **Headings**: Poppins font family
- **Body Text**: Inter font family
- **Responsive sizing** with mobile-first approach

### Layout
- **Max Width**: 1200px containers
- **Grid System**: CSS Grid and Flexbox
- **Mobile First**: Responsive breakpoints at 768px and 480px

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (adapted layout)
- **Mobile**: < 768px (mobile-optimized)

### Mobile Features
- Hamburger navigation menu
- Touch-friendly interactions
- Optimized content layout
- Prevented background scrolling when menu open
- Stable navigation positioning (no jumping)

## 🔧 Configuration

Site content is managed through `src/config/constants.json`:

```json
{
  "site": {
    "name": "Taming Flutter Dragons",
    "description": "Empowering hard-working students..."
  },
  "navigation": { ... },
  "mentors": [ ... ],
  "trips": [ ... ],
  "testimonials": [ ... ]
}
```

## 🎯 Key Features Explained

### Dragon Theme
The website uses a consistent dragon theme throughout:
- Dragon SVG icons for branding
- Dragon-inspired color palette
- "Growth Journey" metaphor for learning

### Mentorship System
- **Mentor Profiles**: Detailed information about each mentor
- **Matching Algorithm**: Students matched based on interests and goals
- **Progress Tracking**: Visual roadmap with phases and milestones

### Educational Trips
- **Reward System**: Trips earned through program completion
- **Categories**: Historical, Science & Tech, Environmental
- **Interactive Features**: Hover effects and detailed descriptions

## 🔄 Recent Updates

### Design Changes
- ✅ **Removed all gradients** - Replaced with solid colors
- ✅ **Removed all shadows** - Replaced with solid black borders
- ✅ **Fixed mobile navigation** - Stable positioning and smooth animations
- ✅ **Enhanced UX** - Better hover effects and interactions

### Technical Improvements
- ✅ **Performance optimization** - Memoized components and hooks
- ✅ **Accessibility** - Proper ARIA labels and keyboard navigation
- ✅ **Mobile stability** - Fixed navigation jumping issues
- ✅ **Code organization** - Modular components and clean structure

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Vercel
1. Connect your Git repository
2. Vercel will auto-detect Vite and build automatically

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run: `npm run build && npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- None currently reported

## 📞 Support

For support and questions:
- Email: support@happystudentmentorship.org
- Phone: +1 (555) 123-HELP

## 🙏 Acknowledgments

- Dragon illustrations and icons
- Codecademy for design inspiration
- React community for excellent tools and documentation

---

**Made with ❤️ for empowering student learning journeys**
