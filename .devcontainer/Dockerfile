FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

RUN sudo apt-get update \
    && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && sudo apt-get install -y ./google-chrome-stable_current_amd64.deb \
    && sudo apt-get install -y firefox-esr \
    && sudo rm ./google-chrome-stable_current_amd64.deb \
    && sudo rm -rf /var/lib/apt/lists/*