import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { SubtitleDataType, SubtitlesProps, SubtitleType } from './types';

import subtitleParser from './utils/subtitleParser';
import styles from './styles';

const SubtitlePlayer: React.FC<SubtitlesProps> = ({
	subtitle,
	currentTime,
	style = {},
	textStyle = {},
	subtitleTextStyle = {},
	translationTextStyle = {},
	adjustsFontSizeToFit = true,
	disableSubtitle = false,
	disableTranslation = false,
	position = 'bottom',
}): JSX.Element => {
	const [subtitles, setSubtitles] = useState<SubtitleType>({ subtitle: [], translation: [] });

	const parseSubtitle = useCallback(async (): Promise<void> => {
		const {
			subtitle: parsedSubtitle,
			translation: parsedTranslation,
		} = await subtitleParser(subtitle.uri, subtitle.translationUri);
		setSubtitles(s => ({ ...s, subtitle: parsedSubtitle, translation: parsedTranslation }));
	}, [subtitle.translationUri, subtitle.uri]);

	useEffect(() => {
		parseSubtitle();
	}, [parseSubtitle, subtitle]);

	const [text, setText] = useState({ subtitle: '', translation: '' });

	useEffect(() => {
		const getSubtitleCurrentText = (items:any) => {
			if (items) {
				let start = 0;
				let end: number = items.length - 1;

				while (start <= end) {
					const mid: number = Math.floor((start + end) / 2);

					const sub: SubtitleDataType = items[mid] || {
						start: 0,
						end: 0,
						part: '',
					};

					if (currentTime >= sub.start && currentTime <= sub.end) {
						return sub.part.trim();
					}
					if (currentTime < sub.start) {
						end = mid - 1;
					}
					else {
						start = mid + 1;
					}
				}
			}
			return '';
		};

		const subtitleText = getSubtitleCurrentText(subtitles.subtitle);
		const translationText = getSubtitleCurrentText(subtitles.translation);
		setText(s => (
			{ ...s, subtitle: subtitleText, translation: translationText }
		));
	}, [currentTime, subtitles]);

	if ((!text.subtitle && !text.translation) || (disableSubtitle && disableTranslation)) {
		return <View />;
	}

	return (
		<View style={[styles.baseContainer, styles[position === 'bottom' ? 'bottomContainerStyle' : 'topContainerStyle'], style]}>
			{(!disableSubtitle && text.subtitle) && (
				<Text
					adjustsFontSizeToFit={adjustsFontSizeToFit}
					style={[styles.baseText, textStyle, subtitleTextStyle]}
				>
					{text.subtitle}
				</Text>
			)}
			{(!disableTranslation && text.translation) && (
				<Text
					adjustsFontSizeToFit={adjustsFontSizeToFit}
					style={[styles.baseText, textStyle, translationTextStyle]}
				>
					{text.translation}
				</Text>
			)}
		</View>
	);
};

export default SubtitlePlayer;
