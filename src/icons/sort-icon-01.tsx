import React from "react";
import {StyleUtil} from "@D/utils/style/style-util";
import Icon from "@ant-design/icons/lib/components/Icon";

export const SortIcon01: React.FC<{ width: number, height: number, color: string }> = (props) => {

    const sortIcon = () => (
        <svg className="sort-icon-01" viewBox="0 0 1057 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width={`${StyleUtil.numberToPixels(props.width)}`} height={`${StyleUtil.numberToPixels(props.height)}`}>
            <path
                d="M798.833389 995.694309h0.432911V90.961171L640.454723 249.947577a26.282667 26.282667 0 0 1-37.330212 0 26.357593 26.357593 0 0 1 0-37.371837L807.033714 8.425106c9.923642-9.940293 27.398244-9.940293 37.330212 0l203.900878 204.150634a26.357593 26.357593 0 0 1 0 37.380162 26.266016 26.266016 0 0 1-18.765008 7.77574c-6.909919 0-13.595057-2.597463-18.773334-7.784065l-158.811577-158.994731V995.694309a26.540748 26.540748 0 1 1-53.081496 0zM452.94617 772.745366c10.140098 10.373203 10.140098 27.223415 0.216455 37.380162l-203.909203 204.150635a26.266016 26.266016 0 0 1-18.773334 7.775739c-6.909919 0-13.595057-2.580813-18.773333-7.775739L7.797552 810.125528a26.357593 26.357593 0 0 1 0-37.380162 26.282667 26.282667 0 0 1 37.330211 0l158.595122 159.011382V27.006959a26.540748 26.540748 0 1 1 53.081496 0V931.756748l158.811577-159.011382a26.282667 26.282667 0 0 1 37.330212 0z"
                fill={props.color}></path>
        </svg>
    )

    return <Icon component={sortIcon} {...props}/>
}