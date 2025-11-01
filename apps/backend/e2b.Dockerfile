FROM e2bdev/code-interpreter:latest

WORKDIR /home/user

# Clone your pre-configured Expo project
RUN git clone https://github.com/sagardxd/expo-template.git . && \
    rm -rf .git

# Install dependencies
RUN npm install

# Install @expo/ngrok globally
RUN npm install -g @expo/ngrok

EXPOSE 8081 19000 19001 19002 19006

CMD ["tail", "-f", "/dev/null"]