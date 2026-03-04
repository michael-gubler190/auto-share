# AutoShare
## Problem Statement
There are times people need to be able to rent a car. Whether it is because they are on vacation or simply need a car for only a couple of days or whatever their reasons may be.

Individuals want to rent cars from other users but coordinating availability, payments, and trust is fragmented across messaging apps and manual payment methods.

## Solution
A web app that enables users to rent cars from other users through secure, online payments and chats.

## MVP Scope
1. User registers and authenticates
2. Owner lists a car
3. Renter submits a booking request
4. Owner approves or rejects the request
5. Payment is processed upon approval
6. Rental period begins (Active)
7. Rental completes and review becomes available

## Core Entities
- **Users**
- **Cars**
- **Bookings**
- **Payments**
- **Reviews**

### Entity Relationships
- A **User** owns many Cars
- A **Car** can recieve many reviews
- A **User** can be the sender of a review
- A **Booking** belongs to one Car
- A **Booking** has one Renter
- A **Payment** belongs to one Booking
- A **Booking** maintains a controlled status lifecycle


### Booking State Transitions

| State      | Trigger Event | Who Can Trigger | Allowed Next States |
|------------|--------------|----------------|---------------------|
| Requested  | Booking is created | Renter | Approved, Rejected |
| Approved   | Owner accepts booking request | Owner | Active, Cancelled |
| Rejected   | Owner rejects booking request | Owner | None (terminal) |
| Active     | Rental period begins / vehicle handed off | System or Owner | Completed |
| Completed  | Rental period ends / vehicle returned | System | None (terminal) |
| Cancelled  | Booking is cancelled | Owner or Renter (based on policy) | None (terminal) |

## Architecture
### Tech Stack
| Category | Technology |
| ----------- | ----------- |
| Frontend | TypeScript, ReactJS, Vite |
| Backend | Java, Spring Boot |
| Security | Spring Security, JWT |
| Database | PostgreSQL (Neon) |
| File Storage | AWS S3 |
| Caching | Redis |
| API Docs | Swagger |
| CI/CD | GitHub Actions |
| Containerization | Docker |
| Version Control | Git |
| Deployment | Vercel, Heroku |


### Security Implementation
- JWT-based authentication
- Role-based access control (Owner, Renter, Admin)
- BCrypt password hashing
- Input validation
- Protected route middleware
- Secure file upload handling



## Engineering Highlights

- Conflict-safe booking logic with date overlap validation
- Transactional payment handling tied to booking state
- Explicit domain-driven state transitions
- Database indexing for performance
- Environment-based configuration
- CI/CD pipeline for automated builds
- Dockerized backend for consistent deployment


## Purpose of This Project

AutoShare was built to demonstrate strong full-stack application development capabilities, including:

- Backend API design
- Relational schema modeling
- Transactional state machines
- Authentication and authorization
- Cloud-native deployment
- Production-oriented architecture decisions

This project focuses on system design quality, maintainability, and engineering discipline.