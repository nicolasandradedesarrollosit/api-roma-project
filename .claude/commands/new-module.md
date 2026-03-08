Create a new backend feature module named "$ARGUMENTS".

## Instructions

1. Create the folder `src/modules/$ARGUMENTS/`
2. Scaffold ALL of these files following the existing `auth` module as a reference:

### `$ARGUMENTS.models.ts`
- Mongoose schema and model with TypeScript interface extending `Document`
- Include `timestamps: true`
- Export both the interface (`I{PascalName}`) and the model (`{PascalName}`)

### `$ARGUMENTS.dto.ts`
- DTOs using `class-validator` decorators
- Create a "Create" DTO and an "Update" DTO (with optional fields)
- Use `@IsString()`, `@IsEmail()`, `@MinLength()`, etc. as appropriate

### `$ARGUMENTS.types.ts`
- Module-specific TypeScript interfaces (response types, payload types)

### `$ARGUMENTS.service.ts`
- Service class with CRUD methods: `create`, `getAll`, `getById`, `update`, `delete`
- Use the Mongoose model for database operations
- Throw descriptive errors for not-found and validation cases

### `$ARGUMENTS.controllers.ts`
- Static controller methods following the same pattern as `AuthController`
- Validate DTOs with `plainToInstance` + `validate` from class-transformer/class-validator
- Return consistent JSON responses: `{ message: string, data: any }`
- Proper error handling with try/catch and appropriate status codes

### `$ARGUMENTS.routes.ts`
- Express Router with RESTful routes:
  - `GET /` — list all
  - `GET /:id` — get by ID
  - `POST /` — create (with `authMiddleware`)
  - `PUT /:id` — update (with `authMiddleware`)
  - `DELETE /:id` — delete (with `authMiddleware`)
- Export the router as default

3. Register the new router in `src/index.ts` at `/api/v1/$ARGUMENTS`
4. Run `npm run lint:fix` in the `api-roma-project` directory
5. Run `npm run type-check` in the `api-roma-project` directory and fix any errors

## Naming Rules
- Files: `$ARGUMENTS.{type}.ts` (e.g., `products.controllers.ts`)
- Classes: PascalCase (e.g., `ProductsController`, `ProductsService`)
- Functions/variables: camelCase
