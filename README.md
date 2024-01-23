  # Ticket-Support-System

Using this web application, user can create tickets, create support agents. Each ticket will be assinged to each support agent using round robin algorithm

## Tech Stack
- React Js
- NodeJS
- MongoDB

## functionality
- User can create new support agent from Create Support Agent page
- User can create new ticket from Create Support Ticket page
- All the tickets can be fetched by using get tickets button present in home page
- Tickets can also be filtered by status (new/assigned/resolved), severity (low/medium/hard), type, owner of ticket (AssignedTo field)
- Tickets also be sorted based on creation time and resolved time


##Setup
This project is deployed at vercel 
```
https://ticket-support-system-shvasa-assignment.vercel.app/
```

To set this up and run in localhost, clone this repo, download all dependencies.

Installing nodejs dependencies.

```
in server folder
npm install (to install node js dependencies)
```

Starting node.js server
```
node server.js
```

Installing React js Dependencies, get into client folder
```
cd support-ticket-system
npm install
```

Create .env file to add
```
url = "(own mongo db link)"
```

## Run
Starting client
```
npm start
```
Starting server
```
npm start
```


