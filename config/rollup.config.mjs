import replace from '@rollup/plugin-replace';

const RELEASE = Object.freeze({
	USES_ALTERNATIVE_METADATA: 'uses-alternative-metadata',
	STANDARD: 'standard'
});

const release = process.env.ROLLUP_BUILD_RELEASE;
const outputDir = `dist/${release}`;

if (!Object.values(RELEASE).some((value) => release === value)) {
	throw new Error(`Unknown release '${release}'`);
}

/** @type {import('rollup').RollupOptions} */
export default {
	input: 'YoutubeScript.js',
	output: {
		dir: outputDir
	},
	plugins: [
		replace({
			preventAssignment: true,
			values: {
				'SET_ALTERNATIVE_METADATA': String(release === RELEASE.USES_ALTERNATIVE_METADATA)
			}
		})
	]
};
