module.exports = {
	preset: 'jest-expo',
	setupFiles: ['./jest.setup.js'],

	testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],

	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

	collectCoverage: true,
	collectCoverageFrom: ['src/**/.tsx', '!src/**/*.(spec|test).tsx'],
	coverageReporters: ['lcov'],
};
