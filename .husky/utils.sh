#!/usr/bin/env bash

# Define colors for better visibility
YELLOW='\033[1;33m'
RED='\033[0;31m'
GREEN='\033[0;32m'
RESET='\033[0m'

# Function to setup Node.js environment
setup_node_environment() {
  echo -e "${GREEN}🔍 Checking for Node.js...${RESET}"

  # Check if node is available directly
  if command -v node >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Node.js found${RESET}"
    return 0
  fi

  # Try to find NVM and use it
  if [ -f "$HOME/.nvm/nvm.sh" ]; then
    echo -e "${YELLOW}⚠️  Attempting to activate Node.js via NVM...${RESET}"
    export NVM_DIR="$HOME/.nvm"
    . "$NVM_DIR/nvm.sh"
    nvm use > /dev/null 2>&1

    # Check if node is available after nvm activation
    if command -v node >/dev/null 2>&1; then
      echo -e "${GREEN}✓ Node.js activated via NVM${RESET}"
      return 0
    else
      echo -e "${RED}❌ Error: Node.js not found even after NVM activation${RESET}"
      return 1
    fi
  else
    echo -e "${RED}❌ Error: Node.js not found and NVM is not available${RESET}"
    return 1
  fi
}

# Function to setup project paths
setup_project_paths() {
  # Make sure node_modules/.bin is in the PATH
  export PATH="$(pwd)/node_modules/.bin:$PATH"
}

# Function to check if a command exists
check_command() {
  local cmd="$1"
  local error_msg="$2"

  if [ -f "./node_modules/.bin/$cmd" ]; then
    return 0
  else
    echo -e "${RED}❌ Error: $error_msg${RESET}"
    echo -e "${YELLOW}⚠️  Run npm install to install dependencies${RESET}"
    return 1
  fi
}

# Function to load config from separate Node.js script
load_config() {
  local config_type="$1"

  # Execute the separate Node.js script to load and parse config
  if [ -f "$(dirname "$0")/scripts/load-config.js" ]; then
    local config=$(node "$(dirname "$0")/scripts/load-config.js" "$config_type")
    echo "$config"
  else
    echo -e "${YELLOW}⚠️  Config script not found, using default settings${RESET}"
    # Default fallback config if script is not found
    if [ "$config_type" = "pre-push" ]; then
      echo "unit,e2e"
    fi
  fi
}
