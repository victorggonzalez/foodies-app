# NextLevel Foodies App

A modern food recipe sharing platform built with Next.js that allows users to discover, share, and manage meal recipes within a community-driven environment.

## Table of Contents
- [Project Overview](#project-overview)
- [Usage](#usage)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started - Developers](#getting-started---developers)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

**NextLevel Foodies** is a platform for food enthusiasts to share their favorite recipes with a global community. The application provides an intuitive interface for discovering new dishes, sharing personal recipes, and connecting with fellow food lovers. Built with modern web technologies, it offers a seamless experience for both recipe creators and food enthusiasts.

## Usage

### Browsing Recipes
- Visit the homepage to see featured recipes and community highlights
- Navigate to `/meals` to browse all available recipes
- Click on any recipe to view detailed instructions and ingredients

### Sharing a Recipe
1. Navigate to `/meals/share`
2. Fill out the recipe form with:
   - Creator name and email
   - Recipe title and summary
   - Detailed cooking instructions
   - Recipe image upload
3. Submit the form to share your recipe with the community

### Community Features
- Visit `/community` to learn about community perks
- Connect with other food enthusiasts
- Participate in exclusive events and discussions

## Key Features
- **Recipe Discovery**: Browse through a curated collection of meal recipes shared by the community
- **Recipe Sharing**: Create and share your own recipes with detailed instructions, ingredients, and photos
- **Image Upload**: Upload custom recipe images with built-in image picker functionality
- **Community Features**: Connect with other food lovers and participate in the food sharing community
- **Responsive Design**: Fully responsive interface that works across all devices
- **Real-time Updates**: Dynamic content updates using Next.js App Router

## Tech Stack

- **Framework**: Next.js 14.0.3
- **Frontend**: React 18 with CSS Modules for styling
- **Database**: Supabase for production data storage
- **Authentication & Storage**: Supabase (@supabase/supabase-js, @supabase/ssr)
- **Security**: XSS protection for user-generated content
- **Utilities**: 
  - Slugify for URL-friendly recipe titles
  - File system handling for image uploads
- **Development**: ESLint for code quality
- **Deployment**: Vercel Platform

## Getting Started - Developers

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/victorggonzalez/foodies-app.git
   cd foodies-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Database Setup

The application supports Supabase (both for development & production):

#### Supabase Setup

##### For Development
1. Initialize Local Supabase Environment
   ```bash
   npx supabase init
   ```
2. Start Local Development Environment (using Docker)
   ```bash
   npx supabase start
   ```
3. Apply Database Migrations based on the content of [supabase](./supabase/migrations/):
   ```bash
   npx supabase migration up
   ```
4. Create a .env.local file with Supabase credentials in environment variables
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUBSTITUTE_SUPABASE_ANON_KEY>
   ```


##### For Production
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a .env.prod file with your Supabase credentials in environment variables
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUBSTITUTE_SUPABASE_ANON_KEY>
   ```
3. Link Your Local Project to Production:
   ```bash
   npx supabase login
   npx supabase link --project-ref your-project-id
   ```
3. Deploy Database Schema to Production:
   ```bash
   npx supabase db push
   ```

### Database Schema Management
When making database changes, follow this workflow:
1. Create New Migration:
   ```bash
   npx supabase migration new add_feature_name
   ```
2. Edit Migration File: Add your SQL changes to the generated migration file
3. Apply Migration Locally:
   ```bash
   npx supabase migration up
   ```
4. Test Changes: Verify everything works in your local environment
5. Deploy to Production:
   ```bash
   npx supabase db push
   ```

### Running the Application

1. **Development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Production build**
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## API Reference

### Server Actions

#### `shareMeal(prevState, formData)`
Handles recipe submission and validation:
- Validates all required fields
- Checks email format using regex pattern
- Validates image file size (max 1MB)
- Processes image upload and saves to filesystem
- Stores recipe data in database
- Redirects to meals listing page

### Database Operations

#### SQLite Functions
- `getMeals()`: Retrieves all recipes from database
- `getMeal(slug)`: Fetches specific recipe by slug
- `getFeaturedMeals()`: Gets featured recipes for homepage
- `saveMeal(meal)`: Stores new recipe in database

#### Supabase Functions
- `getMeals()`: Queries all meals from Supabase
- `getMeal(slug)`: Retrieves specific meal by slug

## Contributing

We welcome contributions to the Foodies App! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m "Add your feature description"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Development Guidelines
- Follow the existing code style and structure
- Write clear, descriptive commit messages
- Test your changes thoroughly before submitting
- Update documentation as needed

## License

This project is available under the MIT License. See the LICENSE file for more details.

**Live Demo**: [https://foodies-app-zeta.vercel.app/](https://foodies-app-zeta.vercel.app/)
