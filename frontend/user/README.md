# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## User app setup

Create `frontend/user/.env.local` with:

```dotenv
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_public_token
VITE_API_BASE_URL=http://localhost:8080/api
```

The app uses Mantine components with KSU theme colors. The Mapbox map and custom brick preview remain specialized components.

## API endpoints

The frontend API module calls the existing public Spring endpoints:

- `GET /user/bricks/search?q={query}&campus={campus}&page=0&size=50`
- `GET /user/bricks/{id}`

Set `VITE_API_BASE_URL` to the Spring API root ending in `/api`. Brick search reports API/network errors in the UI rather than silently substituting fixture data.

Campus section coordinates are not served by the backend yet. `src/api/campuses.js` provides a frontend stub for that missing endpoint using the configured data in `src/data/campuses.js`. Replace the stub with the campus/sections API request when the backend route is available. Coordinates use Mapbox's `[longitude, latitude]` order.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
