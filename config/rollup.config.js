import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import replace from '@rollup/plugin-replace';

const RELEASE = Object.freeze({
	STANDARD: 'standard',
	USES_ALTERNATIVE_METADATA: 'uses-alternative-metadata'
});

const thisFileFolderPath = path.resolve(fileURLToPath(new URL(import.meta.url)), '..');
const releaseType = process.env.SOURCE_RELEASE_TYPE;
const outputDir = `dist/${releaseType}`;

if (!Object.values(RELEASE).some((value) => releaseType === value)) {
	throw new Error(`Unknown release '${releaseType}'`);
}

/**
 * @type {import('rollup').PluginImpl}
 * @param {Object} options
 * @param {string} options.srcTemplateFilePath
 * @param {string} options.jsonOutputFilePath
 */
function generateJSONFileFromTemplate(options) {
	const srcTemplateFilePath = path.resolve(thisFileFolderPath, options.srcTemplateFilePath);
	const jsonOutputFilePath = path.resolve(thisFileFolderPath, options.jsonOutputFilePath);

	return {
		name: 'generate-json-file-from-template',

		buildStart() {
			this.addWatchFile(srcTemplateFilePath);
		},

		async buildEnd() {
			const contents = (await import(pathToFileURL(srcTemplateFilePath).toString())).default;
			const contentsJson = JSON.stringify(contents, null, '\t');
			
			await fs.mkdir(path.dirname(jsonOutputFilePath), { recursive: true });
			await fs.writeFile(jsonOutputFilePath, contentsJson);
		}
	};
}

/** @type {import('rollup').RollupOptions} */
export default {
	input: 'YoutubeScript.js',
	output: {
		dir: outputDir,
		entryFileNames: `[name]_${releaseType}.js`
	},
	plugins: [
		replace({
			preventAssignment: true,
			values: {
				'SET_ALTERNATIVE_METADATA': String(releaseType === RELEASE.USES_ALTERNATIVE_METADATA)
			}
		}),
		generateJSONFileFromTemplate({
			srcTemplateFilePath: '../YoutubeConfig.template.js',
			jsonOutputFilePath: `${outputDir}/YoutubeConfig_${releaseType}.json`
		})
	]
};
