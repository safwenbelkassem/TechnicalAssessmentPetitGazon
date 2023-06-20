import { Dimensions, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const { height } = Dimensions.get('window')

const scale = SCREEN_WIDTH / 375

const normalize = (size: number) => {
  const newSize: number = size * scale
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export const isSmallScreen = () => height < 600

export default normalize
