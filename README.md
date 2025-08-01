# 🎬 YouTube Video Looper

A modern Next.js web application for looping YouTube video sections with precise control and repetition tracking.

## ✨ Features

- **YouTube Video Integration**: Load any YouTube video by URL
- **Precise Loop Control**: Set exact start and end times for loops
- **Real-time Counter**: Track repetition count in real-time
- **Modern UI**: Beautiful, responsive interface built with Next.js
- **Keyboard Shortcuts**: Support for Enter key to load videos
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd youtube-video-looper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 📱 How to Use

1. **Load a Video**: Paste a YouTube video URL and click "Load Video"
2. **Set Loop Points**: Enter your desired start and end times (in seconds)
3. **Confirm Settings**: Click "Set Loop Points" to confirm your selection
4. **Start Looping**: Click "Start Looping" to begin the repetition
5. **Track Progress**: Watch the counter track how many times the section has repeated
6. **Reset**: Use "Reset Counter" to start counting from zero again

## 🏗️ Project Structure

```
youtube-video-looper/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── vercel.json           # Vercel deployment configuration
```

## 🎯 Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **YouTube IFrame API** - YouTube video integration
- **CSS Modules** - Styled components
- **Vercel** - Deployment platform

## 🚀 Deployment

This project is configured for easy deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Deploy automatically** - Vercel will detect the Next.js framework
3. **Custom domain** - Add your own domain if desired

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality.

### YouTube API

The application uses the YouTube IFrame API, which is loaded automatically and doesn't require API keys.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- YouTube IFrame API for video integration
- Next.js team for the amazing framework
- Vercel for seamless deployment

---

**Note**: This application is for educational and personal use. Please respect YouTube's terms of service and copyright laws when using this tool.