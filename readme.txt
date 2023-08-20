hello there

// APIs we will need for our application

1. GET /user/:id -> returns user detail -- implemented
2. GET /user/friends -> return user friend list -- implemented
3. POST /user/post -> save your message/post in db -- implemented
4. GET /user/timeline -> return all the friends posts -- implemented
5. GET /user/posts -> return all the posts that you have posted in app -- implemented
6. POST /post/:id/like -> save the like (increment the count) of a post in db -- implemented
7. POST /post/:id/dislike -> save the dislike counter of a post -- implemented
8. POST /auth/signUp -> save the user in db -- implemented
9. GET /auth/signIn -> create a token and save it in db, return the token --implemented
10.POST /auth/signout -> delete the token from the database -- implemented
11.POST /friend/sendrequest -> send friend request to userid -- implemented
12.GET /friend/friendRequest -> fetching all the friend request that a user recieved -- implemented
13.POST /friend/acceptRequest/:userId -> accept friend request from userId -- implemented
14.GET /user/all -> fetches all the users

MongoDB -> JWT for auth


// Cookies, localstorage, sessionstorage

//task
1. create a API to unfriend the user
2. Create a component called get all my friend request and able to accept the request.
