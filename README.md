# [React Native Video Subtitle](https://www.npmjs.com/package/react-native-video-subtitle)

Add subtitle and translation to any video given a current timestamp or by your own timer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

```sh
# Run with yarn
yarn add react-native-video-subtitle

# or Run with NPM
npm i react-native-video-subtitle
```

## Usage

```javascript
import SubtitlePlayer from 'react-native-video-subtitle'

const Example = () => {
  return (
    <SubtitlePlayer
      currentTime={currentTime}
      subtitle={{
         uri :'subtitle.srt',
         translationUri:'translation.srt'
      }}
    />
  )
}
```

### Props

| Prop                       | Description                                                                                                                                                   | Default  | required |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|---------|
| **`currentTime`**          | uses current time `in seconds` from react-native-video package or your `timer`                                                                                | _None_   | `true`  |
| **`subtitle`**             | An object with the file property containing the url. You can also add another properties to this object, like `translationUri` to append translation subtitle | _None_   | `true`  |
| **`style`**                | Set custom style for container                                                                                                                                | {}       | `false` |
| **`textStyle`**            | General style for `subtitleTextStyle` and `translationTextStyle`                                                                                              | {}       | `false` |
| **`subtitleTextStyle`**    | Custom style for subtitle text                                                                                                                                | {}       | `false` |
| **`translationTextStyle`** | Custom style for translation text                                                                                                                             | {}       | `false` |
| **`adjustsFontSizeToFit`** | Specifies the smallest possible scale a font can reach when adjustsFontSizeToFit is enabled                                                                   | `true`   | `false` |
| **`disableSubtitle`**      | To disable and hide subtitle text                                                                                                                             | `false`  | `false` |
| **`disableTranslation`**   | To disable and hide translation text                                                                                                                          | `false`  | `false` |
| **`position`**             | set `position` for subtitle container which can be `top` or `bottom`                                                                                          | `bottom` | `false` |

## License

This project is licenced under the [Learnova Team](https://learnova.app).
