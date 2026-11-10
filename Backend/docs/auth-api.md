# PawCare authentication API

Base URL: `http://localhost:5000`

All responses are JSON. Errors use `{ "success": false, "message": "..." }`; validation errors also include an `errors` array. The browser/Postman cookie jar stores the JWT cookie after login. Send subsequent requests to the same host so the cookie is included.

## Pre-approve staff IDs

Staff registration only accepts an ID already in the `approvedstaffids` MongoDB collection. Add approved IDs through MongoDB Compass or the Atlas UI; there is intentionally no public API to add them. For example, insert:

```json
{
  "staffId": "PAW-STAFF-010",
  "active": true,
  "claimedBy": null
}
```

An approved ID can be claimed once. Registration claims it in the same transaction that creates the staff account.

## Register

`POST /api/auth/register`

```json
{
  "fullName": "Alex Paw",
  "email": "alex@example.com",
  "password": "example-password",
  "confirmPassword": "example-password",
  "roles": ["adopter", "funder"],
  "profiles": {
    "adopter": { "address": "10 Garden Road" },
    "funder": {
      "funderType": "organization",
      "organizationName": "PawCare Friends",
      "phone": "+1 555 0100"
    }
  }
}
```

Role profile fields:

- `adopter`: `address` (required)
- `volunteer`: `address` (required)
- `funder`: `funderType` (`individual` or `organization`), `organizationName` required for organizations, optional `phone`
- `staff`: `staffId` (required and must be pre-approved)

Registration returns `201` and a safe user profile. It does not authenticate the new account; call the login endpoint next.

## Login

`POST /api/auth/login`

Email works for all roles; staff IDs work for staff accounts.

```json
{
  "identifier": "alex@example.com",
  "password": "example-password"
}
```

The response includes a safe profile and sets the `pawcare_token` HTTP-only cookie. The token is not included in the JSON response.

## Current user

`GET /api/auth/me`

Requires the cookie set by login. Returns the authenticated user’s ID, name, email, roles, and selected role profiles.

## Logout

`POST /api/auth/logout`

Clears the authentication cookie and returns a success response.
