# Base image
FROM node:18

# Working directory
WORKDIR /usr/src/app

# Copy dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose app port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
