export default {
  // Configure which tests to run during git actions
  prePush: {
    runUnitTests: true,
    runE2ETests: true,
    // Set to false to temporarily disable tests on push while preserving the configuration
    enabled: true,
  },
};
