module.exports = {
	preset: '@automattic/calypso-build',
	rootDir: __dirname,
	testRegex: 'codemod\\.spec\\.js$',
	setupFiles: [ '<rootDir>/setup-tests.js' ],
};
