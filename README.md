אריכטקטורה עם שילוב בין צד שרת לצד לקוח , ניהול האימות באמצעות cookie 

# Next.js Authentication Starter with Iron-Session

## Key Features

-   **Framework**: Next.js 15+ (App Router)
-   **Language**: TypeScript
-   **Authentication**: Secure, cookie-based sessions using `iron-session`.
-   **Authorization**: Role-based access control (e.g., `admin` vs. `user`).
-   **Form Handling**: Server Actions for handling login and logout.
-   **Database**: A simple `db.json` file acts as a mock user database.

## How It Works

1.  A user logs in via the `/login` page.
2.  A Server Action in `src/actions.ts` validates the credentials against the `db.json` file.
3.  Upon successful login, `iron-session` creates an encrypted, `httpOnly` session cookie.
4.  The `middleware.ts` file intercepts all requests to protected routes (`/profile`, `/admin`).
5.  It validates the session cookie and checks the user's role.
6.  Unauthorized or unauthenticated users are redirected to the login page or an error page.

## Getting Started



###  Set up your environment variables

Create a `.env` file in the root of the project and add a secret key.

```properties
# .env
SECRET_KEY=your_super_secret_key_that_is_at_least_32_characters_long
NODE_ENV=development
```

You can generate a secure key with this command:
```bash
# For PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}) -as [byte[]])
```



## Key Files

-   `src/actions.ts`: Contains the Server Actions for `login` and `logout`.
-   `src/lib.ts`: Configures `iron-session` and defines the session data structure.
-   `src/app/(admin|profile)/page.tsx`: Examples of protected pages.
-   `db.json`: A simple file-based database for users.

```
┌──────────────────────────────────┐
│   Browser (Client Components)    │
└───────────────┬──────────────────┘
                │ 1. Form Submission / Request with Cookie
                ▼
┌──────────────────────────────────┐
│          Next.js Server          │
│ ┌──────────────────────────────┐ │
│ │        Server Actions        │ │
│ └──────────────┬───────────────┘ │
│                │ Uses            │
│ ┌──────────────▼───────────────┐ │
│ │      iron-session Library    │ │
│ └──────────────────────────────┘ │
└───────────────┬──────────────────┘
                │ 2. Authenticate / Validate
                ▼
┌──────────────────────────────────┐
│     Database / Data Source       │
└───────────────┬──────────────────┘
                │ 3. Return User Data
                ▼
┌──────────────────────────────────┐
│          Next.js Server          │
└───────────────┬──────────────────┘
                │ 4. Set Encrypted HTTPOnly Cookie
                ▼
┌──────────────────────────────────┐
│   Browser (Client Components)    │
└──────────────────────────────────┘

```

```
                               ┌─────────────────┐
                               │    Database     │
                               │   (User Data)   │
                               └───────┬─────────┘
                                       │ 2. Authenticate
                                       │
┌─────────────────┐            ┌───────┴─────────┐
│ Browser/Client  │ 1. Request │  Server Actions │
│ (Login, Nav)    ├───────────>│ (login/getSession)│
└───────┬─────────┘<───────────┤                 │
        │           4. Render  └───────┬─────────┘
        │           Page/Redirect      │ 3. Create/Update Session
        │                              │
        │                      ┌───────▼─────────┐
        │                      │  iron-session   │
        │ 5. Store/Send        │(Encrypt/Decrypt)│
        │   Cookie             └───────┬─────────┘
        │                              │
┌───────▼─────────┐            ┌───────▼─────────┐
│ HTTPOnly Cookie │<───────────┤   Set Cookie    │
│ (In Browser)    │  6. Header │   Response      │
└─────────────────┘            └─────────────────┘
```

                             
