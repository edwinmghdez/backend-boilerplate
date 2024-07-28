
# Backend Boilerplate

Backend Boilerplate made with:
- Node.js
- Express
- TypeScript


## Installation

Clone the repo:

```bash
  git clone https://github.com/edwinmghdez/backend-boilerplate
  cd backend-boilerplate
```

Install the dependencies:

```bash
  npm install
```

Set the environment variables:
```bash
  cp .env.example .env
  
  # open .env and modify the environment variables (if needed)
```
    
## Commands

Docker:
```bash
  # first time
  docker compose up --build

  # next time
  docker compose up

  # enter the workspace
  docker exec -it backend-boilerplate-app-1 /bin/bash
```

Database:
```bash
  # create new migration
  npm run migration:create Users

  # running all migrations
  npm run migration:run
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

