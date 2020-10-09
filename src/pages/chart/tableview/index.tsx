import React, { Component } from 'react'
import { DatePicker } from 'antd';
import { Select } from 'antd';
import { autobind } from 'core-decorators';
import { ArtColumn, BaseTable } from 'ali-react-table';

const { Option } = Select;

function onDateChange(date: any, dateString: string) {
  console.log(date, dateString);
}

function onSelectChange(value: any) {
    console.log(`selected ${value}`);
}

@autobind
export default class Tableview extends Component {
    render() {
        return (
            <div>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select Area"
                optionFilterProp="children"
                onChange={onSelectChange}
            >
                <Option value="V10000">碧桂园</Option>
                <Option value="V10001">翰博三期</Option>
                <Option value="V10002">翰博二期</Option>
                <Option value="V10003">丽景</Option>
                <Option value="V10004">宏颐</Option>
                <Option value="V10005">龙腾</Option>
                <Option value="V10006">府梓</Option>
                <Option value="V10007">绿茵</Option>
                <Option value="V10008">人杰二期</Option>
                <Option value="V10009">碧桂园高层</Option>
                <Option value="V10010">碧桂园南区</Option>
                <Option value="V10011">碧桂园北区</Option>
                <Option value="V10012">碧桂园别墅区</Option>
                <Option value="V10013">明发</Option>
                <Option value="V10014">太湖一期</Option>
                <Option value="V10015">太湖二期</Option>
                <Option value="V10016">人杰一期</Option>
                <Option value="V10017">亚太换一期</Option>
                <Option value="V10018">亚太换二期</Option>
                <Option value="V10019">碧桂园西区</Option>
                <Option value="V10020">北苑</Option>
                <Option value="V10021">亚泰三期</Option>
                <Option value="V10022">翰博皇家御湾</Option>
                <Option value="V10023">太湖明珠</Option>
                <Option value="V10024">碧桂园东北区</Option>
                <Option value="V10025">博物馆</Option>
            </Select>
            <DatePicker onChange={onDateChange} />
          </div>
        )
    }
}
