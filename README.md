# Product Browser Backend

A backend service for browsing approximately 200,000 products with category filtering and efficient pagination.

## Tech Stack

* Node.js
* Express
* MongoDB Atlas
* Mongoose

## Features

* Browse products sorted by newest first
* Filter products by category
* Cursor-based pagination
* Snapshot-based consistency during browsing
* Seed script to generate 200,000 products
* Indexed queries for efficient performance

## API Endpoint

### Get Products

```http
GET /api/products
```

### Query Parameters

| Parameter       | Description                                        |
| --------------- | -------------------------------------------------- |
| limit           | Number of products to return (default: 20)         |
| category        | Filter by category                                 |
| snapshotTime    | Snapshot timestamp returned from the first request |
| cursorUpdatedAt | Cursor timestamp from previous page                |
| cursorId        | Cursor ID from previous page                       |

### Example

```http
GET /api/products?limit=20
```

```http
GET /api/products?category=Books&limit=20
```

```http
GET /api/products?snapshotTime=...&cursorUpdatedAt=...&cursorId=...
```

## Pagination Approach

Instead of offset pagination (`skip()`), this project uses cursor-based pagination.

Reasons:

* Better performance on large datasets
* Avoids large offset scans
* Scales more efficiently
* Prevents duplicate and missing records while data changes

The cursor is based on:

```js
(updatedAt, _id)
```

`_id` acts as a unique tie-breaker when multiple products share the same timestamp.

## Snapshot Consistency

When a user starts browsing, the backend generates a snapshot timestamp and returns it with the response.

All subsequent requests use the same snapshot timestamp:

```js
updatedAt <= snapshotTime
```

This ensures users browse a consistent view of the data even if products are inserted or updated during the session.

## Indexes

```js
{ updatedAt: -1, _id: -1 }
```

Used for:

* Sorting newest products first
* Cursor pagination

```js
{ category: 1, updatedAt: -1, _id: -1 }
```

Used for:

* Category filtering
* Sorting
* Cursor pagination

## Data Generation

The project includes a seed script that generates 200,000 products.

Generation strategy:

* Batch size: 5,000
* Bulk inserts using `insertMany()`
* Random categories
* Random prices
* Random timestamps

This is significantly faster than inserting records one at a time.

## Running Locally

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
MONGO_URI=<your_mongodb_connection_string>
PORT=5000
```

### Seed Database

```bash
npm run seed
```

### Start Server

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

## Future Improvements

* Request validation
* Better error handling
* Automated testing
* API documentation (Swagger/OpenAPI)
* Logging and monitoring
* Infinite scrolling frontend

## AI Usage

AI was used for discussing architecture options, pagination strategies, indexing approaches, and deployment guidance. All implementation details were reviewed, understood, and adapted during development.
