import fs from 'node:fs/promises';
import path from 'node:path';
import replace from '@rollup/plugin-replace';

const RELEASE = Object.freeze({
	USES_ALTERNATIVE_METADATA: 'uses-alternative-metadata',
	STANDARD: 'standard'
});

const release = process.env.SOURCE_RELEASE_TYPE;
const outputDir = `dist/${release}`;

if (!Object.values(RELEASE).some((value) => release === value)) {
	throw new Error(`Unknown release '${release}'`);
}

/**
 * @type {import('rollup').PluginImpl}
 * @param {Object} options
 * @param {string} options.srcTemplateFilePath
 * @param {string} options.jsonOutputFilePath
 */
function generateJSONFileFromTemplate(options) {
	return {
		name: 'generate-json-file-from-template',

		async buildEnd() {
			const contents = (await import(options.srcTemplateFilePath)).default;
			const contentsJson = JSON.stringify(contents, null, '\t');
			
			await fs.mkdir(path.dirname(options.jsonOutputFilePath), { recursive: true });
			await fs.writeFile(options.jsonOutputFilePath, contentsJson);
		}
	};
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
		}),
		generateJSONFileFromTemplate({
			srcTemplateFilePath: '../YoutubeConfig.template.js',
			jsonOutputFilePath: `${outputDir}/YoutubeConfig.json`
		})
	]
};
