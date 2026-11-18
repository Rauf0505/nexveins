# nexveins

## Deployment

The production build runs on **webpack**, not Turbopack:

```
npm run build   # next build --webpack
```

Turbopack is still the default for `npm run dev`. The build flag is deliberate.
On Hostinger's Node.js builder, Turbopack evaluates the PostCSS loader
(`@tailwindcss/postcss`) in a spawned Node child process. That child exits
immediately with status 0 and no output, which surfaces as:

```
FATAL: An unexpected Turbopack error occurred.
Error [TurbopackInternalError]: Failed to write app endpoint /page
Caused by:
- [project]/app/globals.css [app-client] (css)
- creating new process
- node process exited before we could connect to it with exit status: 0
```

Webpack runs the same loader in-process, so there is no child to lose. Output
is equivalent: Tailwind Preflight and every hand-written rule in
`app/globals.css` are present in both builds. The project uses no Tailwind
utility classes — every `className` is a semantic class defined in
`globals.css` — so nothing depends on Turbopack's CSS pipeline.

If a future change introduces Tailwind utilities, re-check this before
switching the build back to Turbopack.

### Runtime

`next start` binds `0.0.0.0` and honours the `PORT` environment variable, so
the stock `npm start` works behind Hostinger's proxy. Node must be **20.9 or
newer** (Next 16.4 requirement); the builder currently uses Node 22.