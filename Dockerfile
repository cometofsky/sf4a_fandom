FROM nginx:alpine

# Copy static assets to the standard nginx HTML directory
COPY . /usr/share/nginx/html/

# Clean up Git and documentation files from the image to reduce size
RUN rm -rf /usr/share/nginx/html/.git \
           /usr/share/nginx/html/.gitignore \
           /usr/share/nginx/html/deploy.sh \
           /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/docker-compose.yml
