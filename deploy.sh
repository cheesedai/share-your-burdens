
#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process for Share Your Burdens...${NC}"

# Build the project
echo -e "${YELLOW}Building the project...${NC}"
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Aborting deployment.${NC}"
  exit 1
fi

echo -e "${GREEN}Build successful!${NC}"

# Create or switch to gh-pages branch
echo -e "${YELLOW}Preparing the gh-pages branch...${NC}"
git checkout -B gh-pages

# Copy the build to root
echo -e "${YELLOW}Copying build files...${NC}"
cp -r dist/* .

# Create a .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
touch .nojekyll

# Create CNAME file if you have a custom domain
# echo "yourdomain.com" > CNAME

# Add all files
echo -e "${YELLOW}Committing changes...${NC}"
git add .

# Commit
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to the remote gh-pages branch
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push -f origin gh-pages

# Go back to the previous branch
git checkout -

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}Your site should be available at: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME${NC}"
echo -e "${YELLOW}Note: It might take a few minutes for the changes to propagate.${NC}"
