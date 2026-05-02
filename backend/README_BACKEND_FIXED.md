# Smart Event Backend Fixed

## Run
1. Start MongoDB locally.
2. Create `.env` or keep existing:
   ```env
   MONGO_URI=mongodb://localhost:27017/eventDB
   JWT_SECRET=smart_event_secret_key
   PORT=5000
   ```
3. Install dependencies if needed:
   ```bash
   npm install
   ```
4. Start backend:
   ```bash
   npm start
   ```

## Main APIs
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/venues`
- `POST /api/venues`
- `POST /api/bookings`
- `GET /api/bookings`
- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`

## Booking request example
```json
{
  "venueName": "Royal Palace Hall",
  "customerName": "Test User",
  "customerEmail": "test@example.com",
  "date": "2026-05-01",
  "payment": "upi"
}
```

When a booking is created, the backend automatically creates an admin notification in MongoDB. Admin can see it using `GET /api/notifications`.
