You are a senior SaaS product designer, senior full-stack engineer, senior React architect, and senior salon business consultant.

Build a modern, production-ready DEMO salon web application that can be reused and rebranded for many different salons.

TECH STACK (IMPORTANT)

Use the following stack:

- React
- TypeScript (TSX)
- Modern React architecture
- Tailwind CSS for styling
- Clean reusable components
- Environment variables (.env) for salon branding
- Code structure ready to deploy on Vercel

All UI components must be written using React with TypeScript (.tsx).

IMPORTANT GOAL

This is not a website for one specific salon.  
This must be a generic, premium-looking salon website and admin system that almost any salon owner would want for their business.

The system must be easy to customize for each client by changing salon core details quickly without editing many files.

CORE BUSINESS PURPOSE

The website should help salons:

1. attract new customers
2. show services clearly
3. display the brand professionally
4. allow appointment booking online
5. allow either “Pay Now” or “Pay at Salon”
6. let admins manage bookings easily

CUSTOMIZATION REQUIREMENT

Design the application so salon branding and business details can be changed easily using environment variables and one centralized configuration module.

Use `.env` for salon core settings.

These fields must exist in `.env.example`:

SALON_NAME
SALON_TAGLINE
SALON_PHONE
SALON_WHATSAPP
SALON_EMAIL
SALON_ADDRESS
SALON_MAP_LINK

SALON_PRIMARY_COLOR
SALON_SECONDARY_COLOR
SALON_ACCENT_COLOR

SALON_FACEBOOK
SALON_INSTAGRAM
SALON_TIKTOK

SALON_OPEN_DAYS
SALON_OPEN_HOURS

ONLINE_BOOKING_ENABLED
ONLINE_PAYMENT_ENABLED
PAY_AT_SALON_ENABLED

STRIPE_PUBLIC_KEY
STRIPE_SECRET_KEY

CURRENCY
TIMEZONE

All salon identity values must be read from environment variables or a central config object so the project can be easily rebranded.

Avoid hardcoding salon names, addresses, or contact details across many files.

PUBLIC WEBSITE PAGES

1. Home / Landing Page

- hero section
- salon introduction
- CTA buttons (Book Now, View Services)
- featured services
- testimonials
- gallery preview
- opening hours
- contact preview
- modern responsive design

2. Services Page

- service categories (Hair, Nails, Facial, Makeup, Spa, Grooming)
- each service includes:
  - name
  - description
  - price
  - duration
- card layout
- category filtering

3. Appointment Booking Page

Booking flow:

Step 1: select service  
Step 2: select staff (optional)  
Step 3: select date  
Step 4: select available time slot  
Step 5: customer details form  
Step 6: choose payment method

Payment options:

Pay Now  
Pay at Salon

If Pay Now:
open Stripe checkout.

If Pay at Salon:
create booking with payment status "pending".

Show confirmation screen.

Prevent double bookings.

4. Gallery Page

- salon photos
- hairstyle portfolio
- masonry or grid layout
- easy image replacement

5. About Page

- salon story
- team section
- brand values

6. Contact Page

- phone
- email
- address
- map embed
- contact form
- opening hours
- social links

ADMIN DASHBOARD

Build a secure admin dashboard using React.

Features:

Dashboard Overview

- today's bookings
- upcoming bookings
- revenue summary
- pending payments

Booking Management

- view all bookings
- filter by status
- update status
- assign staff
- add notes

Booking statuses:
pending  
confirmed  
checked_in  
in_progress  
completed  
cancelled  
no_show

Payment Handling

Stripe payments must automatically mark bookings as paid.

Pay-at-salon bookings must remain unpaid until admin updates them.

Payment statuses:
unpaid  
pending  
paid  
refunded

Admin should be able to mark payment as "Paid in Salon".

Service Management

Admin can:

- create services
- edit services
- delete services
- set price
- set duration
- assign category

Staff Management

Admin can:

- add staff
- edit staff
- set specialties
- set availability
- enable/disable staff

Gallery Management

Admin can:

- upload images
- delete images
- reorder gallery

TECHNICAL REQUIREMENTS

Use React with TypeScript (.tsx) for the full UI.

Use component-based architecture.

Example folder structure:

src
components
pages
layouts
hooks
services
config
utils
types
dashboard

Create a central config module that reads from `.env`.

Ensure the same codebase can be reused for many salons.

Make the design modern and premium.

Add proper form validation.

Include loading states and error states.

Include demo data.

PAYMENT LOGIC

Implement two payment modes.

Pay Now

- integrate Stripe checkout
- booking confirmed after successful payment

Pay at Salon

- booking created without online payment
- admin marks payment as completed later

BOOKING RULES

- service duration affects time slots
- staff availability respected
- prevent overlapping bookings
- clear confirmation messages
- show payment mode clearly

DESIGN STYLE

Elegant salon aesthetic.

Premium but generic enough for many salons.

Clean typography.

Rounded cards.

Soft color palette.

Mobile-first responsive design.

DELIVERABLES

Provide:

- complete React + TypeScript project
- reusable architecture
- admin dashboard
- demo data
- setup instructions
- `.env.example`
- explanation of which `.env` fields to change to rebrand the salon
- database schema for bookings, services, staff, payments
- instructions to deploy on Vercel
