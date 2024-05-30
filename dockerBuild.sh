docker build -t bff-users . -f ./backend/bff-users/Dockerfile
docker build -t health-checker . -f ./backend/health-checker/Dockerfile
docker build -t ms-users . -f ./backend/ms-users/Dockerfile
docker build -t ms-organisations . -f ./backend/ms-organisations/Dockerfile
docker-compose up -d