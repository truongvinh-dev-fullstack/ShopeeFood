import React from "react"
import ContentLoader,{ Rect, Circle, Path } from "react-content-loader/native"
import { appConfig } from "../../constants/AppConfig"

const CuaHangLoader = (props : any) => (
  <ContentLoader 
    speed={3}
    width={appConfig.width - 24}
    height={75}
    viewBox="0 0 400 75"
    backgroundColor="#faf4f4"
    foregroundColor="#dedede"
    {...props}
  >
    <Rect x="0" y="0" rx="0" ry="0" width="100" height="75" /> 
    <Rect x="112" y="0" rx="5" ry="5" width={appConfig.width - 136} height="20" /> 
    <Rect x="112" y="27" rx="5" ry="5" width={appConfig.width - 136} height="20" /> 
    <Rect x="112" y="55" rx="5" ry="5" width={appConfig.width - 136} height="20" />
  </ContentLoader>
)

export default CuaHangLoader

