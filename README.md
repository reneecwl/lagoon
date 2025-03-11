## Table of Contents

1. [Overview](#overview)
2. [Problem Space](#problem-space)
3. [User Profile](#user-profile)
4. [Features](#features)
5. [Tech Stack](#tech-stack)
6. [APIs](#apis)
7. [Sitemap](#sitemap)
8. [Mockups](#mockups)
9. [Data](#data)
10. [Endpoints](#endpoints)
11. [Roadmap](#roadmap)
12. [Future Implementations](#future-implementations)

# Project Title
Lagoon: Your Travel Planner 🌍✈️

## Overview

Tired of juggling multiple tabs to plan your trips?

Lagoon simplifies the process by integrating weather forecasts, public holidays, and activity suggestions into a single, intuitive platform.

### Problem Space

Planning a trip often requires juggling multiple websites or apps to check weather forecasts, public holidays, and activity options, leading to a fragmented and time-consuming experience. Lagoon addresses this pain point by consolidating essential travel planning information into a single, user-friendly interface, reducing the need for multiple tabs and streamlining the process.

### User Profile

Key User Stories:

- 🧳 As a traveller, I want to plan my trip in one place so that I don’t have to switch between multiple tabs.

- 🧳 As a traveller, I want to be able to revisit my itinerary and resume planning later.

### Features

- Trip Input: Users input location, travel dates, days and user name on the Homepage; submitting creates an initial itinerary with weather and holiday data.

- Trip Planning: Users add the itinerary_name, browse curated attractions and add them to their itinerary, updating the saved plan.

- Itinerary Builder: Users can view all their itineraries in one page, allowing them to add new itinerary or click the itinerary and route back to the planning page.

## Implementation

### Tech Stack

- Frontend: ⚛️ React (React Router, Axios, React-Datepicker, React-Responsive)

- Backend: 🖥️ Express.js (Node.js framework) 📦 Knex.js (SQL query builder)

- Database: 🗄️ MySQL

Optional Features: 🖱️ React-Draggable (Drag-and-drop activity planning) 📊 React-ChartJS-2 (Weather data visualization)

### APIs

- External:

1. **OpenWeatherMap**: Provides weather forecasts (e.g., GET /forecast?q={city}&appid={key}). Limited to 30-day forecasts.
2. **Nager.Date**: Fetches public holiday data by year and country (e.g., GET /PublicHolidays/{year}/{countryCode}).
3. **Google Places API (Stretch)**: Enhances location search with autocomplete (optional).

- Internal:

Custom endpoints for fetching attractions, saving itineraries, and managing user data (see Endpoints section).

### Sitemap

<img width="1364" alt="sitemap" src="https://github.com/user-attachments/assets/ba40e23f-2096-4f67-9c5a-e1b80c336eef" />


1. **Homepage**:

- Users create new itinerary by input location, travel dates days and name; submits to fetch data. Connection: Leads to Trip Planning Page on submission.
- Users able to retrieve exisitng itinerary, connect lead to Itinerary Page.

2. **Trip Planning Page**: Displays weather, holidays, and activity options; users add attractions to their plan. Connection: Links back to Homepage or forward to Itinerary Page.

3. **Itinerary Page**: Shows the finalized itinerary with weather, holidays, and selected attractions. Connection: Links back to Trip Planning Page for edits or Homepage to start over.

### Mockups
![HomePage](https://github.com/user-attachments/assets/c5e26d81-5989-4d60-8a73-c1d4fe05322f)
![HomePage-create](https://github.com/user-attachments/assets/593cfc87-339b-4906-bd64-bb5fb52268a4)
![TripPlanningPage](https://github.com/user-attachments/assets/74fa13a9-efee-439d-a288-695464573de1)
![ItineraryPage](https://github.com/user-attachments/assets/d12cd7d8-0164-4d09-8563-efde021f2bd8)

### Data
![sql-diagram](https://github.com/user-attachments/assets/bb4938e5-345a-473d-8602-4b0c44c3f296)

### Endpoints

**POST /api/users**

- Creates or retrieves a user based on user_name.
- Parameters:
Request Body:
```
{
  "user_name": "JohnDoe"
}
```
Response: If user exists: Returns the existing user_id. If new user: Creates the user and returns the new user_id.

```
{
 "user_id": 1,
 "user_name": "John Doe",
 "message": "User retrieved/created"
}
```

**GET /api/itineraries**

- Retrieves a list of all itineraries in the system (for demo purposes, assuming one user).
- Parameters: None
Response
```
[
 {
 "itinerary_id": 1,
 "location": "London",
 "date": "May 13-20",
 "days": 4,
 "itinerary_name": "Autumn in London",
 "attractions": [...]
 }, ...
]
```

**POST /api/itineraries**

- Creates a new itinerary with weather, holiday, and attractions data, associating it with a user
- -Parameters:
Request body:
```
{
 "location": "London",
 "date": "May 13-20",
 "days": 4,
 "itinerary_name": "Autumn in London",
 "user_name": "John Doe"
}
```

Response: 
```
{
 "itinerary_id": 1,
 "user_id": 1, "weather": {...},
 "holidays": [...],
 "attractions": [...],
 "cityImage": "/images/london-city.jpg"
}
```

**GET /api/itineraries/:id**
- Retrieves a single itinerary with its associated attractions.
- Parameters: URL: itinerary_id
Response:

```
{
 "itinerary_id": 1,
 "location": "London",
 "date": "May 13-20",
 "days": 4,
 "itinerary_name": "Autumn in London",
 "attractions":
  [
    { "attraction_id": 1,
       "attraction_name": "London Eye",
      "description": "Iconic Ferris wheel",
      "tags": "outdoor,family",
      "image": "/images/london-eye.jpg",
      "user_notes": "Visit at sunset" }
, ...
  ]
}
```

**PUT /api/itineraries/:id**

- Updates an existing itinerary by adding attractions to the itinerary_attractions table
- Parameters: URL:itinerary_id
Request Body:

```
{
 "activity_id": 1,
 "user_notes": "Visit at sunset",
 "itinerary_name": "Autumn in London"
}
```

Response: 
```
{
 "itinerary_id": 1,
 "message": "Itinerary updated"
}
```

**GET /api/attractions**

- Retrieves a static list of pre-prepared attractions for the fixed location.
- Parameters: Query: location (e.g., /api/attractions?location=London)

Response:
```
[
 {
   "activity_id": 1,
   "location": "London",
   "activity_name": "London Eye",
   "description": "Iconic Ferris wheel",
   "tags": "outdoor,family",
   "image": "/images/london-eye.jpg"
 }, ...
]
```

## Roadmap

Week 1

- Set up project (React frontend, Express backend, MySQL database, Knex config).
- Build Homepage with form; implement POST /api/itineraries to create an initial itinerary
- Integrate OpenWeatherMap and Nager.Date APIs; seed attractions with London data.
- Create Trip Planning Page to display weather, holidays, and attractions; add PATCH /api/itineraries/:id to update attractions.
- Build Itinerary Page to show the saved plan; test GET /api/itineraries/:id.

Week 2

- Add responsiveness
- Test API endpoints and fix bugs.
- Polish UI (e.g., activity cards, weather display); add Sydney attractions if time allows.
- Final testing and documentation.
- Demo Day

## Future Implementations

Login Page: Allows users to log in or register to save itineraries.

Collaboration: Logged-in users can invite friends to view/edit itineraries and share plans.

Travel Style incorporated in Homepage question (e.g., "chill" vs. "packed") to auto-suggest attractions using AI (e.g., Open AI integration).

Social Features: Like/comment function on attractions, showing popularity among friends to help with the planning process.

Travel Details: Link flight and hotel booking APIs (e.g., Google Travel) for seamless integration.

Integrate Google Maps: Display the locations of selected attractions to enhance the user experience
