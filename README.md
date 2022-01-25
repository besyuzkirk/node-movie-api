#API => https://quiet-ravine-74580.herokuapp.com/
# Movies
 
| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /api/movie/list | `GET` | Empty | List all movies. |
| /api/movie/add | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990, director:"id", imdb_score: 9.7 } | Create a new movie. |
| /api/movie/get/:movie_id | `GET` | Empty | Get a movie. |
| /api/movie/update/:movie_id | `PUT` | {'name':'foo', 'surname':'bar'} | Update a movie with new info. |
| /api/movie/delete/:movie_id | `DELETE` | Empty | Delete a movie. |
| /api/movie/list/top10 | `GET` | Empty | Get the top 10 movies. |
| /api/movie/get/between/:start_year/:end_year | `GET` | Empty | Movies between two dates. |
 
# Directors
 
| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /api/directors/list | `GET` | Empty | List all directors. |
| /api/directors/add | `POST` | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Create a new director. |
| /api/directors/get/:director_id | `GET` | Empty | Get a director. |
| /api/directors/update/:director_id | `PUT` | {'name':'foo', 'surname':'bar', 'bio': 'lorem'} | Update a director with new info. |
| /api/directors/delete/:director_id | `DELETE` | Empty | Delete a director. |
 
# Index
 
| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /register | `POST` | { username: 'foo', password:'1234' } | Create a new user. |
| /authenticate | `POST` | { username: 'foo', password:'1234' } | Generate a token. |

