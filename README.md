# Collaborative Drawing Web Application

A real-time collaborative drawing application built with React, Socket.IO, and TypeScript. Features include:
- Real-time drawing collaboration
- Voice chat capability
- Color picker and brush size control
- Modern and responsive UI

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd drawing-collab
```

2. Install client dependencies:
```bash
npm install
```

3. Install server dependencies:
```bash
cd server
npm install
```

## Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. In a new terminal, start the client:
```bash
cd drawing-collab
npm start
```

The application will be available at http://localhost:3000

## Features

- Real-time collaborative drawing
- Voice chat functionality
- Color picker with a wide range of colors
- Adjustable brush size
- Clean and modern UI
- Responsive design

## Deployment

The application is configured to deploy automatically to GitHub Pages using GitHub Actions. Simply push to the main branch, and the workflow will handle the deployment.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.