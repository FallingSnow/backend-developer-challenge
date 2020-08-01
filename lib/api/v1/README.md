# API v1 documentation
The documentation below is an incomplete list of endpoints, an example payload, and an example response.

### `GET` `/api/v1/ping`
Useful to verify connection to API server and latency.

###### Response: `application/json`
`time`: Time of the response
```json
{
  "time": "2020-08-01T03:20:09.121Z"
}
```

### `GET` `/api/v1/rental/:id`
Returns basic details on rental with a specific ID.

### `POST` `/api/v1/rental`
Creates a new rental.

###### Payload: `application/json`
```json
{
  "title": "This is a rental",
  ...
}
```

###### Response: `application/json`
```json
{
  "id": "8a63ea1e-d3a3-11ea-87d0-0242ac130003"
}
```

### `PATCH` `/api/v1/rental/:id`
Modifies an existing rental.

##### Payload: `application/json`
`id`: UUID of the rental you want to edit<br>
`title`: a short name for the rental
```json
{
  "title": "This is a rental",
  ...
}
```

###### Response: `application/json`
`id`: UUID of the rental modified
```json
{
  "id": "8a63ea1e-d3a3-11ea-87d0-0242ac130003",
  ...
}
```

### `GET` `/api/v1/rentals`
Provides a list of rentals.

### `GET` `/api/v1/user/token`
Retrieves a JWT token that can be used for authentication.

### `GET` `/static/**`
Returns static file data such as images.
