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

Lagoon: Your Travel Companion 🌍✈️

## Overview

Tired of juggling multiple tabs to plan your trips?

Lagoon simplifies the process by integrating weather forecasts, public holidays, and attraction suggestions into a single, intuitive platform. It doesn’t stop there — Lagoon also tracks your travel history with detailed statistics and an interactive map of all the places you’ve visited.

### Problem Space

Planning a trip often requires switching between multiple websites or apps to check weather forecasts, public holidays, and activity options, leading to a fragmented and time-consuming experience. Lagoon solves this by consolidating essential travel planning information into one user-friendly platform, streamlining the entire process.

After traveling, people often struggle to keep track of where they’ve been. Lagoon doubles as a travel journal, recording past itineraries, offering trip statistics, and displaying a digital world map of your travels — making it easy to share your journeys with others.

### User Profile

Key User Stories:

🧳 As a traveler, I want to plan my trip in one place so I don’t have to switch between multiple tabs.

🧳 As a traveler, I want to easily share my itinerary with friends and family without needing to send Google Sheets or Docs.

🧳 As a traveler, I want to keep track of all my trip history, with the ability to download and share it with friends or print it out.

### Features

Add New Trip: Start your journey by simply entering a location and dates.

Trip Planning:

- Update trip name for a personal touch
- Add or remove attractions on specific itinerary dates
- Add personal notes for each attraction
- Interactive map displaying daily itineraries with connecting routes
- View real-time weather and public holiday information
- Download your complete itinerary to share with friends

Travel Journal & Map:

- Keep track of all places you’ve visited in one visual dashboard
- Interactive world map that replaces the need for a traditional pinboard
- Color-coded markers to distinguish between completed and upcoming trips
- View trip statistics, including counts of upcoming and completed journeys

## Implementation

### Tech Stack

- Frontend: ⚛️ React (React Router, Axios, React-Datepicker)

- Backend: 🖥️ Express.js (Node.js framework) 📦 Knex.js (SQL query builder)

- Database: 🗄️ MySQL

### APIs

- External:

1. **Weather Api**: Provides integrated weather forecasts. (Limited to 14-day forecasts)
2. **Nager.Date**: Fetches public holiday data by year and country
3. **Google Geocoding Api**: Retrieves geocode for each location
4. **Maps JavaScript Api**: Visualizes daily attractions and maps out visited cities.

- Internal:

Custom endpoints for fetching attractions, saving itineraries, and managing user data (see Endpoints section).

### Sitemap

```
🏠 Homepage
│
├── 🌏 Travel Journal Page
│     ├── Add New Trip (input location + dates → redirects to Trip Planning Page)
│     ├── Trip Statistics (Upcoming trips, Completed trips, Countdown to next trip)
│     ├── Map (Visited & Upcoming Trips, with pins & images)
│     └── Trips List (Upcoming + Completed)
│           ├── Edit button (for upcoming → Trip Planning Page)
│           └── View button (for past trips → Trip Planning Page)
│
├── 📅 Trip Planning Page
│     ├── Weather and Holiday Display
│     ├── Daily Route Map
│     ├── Attractions List (Add/Delete attractions, Add notes)
│     └── Planner by day (Hover to delete attraction + Download itinerary + Edit notes)
│
└── ℹ️ About Us
└── ℹ️ Discover (Cities suggestions & Plan your trip button → redirects to Trip Planning Page)
```

### Mockups

