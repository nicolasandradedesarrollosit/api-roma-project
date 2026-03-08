Create a new Express middleware named "$ARGUMENTS" in the backend.

## Instructions

1. Create `src/shared/middlewares/$ARGUMENTS.middleware.ts`
2. Follow the same patterns as `auth.middleware.ts`:
   - Import `Request`, `Response`, `NextFunction` from express
   - Export a named middleware function with proper TypeScript types
   - Handle errors with try/catch
   - Call `next()` on success
   - Return proper error responses on failure
3. Run `npm run lint:fix` in the `api-roma-project` directory
4. Run `npm run type-check` in the `api-roma-project` directory

Ask the user what the middleware should do before generating it.
