# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"burak-react" — the Create React App (CRA) + TypeScript frontend for the "Burak" restaurant app. Talks to the backend at the sibling directory `../Burak` (JSON REST API, see that repo's `CLAUDE.md`).

## Commands

```
npm start          # react-scripts start — dev server
npm run build       # react-scripts build — production bundle to build/
npm run start:prod  # serve -s build -l 3000 — serve a production build locally
npm test             # react-scripts test (CRA/Jest) — no meaningful test suite currently exists
```

Backend base URL comes from `REACT_APP_API_URL` in `.env` (points at the Burak backend, e.g. `http://localhost:3006` in dev). CRA requires env vars to be prefixed `REACT_APP_` to be exposed to the client bundle.

## Publishing / component conventions (from project README)

- Layout components: `Container` (1300px), `Stack`, `Box`.
- Component types: **Screen** components (e.g. `HomePage`, `ProductsPage`) are full pages; **Sectional** components (e.g. `Statistics`, `PopularDishes`) are page sections; **Common** components (e.g. `Header`, `Footer`) are shared/reusable across screens.

## Architecture

Organizing pattern: **pages with feature-colocated Redux**. Everything lives under `src/app/`:

```
src/app/
  screens/<pageName>/   # one folder per route: page + its sub-components + slice.ts + selector.ts
  services/               # API call layer — MemberService, OrderService, ProductService (raw axios calls)
  context/, hooks/          # ContextProvider/useGlobals (global auth state), useBasket (cart)
  components/               # shared UI: navbar, footer, auth modal
  store.ts                   # Redux store config
src/lib/
  config.ts    # serverApi (= REACT_APP_API_URL) + Messages (error strings)
  types/, enums/  # centralized TS interfaces and enums, shared across screens
```

Each `screens/<page>` folder is a self-contained feature module: its `slice.ts` (Redux Toolkit reducer) and `selector.ts` (reselect selectors) live next to its components. Cross-cutting state (auth, cart) is pulled out to top-level `context/`/`hooks/` instead.

### State is split across three separate mechanisms — know which one to use where

1. **Redux Toolkit** (`store.ts`, per-screen `slice.ts`) — server-fetched data: products, orders, top users. Components build a local `actionDispatch(dispatch)` wrapper and dispatch after an `axios` call resolves in `useEffect`; select with `useSelector` + a `createSelector` combo from the screen's `selector.ts`.
2. **React Context** (`context/ContextProvider.tsx`, `hooks/useGlobals.ts`) — the actual auth state store: `authMember`, `setAuthMember`. Also holds `orderBuilder`, a timestamp bumped after order mutations to trigger refetches. This is intentionally separate from Redux — auth is client/session state, not server data being cached.
3. **Local `useState` + `localStorage`** (`hooks/useBasket.ts`) — the shopping cart, persisted under `localStorage["cartData"]`, entirely independent of Redux/Context.

The typed `useAppDispatch`/`useAppSelector` in `app/hooks.ts` exist but are not actually used by the screens — screens call the plain `react-redux` `useDispatch`/`useSelector` directly.

### Backend connection

No shared axios instance/interceptor exists — each method in `src/app/services/*.ts` calls `axios.get/post` directly against `serverApi + path` (from `lib/config.ts`), passing `{ withCredentials: true }` on any call that needs the session cookie. Endpoints called: `/member/*` (login, signup, logout, update, detail, top-users, restaurant), `/product/*` (all, `:id`), `/order/*` (create, all, update).

### Auth

Session is cookie-based (`accessToken`, set by the backend on login/signup) — the frontend never manually attaches a bearer token, it relies on `withCredentials: true` so the browser sends the cookie automatically. On top of that, the logged-in `Member` object itself is cached in `localStorage["memberData"]` and mirrored into `authMember` in Context, which is what components actually read to decide what to render.

There is no dedicated `PrivateRoute`/route-guard component — protected screens instead check `if (!authMember) history.push("/")` inline near the top of the component body, and mutating actions (add to basket, update order, etc.) individually guard with the same check before firing.
