import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from "node:url";

const FUTO_YOUTUBE_SOURCE_ID = '35ae969a-a7db-11ed-afa1-0242ac120002';
const FORK_YOUTUBE_SOURCE_ID = '35ae969a-a7db-11ed-afa1-00000d346603';

const RELEASE = Object.freeze({
	STANDARD: 'standard',
	USES_ALTERNATIVE_METADATA: 'uses-alternative-metadata'
});

const release = process.env.SOURCE_RELEASE_TYPE;
const projectRootDir = path.resolve(fileURLToPath(new URL(import.meta.url)), '..');
const packageJson = JSON.parse(fs.readFileSync(path.resolve(projectRootDir, 'package.json'), 'utf-8'));
const packageVersion = packageJson.version.split('.', 3).map((n) => parseInt(n, 10));

export default {
	"name": "Youtube with DeArrow",
	"description": "One of the biggest video platforms owned by Google - now with DeArrow support",
	"author": "FUTO, netux",
	"authorUrl": "https://futo.org",
	"platformUrl": "https://youtube.com",
	"sourceUrl": `https://github.com/netux/grayjay-source-youtube/releases/latest/download/YoutubeConfig_${release}.json`,
	"repositoryUrl": "https://github.com/netux/grayjay-source-youtube/blob/with-dearrow",
	"scriptUrl": `./YoutubeScript_${release}.js`,
	"version": release === RELEASE.USES_ALTERNATIVE_METADATA
		? packageVersion[0]
		: packageVersion[0] * 100 + packageVersion[1], // 100 should be plenty of patches, right?
	"versionForkMinor": release === RELEASE.USES_ALTERNATIVE_METADATA
		? packageVersion[1]
		: undefined,
	"iconUrl": "https://raw.githubusercontent.com/netux/grayjay-source-youtube/with-dearrow/youtube_dearrow.png",
	"id": release === RELEASE.USES_ALTERNATIVE_METADATA
		? FUTO_YOUTUBE_SOURCE_ID
		: FORK_YOUTUBE_SOURCE_ID,

	"scriptSignature": "",
	"scriptPublicKey": "",
	"packages": ["Http", "Utilities", "DOMParser"],

	"subscriptionRateLimit": 140,

	"allowEval": false,
	"allowUrls": [
		"youtube.com",
		"m.youtube.com",
		"www.youtube.com",
		"youtu.be",
		"www.youtu.be",
		"m.youtu.be",
		"s.youtube.com",
		"consent.youtube.com",
		"suggestqueries-clients6.youtube.com",
		"youtubei.googleapis.com",
		"www.google.com",
		"google.com",
		"returnyoutubedislikeapi.com",
		"sponsor.ajay.app"
	],

	"settings": [
		{
			"variable": "authChannels",
			"name": "Use Login for Channels",
			"description": "Use authenticated client for channel (videos) requests. (eg. for member videos)",
			"type": "Boolean",
			"default": "false",
			"warningDialog": "Only enable this if you need it for channel membership content.\n\nTry disabling if you have issues when loading channels."
		},
		{
			"variable": "authDetails",
			"name": "Use Login for video details",
			"description": "Use authenticated client for video requests. (eg. for member videos)",
			"type": "Boolean",
			"default": "false",
			"warningDialog": "Only enable this if you need it for channel membership content.\n\nTry disabling if you have issues when loading videos and comments."
		},
		{
			"variable": "youtubeActivity",
			"name": "Provide Youtube Activity",
			"description": "Use authenticated client for playback, telling Youtube what you watched.",
			"type": "Boolean",
			"default": "false"
		},
		{
			"variable": "allowAgeRestricted",
			"name": "Allow Age Restricted",
			"description": "Allow watching of age restricted videos",
			"type": "Boolean",
			"default": "false"
		},
		{
			"variable": "allowControversialRestricted",
			"name": "Allow Controversial Restricted",
			"description": "Allow watching of controversial restricted videos",
			"type": "Boolean",
			"default": "false"
		},
		{
			"variable": "youtubeDislikerHeader",
			"name": "Return Youtube Dislike",
			"description": "This is a third-party database of video dislikes that combines historic data, crowd-sourced data, and estimations, and may not be accurate.\n\n(Using https://returnyoutubedislike.com)",
			"type": "Header"
		},
		{
			"variable": "youtubeDislikes",
			"name": "Enable",
			"description": "Use Return YoutubeDislike to provide dislikes for videos",
			"type": "Boolean",
			"default": "false"
		},
		{
			"variable": "sponsorBlockHeader",
			"name": "SponsorBlock",
			"description": "This is NOT Adblock. SponsorBlock allows you to (automatically) skip in-video sponsor segments.\nIt will harm creators.\n\n(Using https://sponsor.ajay.app)\n\nFUTO respects your decision to use SponsorBlock. But only if you're supporting creators in other ways.",
			"type": "Header"
		},
		{
			"variable": "sponsorBlock",
			"name": "Enable",
			"description": "If enabled support creators in other ways.\nDo not freeload.",
			"type": "Boolean",
			"default": "false",
			"warningDialog": "SponsorBlock will harm creators.\nDo not freeload, support creators in other ways."
		},
		{
			"variable": "sponsorBlockNoVotes",
			"name": "Allow No Vote Segments",
			"description": "Allow segments without votes, this may cause questionable video skips.",
			"type": "Boolean",
			"default": "false",
			"dependency": "sponsorBlock"
		},
		{
			"variable": "sponsorBlockType",
			"name": "Skip Type",
			"description": "Change skip behavior for SponsorBlock. Automatic may cause unexpected skipping for some users, and thus not recommended.",
			"type": "Dropdown",
			"default": "0",
			"dependency": "sponsorBlock",
			"options": ["Manual", "Automatic"]
		},
		{
			"variable": "sponsorBlockCat_Sponsor",
			"name": "Skip Sponsors",
			"description": "Skip segments labeled as sponsors",
			"type": "Boolean",
			"default": "true",
			"dependency": "sponsorBlock"
		},
		{
			"variable": "sponsorBlockCat_Intro",
			"name": "Skip Intros",
			"description": "Skip segments labeled as intros",
			"type": "Boolean",
			"default": "false",
			"dependency": "sponsorBlock"
		},
		{
			"variable": "sponsorBlockCat_Outro",
			"name": "Skip Outros",
			"description": "Skip segments labeled as outros",
			"type": "Boolean",
			"default": "false",
			"dependency": "sponsorBlock"
		},
		{
			"variable": "sponsorBlockCat_Self",
			"name": "Skip Self-Promos",
			"description": "Skip segments labeled as self-promos",
			"type": "Boolean",
			"default": "false",
			"dependency": "sponsorBlock"
		},
		{
			"variable": "sponsorBlockCat_Offtopic",
			"name": "Skip Music-Offtopic",
			"description": "Skip segments labeled as music-offtopic",
			"type": "Boolean",
			"default": "false",
			"dependency": "sponsorBlock"
		},
		{
			"variable": "sponsorBlockCat_Preview",
			"name": "Skip Preview",
			"description": "Skip segments labeled as previews",
			"type": "Boolean",
			"default": "false",
			"dependency": "sponsorBlock"
		},
		{
			"variable": "sponsorBlockCat_Interaction",
			"name": "Skip Interaction",
			"description": "Skip segments labeled as interactions",
			"type": "Boolean",
			"default": "false",
			"dependency": "sponsorBlock"
		},
		{
			"variable": "sponsorBlockCat_Filler",
			"name": "Skip Fillers",
			"description": "Skip segments labeled as fillers",
			"type": "Boolean",
			"default": "false",
			"dependency": "sponsorBlock"
		},
		{
			"variable": "deArrowHeader",
			"name": "DeArrow",
			"description": "DeArrow replaces video titles and thumbnails with better ones, which are more accurate and less prone to sensationalism (Using https://dearrow.ajay.app)\nNote: makes search very slow!",
			"type": "Header"
		},
		{
			"variable": "deArrowEnabledTitles",
			"name": "Enable on Titles",
			"description": "If enabled, replace titles with ones coming from DeArrow.",
			"type": "Boolean",
			"default": "true"
		},
		{
			"variable": "deArrowEnabledThumbnails",
			"name": "Enable on Thumbnails",
			"description": "If enabled, replace thumbnails with ones coming from DeArrow.",
			"type": "Boolean",
			"default": "true"
		}
	],

	"developerSubmitUrl": "https://dev.grayjay.app/api/Dev/Submit",

	"captcha": {
		"userAgent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.153 Mobile Safari/537.36",
		"captchaUrl": null,
		"cookiesToFind": ["GOOGLE_ABUSE_EXEMPTION"]
	},

	"authentication": {
		"userAgent": "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.230 Mobile Safari/537.36",
		"completionUrl": "https://m.youtube.com/youtubei/v1/guide?*",
		"loginUrl": "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252Fchannel_switcher&hl=en&ec=65620",
		"headersToFind": ["authorization"],
		"domainHeadersToFind": {
			".youtube.com": ["authorization"]
		},
		"cookiesToFind": ["SIDCC"],
		"cookiesExclOthers": false,
		"loginWarning": "You must select a profile after login for authentication to complete."
	},

	"supportedClaimTypes": [2],
	"primaryClaimFieldType": 1
};
