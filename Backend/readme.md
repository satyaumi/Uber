# User Registration API Documentation

## Endpoint: `/user/register`

### Method: `POST`

This endpoint is used to register a new user in the system.

---

## Request Body

The request body must be sent in JSON format and include the following fields:

| Field                | Type   | Required | Description                                    |
| -------------------- | ------ | -------- | ---------------------------------------------- |
| `fullname`           | Object | Yes      | Contains the user's first and last name.       |
| `fullname.firstname` | String | Yes      | The first name of the user (min length: 3).    |
| `fullname.lastname`  | String | No       | The last name of the user (min length: 3).     |
| `email`              | String | Yes      | The email address of the user (must be valid). |
| `password`           | String | Yes      | The password for the user (min length: 6).     |

### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

## Response

### Success Response

- **Status Code:** `201 Created`
- **Description:** User successfully registered.
- **Response Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64bdfc1234567890abcdef12",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Error Responses

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Description:** Validation failed for the input fields.
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "first name must be at least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "password must be 6 character long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

#### Missing Fields

- **Status Code:** `400 Bad Request`
- **Description:** Required fields are missing.
- **Response Body:**

```json
{
  "errors": [
    {
      "msg": "All fields are required"
    }
  ]
}
```

---

## Notes

- Ensure the `Content-Type` header is set to `application/json` in the request.
- The `token` in the response is a JWT token that can be used for authentication in subsequent requests.
- The password is hashed before being stored in the database and is not returned in the response.

---

## Example cURL Request

```bash
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}'
```
