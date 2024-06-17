FROM node:18

# Set the working directory
WORKDIR .

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your app's source code
COPY . .　
