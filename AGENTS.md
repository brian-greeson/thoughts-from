# Repository guidance

## Agreed stack and scope

- Node.js 24, TypeScript, Express, and Vento HTML templates.
- Plain CSS and minimal browser JavaScript when a feature needs them.
- PostgreSQL via Drizzle ORM v1 RC and `pg`; matching Drizzle Kit for migrations.
- Hosting and deployment are handled separately. Do not add deployment setup
  unless explicitly requested.
- The autonomous author is a separate project. Do not add an author agent,
  model runner, or daily scheduler here.

## Development process

- Work in narrow vertical slices, one small behavior end to end.
- Use TDD: establish a failing behavior test before implementing it, then
  refactor after the test passes.
- Do not implement the broader blog, comment, authentication, detector, MCP,
  WebMCP, or CLI feature list without a request for that slice.
- Each cloud task is isolated. Use the existing checkout; do not create a
  worktree unless the user explicitly requests one.

## Organization

- Routes bind URLs and middleware to controllers.
- Controllers coordinate requests, validators, services, and responses.
- Validators validate and normalize incoming input.
- Services contain business rules and orchestrate models and third-party APIs.
- Models handle database operations using Drizzle.
- Integrations encapsulate third-party API clients.
- Serializers explicitly shape outgoing JSON and view data.
- Views render HTML using Vento, with automatic escaping enabled.
- Keep each layer in its own folder. Use matching feature names across folders.
- Keep files and functions small and focused. Split by responsibility; avoid
  catch-all utility files or speculative abstractions.
- Add a layer's implementation when a feature needs it. Do not invent a model
  or database call for a behavior that does not need persistence.

## Validation

- `npm test` runs request behavior tests using Node's runner and Supertest.
- `npm run typecheck` checks application, tests, and Drizzle configuration.
- `npm run build` compiles the application and copies Vento templates.
- `npm start` runs the compiled application; `npm run dev` runs watched source.
- Never require production database credentials for the Hello world tests.
- Do not run migrations against an external database without authorization.
- Keep secrets out of source, tests, logs, and committed configuration.
