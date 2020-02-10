# Palette Picker
The app allows you to pick color palettes and save them to a relational database.

### Deploy

This api endpoints is deployed to Heroku and available to access on `https://palette-pick-backend.herokuapp.com`

# DATA MODEL - DOCUMENTATION

A project stored on the server has an `id`, `name`, `created_at` and `updated_at`. Here is a sample race object:

```js
{
  "id": 33,
  "name": "Weather App",
  "created_at": "2020-02-08T05:22:11.569Z",
  "updated_at": "2020-02-08T05:22:11.569Z"
}
```

A palette stored on the server has an `id`, `name`, `color1`, `color2`, `color3`, `color4`, `color5`, `created_at` and `updated_at`. Here is a sample class object:

```js
{
  "id": 174,
  "name": "Sunset",
  "color1": "#da25e7",
  "color2": "#257a74",
  "color3": "#7c45d8",
  "color4": "#6d1a85",
  "color5": "#27780c",
  "project_id": 42,
  "created_at": "2020-02-08T06:46:20.885Z",
  "updated_at": "2020-02-08T06:46:20.885Z"
}
```

# API ENDPOINTS - DOCUMENTATION

| Api Paths             | Request       | Response                                         |
| --------------------  |:-------------:| ------------------------------------------------:|
| 'https://palette-pick-backend.herokuapp.com/api/v1/projects'    | **GET**       |   **An array of all projects**. Ex:```[{"id": 3,"name": "Weather App","created_at": "2020-02-03T23:20:42.289Z","updated_at": "2020-02-03T23:20:42.289Z"},{"id": 4,"name": "Birthday Party","created_at": "2020-02-03T23:20:42.291Z","updated_at": "2020-02-03T23:20:42.291Z"}]```|
| 'https://palette-pick-backend.herokuapp.com/api/v1/palettes' | **GET**         |  **An array of all palettes**.  Ex:```[{"id": 1,"name": "Warm Weather","color1": "#DAF7A6","color2": "#FFC300","color3": "#FF5733","color4": "#C70039","color5": "#581845","project_id": 1,"created_at": "2020-02-04T20:09:45.231Z","updated_at": "2020-02-04T20:09:45.231Z"},{"id": 2,"name": "Cold Weather","color1": "#DAF7A5","color2": "#FFC301","color3": "#FF5732","color4": "#C70038","color5": "#581844","project_id": 1,"created_at": "2020-02-04T20:09:45.232Z","updated_at": "2020-02-04T20:09:45.232Z"}]```|
| 'https://palette-pick-backend.herokuapp.com/api/v1/palettes/:id'  | **GET**        |   **An object of a specific palette** Ex:```{"id": 1,"name": "Warm Weather","color1": "#DAF7A6","color2": "#FFC300","color3": "#FF5733","color4": "#C70039","color5": "#581845","project_id": 1,"created_at": "2020-02-04T20:09:45.231Z","updated_at": "2020-02-04T20:09:45.231Z"}```|
| 'https://palette-pick-backend.herokuapp.com/api/v1/projects/:id'| **GET**      | **An object of a specific project** Ex:```{"id": 3,"name": "Weather App","created_at": "2020-02-03T23:20:42.289Z","updated_at": "2020-02-03T23:20:42.289Z"}```|
| 'https://palette-pick-backend.herokuapp.com/api/v1/projects/:id/palettes'| **GET**      | **An array with all palettes of a specific project** Ex:```[{"id": 1,"name": "Warm Weather","color1": "#DAF7A6","color2": "#FFC300","color3": "#FF5733","color4": "#C70039","color5": "#581845","project_id": 1,"created_at": "2020-02-04T20:09:45.231Z","updated_at": "2020-02-04T20:09:45.231Z"}]```|
| 'https://palette-pick-backend.herokuapp.com/api/v1/projects'     | **POST**       | **Create a new project object in the db name is required and only field** Ex: ```{"name": "colortest"}```|
| 'https://palette-pick-backend.herokuapp.com/api/v1/pallets'          | **POST** * All Fields in Example are required, creates a new palette object in the db and links it to a project | Ex:* ```{"name": "colortest","project_id": 1,"color1": "test1","color2": "test1","color3": "test1","color4": "test1","color5": "test1"}```|
| 'https://palette-pick-backend.herokuapp.com/api/v1/projects/:id'         | **PUT**  *Name is required Ex:* ```{"name":"colortest2"}```| **return value ** Ex:```"result": "Project was updated!"```|
| 'https://palette-pick-backend.herokuapp.com/api/v1/palettes/:id'         | **PUT**  *At least one of key is required Ex:* ```{"name":"colortest" ,"project_id": 1, "color1": "test2", "color2": "test1", "color3": "test1", "color4": "test1", "color5": "test1"}```| **return value ** Ex:```"result": "palettes was updated!"```|
| 'https://palette-pick-backend.herokuapp.com/api/v1/projects/:id       | **DELETE**      | **A text response** Ex: 'Project has been deleted'|
| 'https://palette-pick-backend.herokuapp.com/api/v1/palettes/:id      | **DELETE**      | **A test response** Ex: 'Palette has been deleted' |

### Searching

**Search project by name**

API address: `https://palette-pick-backend.herokuapp.com/api/v1/projects?name={name}`

API example: `https://palette-pick-backend.herokuapp.com/api/v1/projects?name=Weather`

**Search project by name**

API address: `https://palette-pick-backend.herokuapp.com/api/v1/palettes?color={name}`

API example: `https://palette-pick-backend.herokuapp.com/api/v1/palettes?color=45FF34`

### Status Codes & Error Handling

- `200`: GET request success
- `201`: POST request success
- `202`: PUT request success
- `203`: DELETE request success

- `404`: Not Found
- `422`: Unprocessable Entity

- `500`: Internal Server Error


## Overview

 The server was built using Node.js with an Express framework, and a PostgreSQL relational database. Knex library is used to permit for querying SQL-like syntax in javascript and to assist with modeling, migrations, and seeding test data.

[Sprint Board (GithubProjects)](https://trello.com/b/6KvIZAdy/colors)
