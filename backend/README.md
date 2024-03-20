## Instructions for local use

1. Run `npm install` in `/`.
2. Create a file in `/` named `.env`.
3. Inside `.env`, add the following lines:
    ```
    DB_URL=<the URL of your postgres database>
    ```
4. Run `npm run setup-db` to prepare the database.
5. Run `npm run backend-dev` to start the API.

## Routes


| Route | Method | Response | Body Input Parameters
| --- | --- | --- | --- |
| `/plants/all` | `GET` | Gets all the plants info | None
| `/plants/:id` | `GET` | Gets the plant info by the plant id| None
| `/plants/user/:user` | `GET` | Gets all the plants planted by a user | None
| `/plants/user/:user/:plant` | `POST` | Plants a plant with an ID specified in params for a user | None
| `/plants/:user/details` | `GET` | Returns all of the plants planted by user with all of their details, including their growth stage | None
| `plants/user/:plant` | `PATCH` | Takes in a planted plant unique id and increments its growth stage by 1  | None
| `/plants/user/:plant` | `DELETE` | Deletes a planted plant by its unique id | None
| --- | --- | --- | --- |
| `/account/register` | `POST` | Creates a new user. | username (str), email(str), password(str)
| `/account/login` | `POST` | Creates a new session. Can accept either username or email. | username(str) OR email (str) AND password (str)
| `/account/logout` | `DELETE` | Deletes the current session. Needs the Authorization : token header | None
