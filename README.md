# Roma Ceramic API Backend

A robust Node.js Express backend API for Roma Ceramic with TypeScript, MongoDB, Firebase, and Supabase integration.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your configuration
# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to dist/
npm start            # Run production build
npm run lint         # Lint code with Biome
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Biome
npm run type-check   # Check TypeScript types
```

## Project Structure

```
src/
├── modules/           # Feature modules
│   └── auth/         # Authentication module example
├── shared/           # Shared modules
│   ├── middlewares/  # Express middlewares
│   ├── types/        # Global types
│   ├── utils/        # Utility functions
│   └── decorators/   # Custom decorators
├── config/           # Configuration
├── constants/        # Global constants
└── index.ts         # Entry point
```

## Module Architecture

Each module follows this structure:
- `{module}.controllers.ts` - Route handlers
- `{module}.routes.ts` - Route definitions
- `{module}.models.ts` - Database models
- `{module}.service.ts` - Business logic
- `{module}.dto.ts` - Request/response DTOs
- `{module}.types.ts` - Module types (optional)

See [CLAUDE.md](./CLAUDE.md) for detailed guidelines.

## Development

### Git Hooks
- **pre-commit**: Auto-formats and lints changed files
- **pre-push**: Validates build and linting before push

Make hooks executable:
```bash
chmod +x .husky/pre-commit .husky/pre-push
```

### Environment Variables

See `.env.example` for all available configuration options.

**Required for development:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret (min 32 chars)

## Technologies Used

- **Runtime**: Node.js + TypeScript
- **Server**: Express
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: class-validator + class-transformer
- **Linting**: Biome
- **Pre-commit**: husky + lint-staged
- **External Services**:
  - Firebase Admin SDK
  - Supabase

## API Endpoints

### Authentication (Example)
```
POST   /api/v1/auth/register   - Register new user
POST   /api/v1/auth/login      - Login user
GET    /api/v1/auth/me         - Get current user (auth required)
```

### Health Check
```
GET    /health                 - API health status
```

## Database

### MongoDB Setup

**Local MongoDB:**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Connect
mongo
```

**MongoDB Atlas:**
Use connection string in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

## Error Handling

The API uses a consistent error response format:
```json
{
  "message": "Error message",
  "error": { /* detailed error in development */ }
}
```

## Contributing

1. Create a new module in `src/modules/{feature}`
2. Follow naming conventions from CLAUDE.md
3. Validate with class-validator DTOs
4. Pre-commit hooks will auto-format code

## Future Enhancements

- [ ] Authentication (email verification, password reset)
- [ ] Testing setup (Jest)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Rate limiting
- [ ] Logging system
- [ ] Caching strategy
- [ ] Docker containerization

## License

Proprietary - Roma Ceramic

---

For detailed development guidelines, see [CLAUDE.md](./CLAUDE.md)
