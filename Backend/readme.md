# User API Documentation

## Endpoints

1. **[POST] `/user/register`** - Register a new user.
2. **[POST] `/user/login`** - Login an existing user.

---

## 1. `/user/register`

### Method: `POST`

This endpoint is used to register a new user in the system.

---

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field                | Type   | Required | Description                                    |
| -------------------- | ------ | -------- | ---------------------------------------------- |
| `fullname`           | Object | Yes      | Contains the user's first and last name.       |
| `fullname.firstname` | String | Yes      | The first name of the user (min length: 3).    |
| `fullname.lastname`  | String | No       | The last name of the user (min length: 3).     |
| `email`              | String | Yes      | The email address of the user (must be valid). |
| `password`           | String | Yes      | The password for the user (min length: 6).     |

---

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

---

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

---

## 2. `/user/login`

### Method: `POST`

This endpoint is used to authenticate an existing user and return a JWT token.

---

### Request Body

The request body must be sent in JSON format and include the following fields:

| Field      | Type   | Required | Description                                    |
| ---------- | ------ | -------- | ---------------------------------------------- |
| `email`    | String | Yes      | The email address of the user (must be valid). |
| `password` | String | Yes      | The password for the user.                     |

---

### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

---

### Success Response

- **Status Code:** `200 OK`
- **Description:** User successfully authenticated.
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

---

### Error Responses

#### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Description:** Invalid email or password.
- **Response Body:**

```json
{
  "message": "invalid email or password"
}
```

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
      "msg": "password must be at least 3 character long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

---

## Notes

- Ensure the `Content-Type` header is set to `application/json` in the request.
- The `token` in the response is a JWT token that can be used for authentication in subsequent requests.
- Passwords are hashed before being stored in the database and are not returned in the response.

---

## Example cURL Request for Login

```bash
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}'
```