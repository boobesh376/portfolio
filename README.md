# 🚀 Boobesh K — Portfolio Website

A modern, responsive portfolio website built with **React JS**, **Tailwind CSS**, and **Vite** — converted from a Figma design.

---

## ✨ Features

- ⚡ **Vite** for lightning-fast dev and build
- 🎨 **Tailwind CSS** for utility-first styling
- ⚛️ **React JS** with component-based architecture
- 🌊 **Smooth animations** — typewriter effect, scroll reveals, floating profile, progress bars
- 📱 **Fully responsive** — mobile, tablet, and desktop
- 🌙 **Dark theme** with cyan/teal accent color system
- 🔢 **Circular + bar skill indicators**
- 📬 **Contact form** with success feedback

---

## 📁 Folder Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky navbar with active section tracking
│   │   ├── Hero.jsx         # Hero section with typewriter + floating profile
│   │   ├── About.jsx        # About me section with image + stats
│   │   ├── Projects.jsx     # Project cards with flip reveal
│   │   ├── Skills.jsx       # Skill bars + circular soft skills
│   │   ├── Contact.jsx      # Contact form + info card
│   │   └── Footer.jsx       # Footer
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles + Tailwind directives
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🛠️ Running Locally

### Prerequisites
- **Node.js** v18+ — [Download here](https://nodejs.org/)
- **npm** v9+ (comes with Node.js)

### Steps

```bash
# 1. Clone or unzip the project
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser. The dev server supports hot-module replacement (HMR) — changes appear instantly.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder — optimized, minified, and ready to deploy.

Preview the production build locally:
```bash
npm run preview
```

---

## 🚢 Deployment

### Option 1: Vercel (Recommended — Free, Fastest)

1. Push your project to **GitHub**
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Your site is live at `https://your-project.vercel.app` 🎉

Or deploy via CLI:
```bash
npm install -g vercel
vercel
```

---

### Option 2: Netlify (Free)

1. Run `npm run build` to generate the `dist/` folder
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Deploy manually**
3. Drag and drop the `dist/` folder into Netlify's deploy area
4. Your site is live instantly!

Or connect via GitHub:
- New site → Import from Git → Select repo → Build command: `npm run build` → Publish directory: `dist`

---

### Option 3: GitHub Pages

```bash
# Install the gh-pages package
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Add to `vite.config.js`:
```js
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

Then run:
```bash
npm run deploy
```

Site will be live at `https://yourusername.github.io/your-repo-name/`

---

### Option 4: Render (Free)

1. Push to GitHub
2. Go to [render.com](https://render.com) → **New Static Site**
3. Connect your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Create Static Site**

---

## 🎨 Customization

### Update Personal Info
Edit the data in each component:
- **`Hero.jsx`** — name, role, bio, social links
- **`About.jsx`** — about text, stats
- **`Projects.jsx`** — project titles, descriptions, images, links
- **`Skills.jsx`** — skill names, icons, percentages
- **`Contact.jsx`** — email, phone, location, social links
- **`Footer.jsx`** — name and year

### Change Colors
Edit `tailwind.config.js` → `theme.extend.colors`:
```js
'primary': '#00FFE5',   // Cyan accent
'secondary': '#007EAB', // Blue
'bg-dark': '#151825',   // Dark background
```

And update the CSS variables in `src/index.css`.

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI library |
| react-dom | ^18.2.0 | DOM rendering |
| vite | ^5.0.12 | Build tool |
| tailwindcss | ^3.4.1 | Utility CSS |
| @vitejs/plugin-react | ^4.2.1 | React plugin for Vite |
| autoprefixer | ^10.4.17 | CSS vendor prefixes |
| postcss | ^8.4.35 | CSS processing |

---

## 📄 License

MIT — feel free to use and customize this portfolio for your own use.

---

*Designed from Figma → Built with React + Tailwind + Vite*

---

## 📧 Setting Up Email (Contact Form → Your Gmail)

The contact form uses **EmailJS** — completely free, no backend needed.

### Steps (takes ~5 minutes):

1. **Sign up** at [https://emailjs.com](https://emailjs.com) (free tier = 200 emails/month)

2. **Add Email Service:**
   - Dashboard → Email Services → Add New Service
   - Choose **Gmail** → Connect your Gmail account
   - Copy the **Service ID** (e.g. `service_abc123`)

3. **Create Email Template:**
   - Dashboard → Email Templates → Create New Template
   - Set **To Email** = `boobeshkaruna@gmail.com`
   - Template body example:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     Subject: {{subject}}
     
     Message:
     {{message}}
     ```
   - Copy the **Template ID** (e.g. `template_xyz456`)

4. **Get Public Key:**
   - Dashboard → Account → General → Public Key
   - Copy it (e.g. `user_ABCDEF123`)

5. **Paste into the code** — open `src/components/Contact.jsx` and replace at the top:
   ```js
   const EMAILJS_SERVICE_ID  = 'service_abc123'    // ← your Service ID
   const EMAILJS_TEMPLATE_ID = 'template_xyz456'   // ← your Template ID  
   const EMAILJS_PUBLIC_KEY  = 'user_ABCDEF123'    // ← your Public Key
   ```

6. Save, run `npm run dev`, fill the form → email arrives in your Gmail ✅

> The yellow warning banner in the Contact section will automatically disappear once you replace the placeholder values.
