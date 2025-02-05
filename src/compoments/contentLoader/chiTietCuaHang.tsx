import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { appConfig } from "../../constants/AppConfig"

const ChiTietCuaHangLoader = (props: any) => (
  <ContentLoader 
    speed={0}
    width={appConfig.width}
    height={appConfig.height}
    viewBox={`0 0 ${appConfig.width} ${appConfig.height}`}
    backgroundColor="#faf4f4"
    foregroundColor="#dedede"
    {...props}
  >
    <Rect x="0" y="0" rx="0" ry="0" width={appConfig.width} height="102" /> 
    <Rect x="0" y="115" rx="0" ry="0" width={appConfig.width} height="20" /> 
    <Rect x="0" y="147" rx="0" ry="0" width={appConfig.width} height="20" /> 
    <Rect x="0" y="179" rx="0" ry="0" width={appConfig.width} height="20" /> 
    <Rect x="0" y="210" rx="0" ry="0" width="70" height="70" /> 
    <Rect x="80" y="210" rx="0" ry="0" width={appConfig.width - 80} height="70" /> 
    <Rect x="0" y="290" rx="0" ry="0" width="70" height="70" /> 
    <Rect x="80" y="290" rx="0" ry="0" width={appConfig.width - 80} height="70" /> 
    <Rect x="0" y="370" rx="0" ry="0" width="70" height="70" /> 
    <Rect x="0" y="450" rx="0" ry="0" width="70" height="70" /> 
    <Rect x="80" y="370" rx="0" ry="0" width={appConfig.width - 80} height="70" /> 
    <Rect x="80" y="450" rx="0" ry="0" width={appConfig.width - 80} height="70" />
    <Rect x="0" y="530" rx="0" ry="0" width="70" height="70" /> 
    <Rect x="80" y="530" rx="0" ry="0" width={appConfig.width - 80} height="70" /> 
    <Rect x="0" y="610" rx="0" ry="0" width="70" height="70" /> 
    <Rect x="80" y="610" rx="0" ry="0" width={appConfig.width - 80} height="70" /> 
    <Rect x="0" y="690" rx="0" ry="0" width="70" height="70" /> 
    <Rect x="80" y="690" rx="0" ry="0" width={appConfig.width - 80} height="70" />
    <Rect x="0" y="770" rx="0" ry="0" width="70" height="70" /> 
    <Rect x="80" y="770" rx="0" ry="0" width={appConfig.width - 80} height="70" />
  </ContentLoader>
)

export default ChiTietCuaHangLoader

