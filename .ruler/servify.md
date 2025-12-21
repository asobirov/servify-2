# Servify - Home Services Marketplace

## Vision

Servify is a two-sided marketplace platform connecting customers with trusted home service professionals and agencies. The platform enables customers to discover, compare, and book home services while empowering providers to grow their business.

## User Personas

### Customer
- Homeowners or renters seeking professional home services
- Can search, filter, and browse available services
- Books services via instant booking or quote requests
- Manages their bookings and service history

### Provider
- Individual professionals offering home services
- Creates and manages their profile and service offerings
- Sets availability and service areas
- Receives and manages booking requests
- Can operate independently or join an agency

### Agency
- Businesses managing multiple service providers
- Has an agency profile with branding
- Manages team of providers
- Handles scheduling and assignments across their team
- Views aggregate analytics and bookings

## Domain Model

### Core Entities

| Entity | Description |
|--------|-------------|
| User | Base authentication entity (via Better Auth). Can be customer, provider, or agency admin |
| Provider | Professional profile with services, availability, and service areas |
| Agency | Business entity that manages multiple providers |
| ServiceCategory | Top-level grouping (Cleaning, Handyman, Plumbing, etc.) |
| Service | Specific service a provider offers with pricing |
| Availability | Provider's calendar slots and recurring schedules |
| Region | Hierarchical geographic entity (country → city → district) with PostGIS polygon |
| ProviderServiceArea | Junction linking Provider to Region(s) they serve |
| CustomerAddress | Customer's saved addresses with coordinates (multiple per customer) |
| Booking | Service request from customer to provider |
| Quote | Price estimate for quote-based bookings |

### Entity Relationships

- User → Provider (1:0..1) - A user can optionally be a provider
- User → Customer (1:0..1) - A user can optionally be a customer
- User → CustomerAddress (1:N) - Customer can have multiple saved addresses
- Provider → Agency (N:0..1) - Provider can belong to one agency
- Provider → Availability (1:N) - Provider has many availability slots
- Provider → Service (1:N) - Provider offers many services
- Provider → ProviderServiceArea (1:N) - Provider covers many regions
- ProviderServiceArea → Region (N:1) - Service areas reference regions
- Region → Region (N:1) - Hierarchical (district belongs to city)
- ServiceCategory → Service (1:N) - Category contains services
- CustomerAddress → Region (N:1) - Address belongs to a district
- Booking → CustomerAddress (N:1) - Booking happens at customer address
- Customer → Booking (1:N) - Customer creates bookings
- Provider → Booking (1:N) - Provider receives bookings
- Booking → Quote (1:0..1) - Booking may have a quote

## Service Categories

### MVP Categories

| Category | Key Services |
|----------|--------------|
| Cleaning | House cleaning, deep cleaning, move-out cleaning, office cleaning |
| Handyman | General repairs, mounting/hanging, furniture assembly, minor fixes |

### Future Expansion (Provider Goes to Customer)