![HomePage](https://github.com/user-attachments/assets/c5e26d81-5989-4d60-8a73-c1d4fe05322f) ![HomePage-create](https://github.com/user-attachments/assets/da39b1ff-7fd1-4eb5-b9f6-78187eae30d6) ![TripPlanningPage](https://github.com/user-attachments/assets/74fa13a9-efee-439d-a288-695464573de1) ![TravelJournalPage](https://github.com/user-attachments/assets/d12cd7d8-0164-4d09-8563-efde021f2bd8)

### Data

![sql-diagram](https://github.com/user-attachments/assets/0522c6b3-22d8-4c5d-b769-0c159a4d1424)

### Endpoints

**GET /api/users**

- Retreve the list of users
- Parameters: none
- Response:

```
[
{
        "id": 2,
        "user_name": "Benson",
        "created_at": "2025-03-12T19:08:47.000Z",
        "updated_at": "2025-03-12T19:08:47.000Z"
    },
    {
        "id": 3,
        "user_name": "Charlie",
        "created_at": "2025-03-12T19:08:47.000Z",
        "updated_at": "2025-03-12T19:08:47.000Z"
},
]
```

**POST /api/users**

- Creates or retrieves a user based on user_name.
- Parameters: Request Body:

```
{
  "user_name": "John"
}
```

Response: If user exists: Returns the existing user_id. If new user: Creates the user and returns the new user_id.

```
 {
   "id": 4,
    "user_name": "John",
    "created_at": "2025-03-12T22:27:36.000Z",
    "updated_at": "2025-03-12T22:27:36.000Z"
}
```

**GET /api/users/:id/itineraries**

- Retrieve all the itineraries of a single user
- Parameters: userId
- Response:

```
{
    "username": "Benson",
    "itineraries": [
        {
            "id": 37,
            "user_id": 2,
            "location": "Sydney",
            "start_date": "2025-03-27T04:00:00.000Z",
            "end_date": "2025-03-29T04:00:00.000Z",
            "itinerary_name": null,
            "attraction_count": 0
        },
        {
            "id": 2,
            "user_id": 2,
            "location": "Tokyo",
            "start_date": "2025-03-13T04:00:00.000Z",
            "end_date": "2025-03-17T04:00:00.000Z",
            "itinerary_name": "Golden Week in Tokyo",
            "attraction_count": 0
        }
    ]
}

```

**GET /api/itineraries**

- Retrieve the list of all itineraries
- Parameters: none
- Response:

```
[
    {
        "id": 1,
        "user_id": 1,
        "location": "London",
        "start_date": "2025-03-12T04:00:00.000Z",
        "end_date": "2025-03-15T04:00:00.000Z",
        "itinerary_name": "Spring in London",
        "created_at": "2025-03-12T19:11:29.000Z",
        "updated_at": "2025-03-12T19:11:29.000Z"
    },
    {
        "id": 2,
        "user_id": 2,
        "location": "Tokyo",
        "start_date": "2025-03-13T04:00:00.000Z",
        "end_date": "2025-03-17T04:00:00.000Z",
        "itinerary_name": "Golden Week in Tokyo",
        "created_at": "2025-03-12T19:11:29.000Z",
        "updated_at": "2025-03-12T19:11:29.000Z"
    },
]
```

**POST /api/itineraries**

- Creates a new itinerary
- Parameters: Request Body:

```
 {
 "user_id":4,
 "location": "London",
 "start_date": "2025-03-20",
 "end_date": "2025-03-24",
 }
```

Response:

```
{
  "id": 3,
  "user_id": 2,
  "location": "Sydney",
  "start_date": "2025-03-27T04:00:00.000Z",
  "end_date": "2025-03-29T04:00:00.000Z",
  "itinerary_name": "Weekend in Sydney"
  "created_at": "2025-03-23T15:10:52.000Z"
  "updated_at": "2025-03-23T15:10:52.000Z"
}

```

**GET /api/itineraries/:id**

- Retrieve a single itinerary with its attractions
- Parameters: itineraryId
- Response:

```
{
    "id": 38,
    "user_id": 1,
    "location": "Sydney",
    "start_date": "2025-03-30T04:00:00.000Z",
    "end_date": "2025-04-04T04:00:00.000Z",
    "itinerary_name": "Finding Koala in Australia",
    "attractions": [
        {
            "id": 45,
            "day": 1,
            "attraction_name": "Sydney Opera House",
            "description": "Iconic performing arts venue with distinctive sail-shaped design.",
            "suggested_duration": "1-2 hr",
            "tags": "landmark,architecture,culture",
            "user_notes": "Must go! Cant wait to check this out.",
            "image": "Photo-45.jpg"
        },
        {
            "id": 46,
            "day": 2,
            "attraction_name": "Sydney Harbour Bridge",
            "description": "Steel arch bridge spanning Sydney Harbour.",
            "suggested_duration": "1-2 hr",
            "tags": "landmark,view,iconic",
            "user_notes": "Should we climb it as well?",
            "image": "Photo-46.jpg"
        },
    ]
}
```

**PUT /api/itineraries/:id**

- Update an existing itinerary
- Parameters: itineraryId
- Request Body:

```
 {
   "id" : 1,
   "user_id" :2
   "location": "London"
   "start_date": "2025-04-01",
   "end_date": "2025-04-05",
   "itinerary_name": "Lodon- Summer Getaway",
 };

```

Response:

```
{
   "id" : 1,
   "user_id" :2
   "location": "London"
   "start_date": "2025-04-01",
   "end_date": "2025-04-05",
   "itinerary_name": "Lodon- Summer Getaway",
}
```

**POST/api/itineraries/:id**

- Add an attraction to an itinerary
- Parameters: itineraryId
- Request Body:

```
{
  "attraction_id": 3,
  "user_notes": "Plan to arrive early to avoid crowds",
  "day": 2
}
```

-Response:

```
{
  "message": "Attraction with id 3 is added to itinerary 1 on Day 2"
}
```

**DELETE /api/itineraries/:id**

- Remove an attraction from an itinerary
- Parameters: itineraryId
- Request Body:

```
{
  "attraction_id": 3
}
```

- Response:

```
{
  "message": "Attraction deleted successfully"
}
```

**PATCH /api/itineraries/:id**

- Update user notes for an attraction in an itinerary
- Parameters: itineraryId
- Request Body:

```
{
  "attraction_id": 1,
  "user_notes": "Updated note: Visit at sunset and stay for the light show"
}
```

- Response:

```
{
  "itinerary_id": 1,
  "attraction_id": 1,
  "user_notes": "Updated note: Visit at sunset and stay for the light show",
  "day": 1
}
```

**GET /api/attractions**

- Retrieve attractions based on location
- Parameters: Query parameter: location (required) Example: /api/attractions?location=Tokyo

Response:

```
[
   {
        "id": 13,
        "location": "Tokyo",
        "attraction_name": "Shibuya Crossing",
        "description": "Famous busy pedestrian crossing.",
        "suggested_duration": "1-2 hr",
        "tags": "urban,landmark,iconic",
        "image": "Photo-13.jpg",
        "created_at": "2025-03-23T02:18:57.000Z",
        "updated_at": "2025-03-23T02:18:57.000Z"
    },
    {
        "id": 14,
        "location": "Tokyo",
        "attraction_name": "Senso-ji Temple",
        "description": "Historic Buddhist temple in Asakusa.",
        "suggested_duration": "1-2 hr",
        "tags": "temple,culture,history",
        "image": "Photo-14.jpg",
        "created_at": "2025-03-23T02:18:57.000Z",
        "updated_at": "2025-03-23T02:18:57.000Z"
    }
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

- Test API endpoints and fix bugs.
- Polish UI (e.g., activity cards, weather display); add Sydney attractions if time allows.
- Final testing and documentation.
- Demo Day

## Installation

To run locally:

git clone <repo-url> cd <project-folder> npm install npm run dev

## Future Implementations

Login Page: Allows users to log in or register to save itineraries.

Collaboration: Logged-in users can invite friends to view/edit itineraries and share plans.

Social Features: Like/comment function on attractions, showing popularity among friends to help with the planning process.

Travel Details: Link flight and hotel booking APIs (e.g., Google Travel) for seamless integration.
