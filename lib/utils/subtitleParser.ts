import axios from 'axios';
import VttToJson from 'vtt-to-json';

import {
	DestinationType,
	SrtParserSubtitleType,
	SubtitleType,
	VttToJsonSubtitleType,
} from '@src/libs/SubtitlePlayer/lib/types';

const { default: SrtParser } = require('srt-parser-2');

const subtitleParser = async (subitleUrl: string, translationUrl:string | undefined)
	: Promise<SubtitleType> => {
	const downloadSubtitleData = async (url:string | undefined) => {
		if (!url) { return []; }
		const { data } = await axios.get(url);
		return data;
	};
	const getSubtitleType = (url:string | undefined) => {
		if (!url) { return ''; }
		const split = url.split('.');
		return split[split.length - 1].substring(0, 3);
	};

	const subtitleData = await downloadSubtitleData(subitleUrl);
	const translationData = await downloadSubtitleData(translationUrl);

	const subtitleType = getSubtitleType(subitleUrl);
	const translationType = getSubtitleType(translationUrl);

	const result: SubtitleType = { subtitle: [], translation: [] };

	function SrtResultHandler(data:any, destination:DestinationType) {
		const parser: { fromSrt: (data: any) => SrtParserSubtitleType[] } = new SrtParser();

		const parsedSubtitle: SrtParserSubtitleType[] = parser.fromSrt(data);

		parsedSubtitle.forEach(({ startSeconds, endSeconds, text }) => {
			result[destination].push({
				start: startSeconds,
				end: endSeconds,
				part: text,
			});
		});
	}

	async function VttResultHandler(data:any, destination:DestinationType) {
		const parsedSubtitle: VttToJsonSubtitleType[] = await VttToJson(data);

		parsedSubtitle.forEach(({ start, end, part }) => {
			// For some reason this library adds the index of the subtitle at
			// the end of the part, so we cut it
			result[destination].push({
				start: start / 1000,
				end: end / 1000,
				part: part.slice(
					0,
					part.length
					- part.split(' ')[part.split(' ').length - 1].length,
				),
			});
		});
	}

	function getProperHandler(type:string) {
		if (type === 'srt') {
			return SrtResultHandler;
		}
		if (type === 'vtt') {
			return VttResultHandler;
		}
		return undefined;
	}

	async function run() {
		const SubtitleHandler = getProperHandler(subtitleType);
		const TranslationHandler = getProperHandler(translationType);
		if (SubtitleHandler) {
			SubtitleHandler(subtitleData, 'subtitle');
		}
		if (TranslationHandler) {
			TranslationHandler(translationData, 'translation');
		}
	}

	await run();

	return result;
};

export default subtitleParser;
