#!/bin/bash

# Script to prepare the environment for learn-react-flow project

# Try to load nvm if it exists (but don't fail if it doesn't)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

# If nvm is available, use it, otherwise continue with current Node
if command -v nvm &> /dev/null; then
    nvm use
fi


npx husky
