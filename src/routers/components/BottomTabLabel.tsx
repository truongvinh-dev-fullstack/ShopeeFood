import React from "react"
import { Text } from "react-native"
import { textStyles } from "../../themes/TextStyles"
import { appColors } from "../../constants/color"

type TabLaeblPropsType = {
	content: string
	focused?: boolean
}


export const BottomTabLabel: React.FC<TabLaeblPropsType> = React.memo(({ content, focused }) => {
	return (
		<Text
			allowFontScaling={false}
			style={{
				...textStyles.textNormalMedium,
				color: focused ? appColors.cam : appColors.xam,
				fontSize: 13
			}}>
			{content}
		</Text>
	)
})

