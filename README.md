# Drawing Collaboration App

A real-time collaborative drawing application built with React, TypeScript, and Socket.IO.

## Features

- Real-time drawing collaboration
- Color picker
- Brush size adjustment
- Voice chat (coming soon)

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Deployment

This app is configured to deploy to GitHub Pages automatically using GitHub Actions.

### Prerequisites

1. Create a new GitHub repository
2. Push your code to the repository
3. Go to your repository settings
4. Navigate to "Pages" under "Code and automation"
5. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select "gh-pages" and "/ (root)"

### Configuration

1. The app is configured to deploy to `https://cntuan90.github.io/webapp-drawing`
2. Push your changes to the master branch
3. GitHub Actions will automatically build and deploy your app to the gh-pages branch

## Technologies Used

- React
- TypeScript
- Socket.IO
- React Color
- React Icons

## License

MIT