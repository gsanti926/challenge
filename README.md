# Hotel Search Challenge - Frontend Technical Test

## Overview

This is a **frontend technical test** for junior developers. You have **1 hour and 30 minutes** to complete the challenge.

## Context

This Angular project contains a base application with:
- ✅ **Landing Page** - Already implemented with a login button
- ✅ **Login Page** - Already implemented with airline selection, employee number, and password fields
- ❌ **Hotel Search Page** - **TO BE IMPLEMENTED BY YOU**
- ❌ **Route Guards** - **TO BE IMPLEMENTED BY YOU**

## Your Tasks

### 1. Implement Hotel Search Page (`/hotels`)

Create functionality in the `hotel-search` component to:
- Display a search form with filters (city, dates, etc.)
- Make an HTTP request to fetch hotels using the API endpoint below
- Display the results in a list or cards
- **OPTIONAL:** Display hotels on a map

**Autocomplete API Endpoint (for destination search):**

To get destination information (city, latitude, longitude), use the autocomplete endpoint:

```
GET https://beta.id90travel.com/api/v1/autocomplete
```

**Query Parameters:**
- `text` - The destination name to search (e.g., "cancun", "las vegas")
- `v` - API version (use: 1018293)

**Required Headers:**
- `X-APP-NAME: angular-desktop`
- `X-APP-VERSION: 1018293`
- `Accept: application/json, text/plain, */*`

**Example:**
```
https://beta.id90travel.com/api/v1/autocomplete?text=cancun&v=1018293
```

This endpoint returns destination suggestions with their coordinates (latitude/longitude) that you'll need for the hotel search.

---

**Hotel Search API Endpoint:**

Use the following endpoint to fetch hotels:

```
GET https://beta.id90travel.com/api/v3/hotels.json
```

**Required Query Parameters:**
- `checkin` - Check-in date (format: YYYY-MM-DD)
- `checkout` - Check-out date (format: YYYY-MM-DD)
- `destination` - Destination name (e.g., "Las Vegas, Nevada, United States")
- `latitude` - Latitude coordinate
- `longitude` - Longitude coordinate
- `rooms` - Number of rooms
- `guests[]` - Number of guests per room
- `currency` - Currency code (e.g., "USD")
- `per_page` - Results per page (e.g., 500)
- `page` - Page number
- `v` - API version (use: 1018293)

**Required Headers:**
- `X-API-CALL-V2: true`
- `X-APP-NAME: angular-desktop`
- `X-APP-VERSION: 1018293`
- `Authorization: Token token=YOUR_TOKEN` (obtain from login response)
- `Content-Type: application/json`
- `Accept: application/json, text/plain, */*`

**Example:**
```
https://beta.id90travel.com/api/v3/hotels.json?checkin=2026-03-08&checkout=2026-03-09&destination=Las%20Vegas,%20Nevada,%20United%20States&rooms=1&longitude=-115.172872&latitude=36.114666&guests%5B%5D=2&currency=USD&per_page=500&page=1&v=1018293
```

**Acceptance Criteria:**
- User can search for hotels using filters
- Results are displayed in a clean, organized way
- The page is responsive and styled appropriately

### 2. Implement Route Guards

Create Angular guards to protect routes:

**Auth Guard:**
- If the user is **NOT logged in** and tries to access `/hotels`, redirect to `/login`

**Login Redirect Guard:**
- If the user **IS logged in** and tries to access `/login`, redirect to `/hotels`

**Tip:** Use the `AuthService` in `src/app/core/auth/auth.service.ts` which already has `isLoggedIn()` method.

## Evaluation Criteria

You will be evaluated on:
- ✅ **Functionality** - Does the application work as expected?
- ✅ **Code Quality** - Is the code clean, organized, and following Angular best practices?
- ✅ **Component Structure** - Proper use of components and services
- ✅ **Routing & Guards** - Correct implementation of navigation guards
- ✅ **UI/UX** - Is the interface user-friendly and well-styled?
- ✅ **Problem Solving** - Ability to read existing code and implement new features

## Getting Started

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
