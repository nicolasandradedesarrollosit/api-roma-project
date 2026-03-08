Add a new route to an existing backend module.

The argument should be in the format: `MODULE METHOD /path` (e.g., `auth POST /forgot-password`).

Argument: $ARGUMENTS

## Instructions

1. Parse the argument to extract: module name, HTTP method, and route path
2. Read the existing module files:
   - `src/modules/{module}/{module}.routes.ts`
   - `src/modules/{module}/{module}.controllers.ts`
   - `src/modules/{module}/{module}.service.ts`
   - `src/modules/{module}/{module}.dto.ts`
3. Ask the user what the route should do
4. Add the implementation:
   - Create a DTO if the route accepts a request body (POST/PUT/PATCH)
   - Add the service method with business logic
   - Add the controller method with validation and error handling
   - Add the route entry in the routes file with appropriate middleware
5. Run `npm run lint:fix` in the `api-roma-project` directory
6. Run `npm run type-check` in the `api-roma-project` directory
