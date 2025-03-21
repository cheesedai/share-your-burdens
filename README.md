
# Share Your Burdens

A safe space for anonymous sharing and support. We believe in the healing power of sharing our struggles with others.

## Project info

**URL**: https://lovable.dev/projects/2fee75a4-876f-4900-972b-c7b1ae876c5e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2fee75a4-876f-4900-972b-c7b1ae876c5e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Framer Motion

## How to deploy to GitHub Pages

### Option 1: Use GitHub Actions (Recommended)

1. Push your code to GitHub
2. Go to your repository settings and enable GitHub Pages on the gh-pages branch
3. The GitHub Action will automatically build and deploy your site when you push to main

### Option 2: Manual Deployment

Run the deploy script:

```sh
# Make the script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

This will build your project and push it to the gh-pages branch of your repository.

Your site will be available at: `https://yourusername.github.io/share-your-burdens/`

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