| Category | Key Services |
|----------|--------------|
| Plumbing | Leak repair, pipe installation, drain cleaning, fixture installation |
| Electrical | Wiring, outlet installation, fixture installation, troubleshooting |
| Moving | Local moves, hauling, packing services, furniture moving |
| Landscaping | Lawn care, gardening, tree trimming, outdoor maintenance |
| Painting | Interior painting, exterior painting, touch-ups |
| Appliance Repair | Washer/dryer, refrigerator, dishwasher, HVAC |
| Pest Control | Extermination, fumigation, rodent removal |
| Pet Services | Pet sitting, dog walking (at customer's home) |

### Future Expansion (Customer Goes to Provider)

| Category | Key Services |
|----------|--------------|
| Beauty/Salon | Haircuts, styling, coloring, barbering |
| Spa/Wellness | Massage, facials, body treatments |
| Nails | Manicure, pedicure, nail art |
| Fitness | Personal training, yoga, dance lessons |
| Tailoring | Alterations, custom clothing, repairs |
| Auto Services | Car wash, detailing, oil change |
| Electronics Repair | Phone repair, computer service |

## Booking Model

Servify uses a **hybrid booking model**:

### Instant Booking
- For standardized services with fixed pricing
- Customer selects time slot, provider confirms
- Example: Regular house cleaning, furniture assembly

### Quote-Based Booking
- For complex or custom jobs
- Customer describes the job with details/photos
- **MVP:** Single provider quote (customer requests from specific provider)
- **Future:** Multi-provider competitive quotes (broadcast to area providers)
- Customer accepts/rejects/negotiates the quote
- Example: Major repairs, custom installations, large moves

**MVP Quote Flow:**
1. Customer browses providers, selects one
2. Customer submits quote request with job details + photos
3. Provider reviews and submits quote (price, estimated time)
4. Customer accepts → Booking created
5. Customer rejects → Can request from another provider

### Service Location Types

| Type | Description | MVP Status |
|------|-------------|------------|
| `customer_location` | Provider travels to customer | **MVP Focus** |
| `provider_location` | Customer travels to provider | Future (schema ready) |
| `remote` | Virtual/online service | Future |

**MVP Implementation**: All services default to `customer_location`. Schema includes `locationType` field for future expansion to salon, workshop, and studio-based services.

### Booking Status Lifecycle

| Status | Description | Next States |
|--------|-------------|-------------|
| `pending` | Awaiting provider confirmation | `confirmed`, `cancelled` |
| `confirmed` | Provider accepted, scheduled | `in_progress`, `cancelled` |
| `in_progress` | Service being performed | `completed`, `cancelled` |
| `completed` | Service finished successfully | - |
| `cancelled` | Cancelled by customer or provider | - |

**Status Flow:**
```
pending → confirmed → in_progress → completed
   ↓          ↓            ↓
cancelled  cancelled   cancelled
```

## MVP Scope

### Phase 1 - Core Features

1. **Authentication**
   - Email/password signup and login (Better Auth)
   - Social login (Google, Apple)
   - Role-based access (customer, provider, agency admin)

2. **Provider Onboarding**
   - Profile creation with bio, photo, experience
   - Service selection and pricing
   - Service area configuration (city/region selection)
   - Document upload (ID, certifications, licenses)
   - Manual admin verification (unverified providers cannot receive bookings)

3. **Agency Management**
   - Agency profile creation
   - Invite/manage team providers
   - View team availability

4. **Service Discovery**
   - Browse services by category
   - Search with filters (location, price, rating, availability)
   - Provider profiles with service details
   - Discovery feed of available providers

5. **Availability Management**
   - Weekly recurring schedules
   - Specific date/time slot management
   - Block-off dates for unavailability
   - Calendar view

6. **Booking Flow**
   - Instant booking for standard services
   - Quote request for complex jobs
   - Booking confirmation and status updates

7. **Notifications**
   - Push notifications (mobile via Expo)
   - Email notifications for critical events (booking confirmed, quote received)
   - In-app notification center

### Deferred Features (Post-MVP)

- Payment processing and transactions
- Reviews and ratings system
- In-app messaging between customers and providers
- Dispute resolution
- Analytics dashboard
- Subscription/membership plans
- Referral program
- **Multi-Provider Quotes** - Broadcast quote requests to multiple providers, customer compares and selects
- **AI Assistant Chat** - Conversational interface to help customers discover and book services
- **Automated Verification** - OneID integration, INN registry API, automated document verification

## Provider Verification

### MVP Approach (Manual Review)

| Status | Description | Can Receive Bookings? |
|--------|-------------|----------------------|
| `unverified` | Just signed up, no documents | No |
| `pending` | Documents uploaded, awaiting review | No |
| `verified` | Admin approved | Yes |
| `rejected` | Admin rejected, needs resubmission | No |
| `suspended` | Temporarily disabled | No |

**MVP Flow:**
1. Provider signs up → status: `unverified`
2. Provider uploads required documents (ID, licenses)
3. Status changes to `pending`
4. Admin reviews documents in admin panel
5. Admin approves → status: `verified`, provider appears in search
6. Admin rejects → status: `rejected`, provider notified to resubmit

**Required Documents (MVP):**
- Government-issued ID (passport or ID card)
- Self-employment certificate or business registration
- Professional license (for regulated services like electrical, plumbing)

### Future Verification (Post-MVP)

| Integration | Purpose |
|-------------|---------|
| **OneID** | Uzbekistan national digital identity verification |
| **INN/STIR Registry** | Verify tax registration status |
| **OCR + AI** | Automated document validation |
| **Third-party KYC** | Sumsub, Shufti Pro for identity verification |
| **Background checks** | Criminal record verification (if available) |

### AI Assistant (Post-MVP)

An AI-powered chat interface that helps customers find and book services conversationally.

**How it works:**
- Uses existing tRPC procedures as AI function calls
- Leverages Google AI SDK (already integrated)
- Generates contextual UI components based on conversation

**Example flow:**
```
Customer: "I need someone to fix a leaky faucet in Yunusabad"
AI: [Calls search.findProviders({ category: "plumbing", region: "yunusabad" })]
AI: "I found 3 plumbers available in Yunusabad. Here are your options:"
    [Renders ProviderCard components]
Customer: "Book the first one for tomorrow morning"
AI: [Calls availability.getSlots({ providerId, date })]
AI: "They have slots at 9am, 10am, and 11am. Which works for you?"
```

**AI Function Mapping:**
| User Intent | tRPC Procedure |
|-------------|----------------|
| Find services | `search.findProviders()` |
| View provider details | `providers.getById()` |
| Check availability | `availability.getSlots()` |
| Create booking | `bookings.create()` |
| Request quote | `quotes.request()` |
| View my bookings | `bookings.listMine()` |

### Future UX Ideas (Good to Have)

Location and discovery enhancements to explore post-MVP:

| Feature | Description |
|---------|-------------|
| Expand service area prompt | Suggest providers add nearby districts when they get requests from areas they don't serve |
| Heat map for providers | Show where demand is high but provider supply is low |
| Travel time estimates | Calculate real road distance/time, not straight-line distance |
| "Currently nearby" badge | Show if provider is currently working in customer's area (live location opt-in) |
| Address verification | Confirm map pin matches the entered street address |
| Provider distance indicator | Show customer how far provider will travel ("Provider is ~5km away") |
| Smart suggestions | "Providers who serve your area also serve these nearby areas" |
| Coverage visualization | Map view showing provider's full service area coverage |
| Popular times | Show busy/available times based on historical booking data |
| Preferred providers | Let customers save favorite providers for quick rebooking |

## Geographic Scope

- **Launch Market**: Uzbekistan (initial)
- **Launch Strategy**: Multi-city from start
- **Database**: PostgreSQL with PostGIS extension for spatial queries
- **Region Model**: Hierarchical (Country → City → District) with polygon boundaries
- **Provider Service Areas**: Select districts they serve from pre-defined list
- **Customer Addresses**: Multiple saved addresses per customer with coordinates
- **Matching**: ST_Contains query to find providers serving customer's location

### Region Hierarchy (Uzbekistan)

```
Country: Uzbekistan
├── City: Tashkent
│   ├── District: Mirzo Ulugbek
│   ├── District: Yunusabad
│   ├── District: Chilanzar
│   ├── District: Sergeli
│   └── ... (11 districts total)
├── City: Samarkand
│   └── Districts...
├── City: Bukhara
│   └── Districts...
└── ... (other cities)
```

### Location Matching Flow

1. Customer saves address with coordinates (map pin or autocomplete)
2. Address is associated with a district (Region)
3. When booking, system finds providers whose service areas include that district
4. Results show providers available in customer's location

## Currency Support

- **Initial Currencies**: UZS (Uzbek Som), USD
- **Model**: Provider selects currency per service
- **Storage**: DECIMAL type for precision (not floats)
- **Future**: Extensible for other countries/currencies

| Currency | Code | Symbol | Decimal Places |
|----------|------|--------|----------------|
| Uzbek Som | UZS | soʻm | 0 (whole numbers) |
| US Dollar | USD | $ | 2 |

## Infrastructure Decisions

| Component | Choice | Notes |
|-----------|--------|-------|
| **i18n** | Lingui | MVP includes internationalization |
| **File Storage** | AWS S3 | Provider photos, documents, certificates |
| **Admin Panel** | Custom (shadcn) | Verification, user management |
| **Emails** | Resend | Transactional emails for notifications |
| **Push Notifications** | Expo Push | Mobile push via Expo notification service |
| **Deployment** | Docker | Hosting provider decided later |
| **Error Tracking** | PostHog (later) | Add post-MVP |

### Supported Languages (MVP)

| Language | Code | Priority |
|----------|------|----------|
| English | en | Primary (development language) |
| Uzbek | uz | Launch market |
| Russian | ru | Common in Uzbekistan |

## Technical Architecture

### Database Schema Organization

```
packages/db/src/schema/
├── auth.ts              # Better Auth tables (existing)
├── users.ts             # Extended user profiles
├── providers.ts         # Provider profiles and verification
├── agencies.ts          # Agency entities and team management
├── services.ts          # Categories and services with pricing
├── availability.ts      # Calendar and scheduling
├── bookings.ts          # Booking requests and status
├── quotes.ts            # Quote submissions
├── regions.ts           # Geographic regions with PostGIS polygons
├── provider-service-areas.ts  # Provider-to-region coverage mapping
├── customer-addresses.ts      # Customer saved addresses with coordinates
├── notifications.ts     # In-app notifications and push tokens
└── index.ts             # Export all schemas
```

### API Router Organization

```
packages/api/src/routers/
├── index.ts         # Main router export
├── auth.ts          # Authentication endpoints
├── users.ts         # User profile management
├── providers.ts     # Provider CRUD and search
├── agencies.ts      # Agency management
├── services.ts      # Service catalog
├── availability.ts  # Schedule management
├── bookings.ts      # Booking flow
├── quotes.ts        # Quote management
└── search.ts        # Discovery and search
```

### Web App Routes

```
apps/web/src/routes/
├── index.tsx           # Landing/home page
├── login.tsx           # Auth (existing)
├── dashboard.tsx       # User dashboard
├── search.tsx          # Service search and discovery
├── providers/
│   ├── index.tsx       # Provider listing
│   └── $providerId.tsx # Provider profile
├── services/
│   ├── index.tsx       # Service categories
│   └── $categoryId.tsx # Category listings
├── bookings/
│   ├── index.tsx       # User's bookings
│   ├── new.tsx         # Create booking
│   └── $bookingId.tsx  # Booking details
├── provider-portal/
│   ├── index.tsx       # Provider dashboard
│   ├── profile.tsx     # Edit provider profile
│   ├── services.tsx    # Manage offerings
│   ├── availability.tsx # Calendar management
│   └── bookings.tsx    # Incoming bookings
└── agency-portal/
    ├── index.tsx       # Agency dashboard
    ├── team.tsx        # Team management
    └── settings.tsx    # Agency settings
```

## Development Conventions

### Naming Conventions

| Concept | Term to Use | NOT |
|---------|-------------|-----|
| Service professional | Provider | Worker, Employee, Contractor |
| Service requester | Customer | Client, User, Consumer |
| Service request | Booking | Appointment, Order, Job |
| Provider group | Agency | Company, Firm, Business |
| Time slot | Availability | Slot, Schedule, Opening |

### Code Patterns

1. **Database**: Use Drizzle with explicit relations and proper indexes
2. **API**: tRPC routers with input validation via Zod
3. **Auth**: Always use Better Auth utilities, never custom auth logic
4. **Forms**: React Hook Form with Zod validation
5. **State**: TanStack Query for server state, minimal client state
6. **Routing**: TanStack Router with type-safe routes
7. **Date/Time**: Store all times in UTC, convert to local timezone only in UI

### Timezone Handling

- **Storage**: All timestamps stored in UTC in database
- **Provider availability**: Stored relative to provider's timezone
- **Booking times**: Stored in UTC, displayed in customer's local timezone
- **API responses**: Always return UTC, client converts to local
- **Libraries**: Use date-fns with date-fns-tz for timezone conversions
- **User preference**: Store user's timezone in profile for consistent display

### File Naming

- Schema files: `kebab-case.ts` (e.g., `service-offerings.ts`)
- Components: `kebab-case.tsx` (e.g., `provider-card.tsx`)
- Utilities: `kebab-case.ts` (e.g., `format-price.ts`)
- Routes: `kebab-case.tsx` matching URL structure

## Anti-Patterns to Avoid

1. **DO NOT** create custom authentication - use Better Auth exclusively
2. **DO NOT** store prices as floats - use DECIMAL for precision
3. **DO NOT** hardcode currencies - always store currency code with price
4. **DO NOT** hardcode locations - use the locations/service areas system
5. **DO NOT** mix booking types - keep instant and quote flows separate
6. **DO NOT** implement payments in MVP - defer to post-MVP
7. **DO NOT** add review/rating features in MVP - defer to post-MVP
8. **DO NOT** build custom calendar - use proper date-fns/temporal utilities

