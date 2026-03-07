# Roma Ceramic API Backend - Project Guidelines

## Project Overview
Node.js Express backend for Roma Ceramic API with TypeScript, MongoDB, Firebase, and Supabase integration.

## Architecture

### Directory Structure
```
src/
├── modules/           # Feature modules (auth, users, products, etc.)
│   ├── auth/
│   │   ├── auth.controllers.ts
│   │   ├── auth.models.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.dto.ts
│   │   └── auth.service.ts
│   └── [other-modules]/
├── shared/            # Shared modules across features
│   ├── middlewares/   # Express middlewares
│   ├── types/         # Global types and interfaces
│   ├── utils/         # Utility functions
│   └── decorators/    # Custom decorators
├── config/            # Configuration files (db, env)
├── constants/         # Global constants
└── index.ts          # Application entry point
```

## Module Structure Rules

### Naming Convention
- **Files**: Always prefix with module name (e.g., `auth.controllers.ts`, `auth.dto.ts`)
- **Folders**: Use module name (e.g., `/auth`, `/users`, `/products`)
- **Classes/Exports**: Use PascalCase (e.g., `AuthController`, `AuthService`)
- **Functions/Variables**: Use camelCase (e.g., `validateToken`, `getUserById`)

### Module Template
Each module should have:
- `{module}.controllers.ts` - Route handlers
- `{module}.routes.ts` - Express routes
- `{module}.models.ts` - Mongoose schemas & models
- `{module}.dto.ts` - Data Transfer Objects (validation)
- `{module}.service.ts` - Business logic
- `{module}.types.ts` (optional) - Module-specific types

## Technologies & Dependencies

### Core
- **Express**: HTTP server framework
- **TypeScript**: Type safety
- **Node.js**: Runtime environment

### Database
- **MongoDB/Mongoose**: Primary database with ORM
- **Firebase Admin**: Authentication & real-time features
- **Supabase**: PostgreSQL alternative & vector DB

### Security & Validation
- **JWT (jsonwebtoken)**: Token-based authentication
- **class-validator**: DTO validation
- **class-transformer**: DTO transformation
- **CORS**: Cross-origin resource sharing

### Development
- **TypeScript**: Type checking
- **Biome**: Linting & formatting (pre-commit)
- **tsx/ts-node**: TypeScript execution
- **husky & lint-staged**: Git hooks

## Scripts

```bash
npm run dev          # Development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run built application
npm run lint         # Check code with Biome
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Biome
npm run type-check   # Type check without emitting
```

## Git Hooks & Pre-commit

- **pre-commit**: Runs `lint-staged` to lint and format changed files
- **pre-push**: Runs `npm run build && npm run lint` before pushing

## Environment Variables
See `.env.example` for all required environment variables.

### Key Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development, production, test)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `FIREBASE_*` - Firebase Admin SDK credentials
- `SUPABASE_*` - Supabase API credentials

## Development Guidelines

### Module Development
1. Create module folder under `src/modules/{module-name}`
2. Create DTO with validation using `class-validator`
3. Define Mongoose schema and model
4. Implement service layer with business logic
5. Create controller with request/response handling
6. Define routes and integrate middleware
7. Export types in `{module}.types.ts`

### Shared Code
- **Middlewares**: `src/shared/middlewares/` (auth, error handling, logging)
- **Types**: `src/shared/types/` (global interfaces, enums)
- **Utils**: `src/shared/utils/` (helpers, formatters, validators)
- **Decorators**: `src/shared/decorators/` (custom TypeScript decorators)

### Best Practices
- Use dependency injection pattern for services
- Keep controllers thin - move logic to services
- Validate input using DTO and class-validator
- Use TypeScript strict mode
- Handle errors consistently with middleware
- Follow naming conventions strictly
- Document complex functions with JSDoc comments
- Keep modules loosely coupled

## Code Quality

### Linting & Formatting
- Run `npm run lint:fix` before committing
- Pre-commit hooks auto-format staged files
- Use recommended Biome configuration

### Type Safety
- Enable TypeScript strict mode (configured)
- No `any` types without justification
- Use enums for constants
- Define interfaces for all data structures

## Testing (Future)
Configuration ready for Jest/Mocha integration:
```bash
npm install --save-dev jest @types/jest ts-jest
```

## Additional Configuration

### ESLint/Prettier Alternative
Currently using **Biome** for unified linting & formatting. Switch to Prettier/ESLint if needed.

### Database Connection
Mongoose connection configured in `config/database.ts` (to be created).

### API Versioning
Future: Implement `/api/v1/` route versioning structure.

## Troubleshooting

### Build Errors
```bash
npm run type-check    # Check TypeScript errors
npm run lint:fix      # Auto-fix linting issues
```

### Git Hooks Not Running
```bash
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

---

**Last Updated**: 2026-03-07
