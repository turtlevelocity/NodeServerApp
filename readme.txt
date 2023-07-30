hello there

// APIs we will need for our application

1. GET /user/:id -> returns user detail
2. GET /user/:id/friends -> return user friend list
3. POST /user/post -> save your message/post in db
4. GET /user/timeline -> return all the friends posts
5. GET /post/ -> return all the posts that you have posted in app
6. POST /post/:id/like -> save the like (increment the count) of a post in db
7. POST /post/:id/dislike -> save the dislike counter of a post
8. POST /auth/signUp -> save the user in db
9. GET /auth/signIn -> create a token and save it in db, return the token
10.POST /auth/signout -> delete the token from the database
11.POST /friend/addFriendRequest/:userid -> send friend request to userid
12.GET /friend/friendRequest -> fetching all the friend request that a user recieved
13.POST /friend/acceptRequest/:userId -> accept friend request from userId
14.GET /user/all -> fetches all the users

MongoDB -> JWT for auth


// Cookies, localstorage, sessionstorage
