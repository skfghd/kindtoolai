# KINDTOOLAI - Ice-breaking Tools Platform

## Overview

KINDTOOLAI is a Korean-language web application featuring three interactive ice-breaking tools: "Teto vs Egen" personality analysis, Three Line Poem generator, and Catch-Up Meeting facilitator. The application is built as a modern single-page application with a playful clay art aesthetic, targeting professionals, students, and general users interested in team-building and social interaction activities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom clay art theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for smooth interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Architecture Pattern**: RESTful API with modular route structure
- **Development**: Hot module replacement via Vite integration
- **Storage Interface**: Abstracted storage layer with PostgreSQL database implementation

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM (Active - January 30, 2025)
- **ORM**: Drizzle with type-safe schema definitions
- **Connection**: Neon Database serverless PostgreSQL
- **Migrations**: Drizzle Kit for schema management
- **Session Storage**: PostgreSQL with connect-pg-simple
- **Storage Implementation**: DatabaseStorage class using PostgreSQL instead of in-memory storage

## Security Architecture

### API Key Protection
- **Environment Variable Validation**: Server startup validation of all required environment variables
- **Response Sanitization**: Automatic removal of sensitive fields from API responses
- **Error Sanitization**: Sensitive information masking in error logs and stack traces
- **Security Headers**: Comprehensive HTTP security headers (XSS protection, content type validation, frame options)
- **Database URL Validation**: Format and protocol verification for database connections

### Data Security
- **Server-Only Secrets**: DATABASE_URL, SESSION_SECRET, and database credentials never exposed to client
- **Client-Safe Variables**: Only VITE_GA_MEASUREMENT_ID (public Google Analytics ID) exposed to frontend
- **Sanitized Logging**: Database connection strings and sensitive data automatically redacted from logs
- **CSP Headers**: Content Security Policy configured for secure script and style loading

## Key Components

### User Interface
- **Design System**: Clay art aesthetic with custom color palette
- **Component Library**: Comprehensive shadcn/ui components (buttons, cards, forms, etc.)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Typography**: Noto Sans KR font for Korean language support
- **Interactive Elements**: Custom clay-styled buttons and characters with hover effects
- **Performance Optimization**: Multi-layer preloading system with DNS prefetch, preconnect, and hover-triggered preloading

### Application Pages
- **Home Page**: Landing page with navigation to six main tools with advanced preloading optimization
- **Teto vs Egen**: Personality analysis tool with photo upload functionality
- **Three Line Poem**: Korean poem generator based on user names
- **Mandala Canvas**: 64-square mandala planning tool
- **Catch-Up Meeting**: Team communication and meeting facilitation tool
- **Secret Meaning Translator**: Korean idiom and proverb interpretation tool
- **Tales of Me**: AI-generated story picture books based on daily moods
- **Contact Page**: Inquiry system with private post functionality and admin management
- **Admin Page**: Administrative dashboard for managing all inquiries and private posts
- **404 Page**: Error handling for unknown routes

### Backend Services
- **Route Registration**: Modular Express route system
- **Storage Layer**: Abstract interface supporting CRUD operations with PostgreSQL
- **Error Handling**: Centralized error middleware with sensitive data sanitization
- **Development Tools**: Request logging and debugging utilities
- **Inquiry Management**: Full CRUD operations for contact inquiries with private post support
- **Admin Authentication**: Password-protected admin panel (password: new1234!)
- **Analytics Tracking**: Google Analytics 4 integration with custom event tracking
- **Security Framework**: Comprehensive API key protection, environment validation, and security headers
- **Performance Features**: Optimized external link handling with instant window opening and reduced loading states
- **Common Header System**: Embeddable header script for external apps to maintain design consistency without affecting existing designs

## Data Flow

### Client-Side Flow
1. User navigates between tools via Wouter routing
2. TanStack Query manages API calls and caching
3. Form data handled through React Hook Form with Zod validation
4. UI state managed through React hooks and context

### Server-Side Flow
1. Express middleware processes incoming requests
2. Route handlers interact with storage interface
3. Business logic separated from data access layer
4. Responses formatted as JSON with error handling

### Database Interaction
1. Drizzle ORM provides type-safe database queries
2. Schema definitions shared between client and server
3. Migrations managed through Drizzle Kit
4. Connection pooling via Neon serverless platform

## Common Header System

### Script Distribution
- **Header Script**: `/kindtool-header.js` - Embeddable JavaScript for external apps
- **Integration Guide**: `/embed-guide` - Comprehensive documentation for implementation
- **Demo Page**: `/header-demo` - Live demonstration of header functionality

### Features
- **Non-intrusive Design**: Adds header without affecting existing app layouts
- **Responsive Navigation**: Mobile-friendly dropdown menus and navigation
- **Cross-Domain Support**: CORS-enabled for external app integration
- **Analytics Integration**: Automatic event tracking for header interactions
- **Performance Optimized**: Cached delivery with 1-hour cache control

### Implementation
- **Single Line Integration**: Simple script tag insertion for immediate functionality
- **Automatic Styling**: Self-contained CSS with namespace protection
- **Duplicate Prevention**: Built-in logic to prevent multiple header instances
- **Mobile Optimization**: Collapsible mobile menu with touch-friendly controls

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm and drizzle-zod for database operations
- **UI Framework**: React with @radix-ui components
- **Styling**: Tailwind CSS with custom configuration
- **Forms**: @hookform/resolvers with Zod validation
- **Animations**: framer-motion for interactive elements
- **Analytics**: Google Analytics 4 with custom event tracking (January 30, 2025)

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Development**: tsx for TypeScript execution
- **Code Quality**: TypeScript compiler with strict mode
- **Hot Reload**: Vite development server with HMR

### Replit Integration
- **Runtime Error Overlay**: @replit/vite-plugin-runtime-error-modal
- **Development Banner**: Replit development environment integration
- **Cartographer**: @replit/vite-plugin-cartographer for enhanced development experience

## Deployment Strategy

### Build Process
1. Client-side assets built with Vite to `dist/public`
2. Server code bundled with esbuild for production
3. TypeScript compilation with strict type checking
4. Static assets optimized and minified

### Production Configuration
- **Server**: Node.js Express server serving static files and API
- **Database**: PostgreSQL via DATABASE_URL environment variable
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **Error Handling**: Production-ready error responses without stack traces

### Development Workflow
- **Local Development**: Vite dev server with Express API proxy
- **Database Migrations**: `npm run db:push` for schema updates
- **Type Safety**: Shared schema definitions between frontend and backend
- **Hot Reload**: Full-stack development with instant updates