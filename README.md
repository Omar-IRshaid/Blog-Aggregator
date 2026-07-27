# 🐊 Gator

A command-line RSS feed aggregator built with TypeScript and PostgreSQL. Gator lets you register users, subscribe to RSS feeds, aggregate posts in the background, and browse the latest articles — all from your terminal.

---

## Prerequisites

Make sure you have the following installed before getting started:

| Requirement | Version | Notes |
|---|---|---|
| **Node.js** | `22.15.0` | See `.nvmrc`. Use [nvm](https://github.com/nvm-sh/nvm) to manage versions. |
| **npm** | Comes with Node | Used to install dependencies |
| **PostgreSQL** | 14+ | Must be running locally or accessible via a connection URL |

### Install Node.js via nvm

```bash
nvm install
nvm use
```

### Install dependencies

```bash
npm install
```

---

## Database Setup

Gator uses [Drizzle ORM](https://orm.drizzle.team/) to manage the PostgreSQL schema.

**1. Create a PostgreSQL database** (if you haven't already):

```sql
CREATE DATABASE gator;
```

**2. Run all migrations** to set up the tables:

```bash
npm run migrate
```

> You only need to run this once (or after schema changes).

---

## Configuration

Gator reads its config from a JSON file located at `~/.gatorconfig.json` (your home directory).

Create the file and populate it with your database URL and an initial (empty) username:

```json
{
  "db_url": "postgres://username:password@localhost:5432/gator",
  "current_user_name": ""
}
```

Replace `username`, `password`, and `gator` with your actual PostgreSQL credentials and database name.

> **Note:** The `current_user_name` field is managed automatically by the `login` and `register` commands. You can leave it as an empty string initially.

---

## Running the CLI

All commands are run via:

```bash
npm run start <command> [arguments]
```

---

## Commands

### 👤 User Management

#### `register <username>`
Create a new user account and set them as the currently active user.

```bash
npm run start register alice
```

#### `login <username>`
Switch the active user to an existing account.

```bash
npm run start login alice
```

#### `users`
List all registered users. The currently active user is marked with `(current)`.

```bash
npm run start users
```

#### `reset`
⚠️ **Danger!** Deletes all users from the database.

```bash
npm run start reset
```

---

### 📡 Feed Management

#### `addfeed <name> <url>`
Add a new RSS feed and automatically follow it. Requires a logged-in user.

```bash
npm run start addfeed "The Primeagen" "https://theprimeagen.libsyn.com/rss"
npm run start addfeed "Lane's Blog" "https://www.wagslane.dev/index.xml"
```

#### `feeds`
List all available feeds along with their URLs and the user who added them.

```bash
npm run start feeds
```

#### `follow <url>`
Follow an existing feed by its URL. Requires a logged-in user.

```bash
npm run start follow "https://www.wagslane.dev/index.xml"
```

#### `following`
List all feeds the current user is following.

```bash
npm run start following
```

#### `unfollow <url>`
Unfollow a feed by its URL. Requires a logged-in user.

```bash
npm run start unfollow "https://www.wagslane.dev/index.xml"
```

---

### 🔄 Aggregation & Browsing

#### `agg <interval>`
Start the background feed aggregator. Gator will continuously fetch new posts at the given interval. Supports `ms`, `s`, `m`, and `h` units.

```bash
npm run start agg 30s    # fetch every 30 seconds
npm run start agg 5m     # fetch every 5 minutes
npm run start agg 1h     # fetch every 1 hour
```

Press `Ctrl+C` to stop the aggregator.

#### `browse [limit]`
Browse the latest posts from all feeds you follow. Optionally specify how many posts to show (defaults to `2`).

```bash
npm run start browse       # show 2 posts
npm run start browse 10    # show 10 posts
```

---

## Quick Start Example

```bash
# 1. Set up config at ~/.gatorconfig.json

# 2. Install dependencies and run migrations
npm install
npm run migrate

# 3. Register a user
npm run start register alice

# 4. Add some feeds
npm run start addfeed "wagslane" "https://www.wagslane.dev/index.xml"

# 5. Start the aggregator in one terminal
npm run start agg 1m

# 6. In another terminal, browse your posts
npm run start browse 5
```
