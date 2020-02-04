# Palette Picker
The app allows you to pick color palettes and save them to a relational database.

# API ENDPOINTS - DOCUMENTATION

| Api Paths             | Request       | Response                                         |
| --------------------  |:-------------:| ------------------------------------------------:|
| '/api/v1/projects'    | **GET**       |   **An array of all projects**. Ex:```[{"id": 3,"name": "Weather App","created_at": "2020-02-03T23:20:42.289Z","updated_at": "2020-02-03T23:20:42.289Z"},{"id": 4,"name": "Birthday Party","created_at": "2020-02-03T23:20:42.291Z","updated_at": "2020-02-03T23:20:42.291Z"}]```|
| '/api/v1/palettes' | **GET**         |  **An array of all palletes**.  Ex:```[{"id": 1,"name": "Warm Weather","color1": "#DAF7A6","color2": "#FFC300","color3": "#FF5733","color4": "#C70039","color5": "#581845","project_id": 1,"created_at": "2020-02-04T20:09:45.231Z","updated_at": "2020-02-04T20:09:45.231Z"},{"id": 2,"name": "Cold Weather","color1": "#DAF7A5","color2": "#FFC301","color3": "#FF5732","color4": "#C70038","color5": "#581844","project_id": 1,"created_at": "2020-02-04T20:09:45.232Z","updated_at": "2020-02-04T20:09:45.232Z"}]```|
| '/api/v1/palettes/:id'  | **GET**        |   **An object of a specific palette** Ex:```{"id": 1,"name": "Warm Weather","color1": "#DAF7A6","color2": "#FFC300","color3": "#FF5733","color4": "#C70039","color5": "#581845","project_id": 1,"created_at": "2020-02-04T20:09:45.231Z","updated_at": "2020-02-04T20:09:45.231Z"}```|
| '/api/v1/projects/:id'| **GET**      | **An object of a specific project** Ex:```{"id": 3,"name": "Weather App","created_at": "2020-02-03T23:20:42.289Z","updated_at": "2020-02-03T23:20:42.289Z"}```|
| '/api/v1/projects'     | **POST**       | **Create a new project object in the db name is required and only field** Ex: ```{"name": "colortest"}```|
| 'api/v1/pallets'          | **POST** * All Fields in Example are required, creates a new palette object in the db and links it to a project | Ex:* ```{"name": "colortest","project_id": 1,"color1": "test1","color2": "test1","color3": "test1","color4": "test1","color5": "test1"}```|
| '/api/v1/projects/:id'         | **PUT**  *Name is required Ex:* ```{"name":"colortest2"}```| **return value ** Ex:```"result": "Project was updated!"```|
| '/api/v1/palletes/:id'         | **PUT**  *All is required Ex:* ```{"name":"colortest" ,"project_id": 1, "color1": "test2", "color2": "test1", "color3": "test1", "color4": "test1", "color5": "test1"}```| **return value ** Ex:```"result": "palettes was updated!"```|
| 'api/v1/projects/:id       | **DELETE**      | **A text response** Ex: 'Project has been deleted'|
| 'api/v1/palettes/:id      | **DELETE**      | **A test response** Ex: 'Palette has been deleted' |


## Overview

 The server was built using Node.js with an Express framework, and a PostgreSQL relational database. Knex library is used to permit for querying SQL-like syntax in javascript and to assist with modeling, migrations, and seeding test data.

[Sprint Board (GithubProjects)](https://trello.com/b/6KvIZAdy/colors)
