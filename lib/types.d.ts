import { TextStyle, ViewStyle } from 'react-native';

export interface SubtitleDataType {
	start: number
	end: number
	part: string
}
export interface SubtitleType {
	subtitle:SubtitleDataType[],
	translation:SubtitleDataType[],
}

export interface SubtitlesProps {
	subtitle: {
		uri: string,
		translationUri?: string,
	}
	currentTime: number
	style?: ViewStyle
	textStyle?: TextStyle,
	subtitleTextStyle?: TextStyle,
	translationTextStyle?: TextStyle,
	adjustsFontSizeToFit?:boolean,
	disableSubtitle?:boolean,
	disableTranslation?:boolean,
	position?: 'bottom' | 'top',
}

export interface SrtParserSubtitleType {
	startSeconds: number
	endSeconds: number
	text: string
}

export interface VttToJsonSubtitleType {
	start: number
	end: number
	part: string
}
export type DestinationType = 'subtitle' | 'translation'
