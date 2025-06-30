#!/bin/bash

# TypeScript type checking script
# This script runs TypeScript compiler in type-checking mode using a specialized config
# that excludes test files and focuses on production code

echo "🔍 Running TypeScript type checking..."

# Run TypeScript compiler with no-emit flag using lint-specific config
./node_modules/.bin/tsc --noEmit --project tsconfig.lint.json

# Capture the exit code
exit_code=$?

if [ $exit_code -eq 0 ]; then
    echo "✅ TypeScript type checking passed"
else
    echo "❌ TypeScript type checking failed with $exit_code error(s)"
fi

exit $exit_code