# ResumeOL

## Structures

```
╔══════════════════════╗           ╔═══════════╗ 
║      Components      ║-----------║   App.js  ║
╚══════════════════════╝           ╚═══════════╝       
           |                             |
           |                  ╔════════╗   ╔════════╗                             
           |                  ║ Navbar ║   ║ Router ║                             
           |                  ╚════════╝   ╚════════╝                             
           |                             |           
╔══════════════════════╗ ╔══════════════════════════╗ ╔═══════════════════════╗  
║    Resume Component  ║ ║ Authentication Component ║ ║     Info Component    ║  
╚══════════════════════╝ ╚══════════════════════════╝ ╚═══════════════════════╝
           |                          |                           |
╔══════════════════════╗ ╔══════════════════════════╗ ╔═══════════════════════╗  
║    Resume Actions    ║ ║  Authentication Actions  ║ ║      Info Actions     ║  
╚══════════════════════╝ ╚══════════════════════════╝ ╚═══════════════════════╝
           |\                         /\                         /|        
╔════════════════════════════════╗                          ╔═══════════╗ 
║   States Maintained by Redux   ║                          ║   axios   ║
╚════════════════════════════════╝                          ╚═══════════╝     
                                                                  |
                                                                  |
-------------------------------------------------------------------------------
                                                                  |
                                                                  |
                ╔══════════════════════╗  ╔═══════════╗           |  
                ║  Resume/Auth/Info    ║__║   Router  ║           | 
                ╚══════════════════════╝  ║   Express ║   \  ╔═══════════╗
                            |             ╚═══════════╝      ║ Server.js ║
                            |                                ╚═══════════╝
                            |                                     |
                    ╔═══════════════════╗      ╔══════════╗       |
                    ║ Schema by Mongoose║  --- ║ MongoDB  ║ ------| 
                    ╚═══════════════════╝      ╚══════════╝
```



# Frontend

Frontend is based on React, mainly divided for three components:

|1| Resume 

|2| Authentication

|3| Information/Post

All three are in client/src/component

The components routing is achieved by React-Router and global states are maintained by React-Redux.

The asynchronous actions are mainly achived by client/src/actions and client/src/reducers

How a request is sent from frontend to backend:
 
- Components call actions (Resume/Authentication/Information).
- Actions send HTTP requests to the server.
- The server sends back the response.
- Actions process responses and update states.
- Components update with updated states.


# Backend

Backend is implemted by Node.js/Express with Mongoose connecting MongoDB hosted on mLab as the DB.

All three routers are in routers/API

Schema are defined in models



How a request is handled by the backend

- Requests handled by express.Router() (Resume/Authentication/Information).
- Fetching data with Mongoose from the DB.
- Sending the reponse back to the frontend.
