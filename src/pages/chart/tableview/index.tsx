import React, { Component } from 'react'
import { DatePicker, Select, Row, Col, Button } from 'antd';
import { autobind } from 'core-decorators';
import { ArtColumn, BaseTable } from 'ali-react-table';
import axios from 'axios';

const { Option } = Select;

@autobind
export default class Tableview extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state= {
            tableName: null,
            columns: [],
            selectedDate: '',
            data: ''
        }
    }

    onDateChange(date: any, dateString: string): void {
        console.log(date, dateString);
        this.setState({
            selectedDate: dateString
        });
    }

    onSelectChange(value: string): void {
        console.log(`selected ${value}`);
        this.setState({
            tableName: value
        });
        switch (value) {
            case 'V10000':
            case 'V10001':
            case 'V10002':
            case 'V10003':
                this.setState({
                    columns : [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度', width: 100, align: 'right' },
                        { code: 'T3', name: '二网供水温度', width: 100, align: 'right' },
                        { code: 'T4', name: '二网回水温度', width: 100, align: 'right' },
                        { code: 'T5', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T5', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T6', name: '一网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T7', name: '二网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T8', name: '二网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T9', name: '一网瞬时流量/ m³/h', width: 100, align: 'right' },
                        { code: 'T10', name: '一网瞬时热量/ GJ/h', width: 100, align: 'right' },
                        { code: 'T11', name: '一网热量累计/GJ', width: 100, align: 'right' },
                        { code: 'T12', name: '补水瞬时流量/ m³/h', width: 100, align: 'right' },
                        { code: 'T13', name: '补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T14', name: '一网频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T15', name: '二网1号频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T16', name: '二网2号频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T17', name: '补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T18', name: '一网泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T19', name: '二网1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T20', name: '二网2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T21', name: '补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T22', name: '水箱水位高度/M', width: 100 },
                    ]
                });
                break;
            case 'V10004':
                this.setState({
                    columns : [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度', width: 100, align: 'right' },
                        { code: 'T3', name: '二网供水温度', width: 100, align: 'right' },
                        { code: 'T4', name: '二网回水温度', width: 100, align: 'right' },
                        { code: 'T5', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T5', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T6', name: '一网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T7', name: '二网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T8', name: '二网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T9', name: '一网瞬时流量/ m³/h', width: 100, align: 'right' },
                        { code: 'T10', name: '一网瞬时热量/ GJ/h', width: 100, align: 'right' },
                        { code: 'T11', name: '一网热量累计/GJ', width: 100, align: 'right' },
                        { code: 'T12', name: '补水瞬时流量/ m³/h', width: 100, align: 'right' },
                        { code: 'T13', name: '补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T14', name: '一网频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T15', name: '二网1号频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T16', name: '二网2号频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T17', name: '补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T18', name: '一网泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T19', name: '二网1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T20', name: '二网2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T21', name: '补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T22', name: '水箱水位高度/M', width: 100, align: 'right' },
                        { code: 'T23', name: '室外温度/℃', width: 100 }
                    ]
                });
                break;
        }
    }

    async onSearchClick() {
        if (!this.state.tableName || !this.state.selectedDate) {
            alert("请先选择区域和日期");
            return;
        };
        await axios({
            baseURL: `http://127.0.0.1:5000/dbo:tb=${this.state.tableName}`,
            method: 'get',
        }).then(response => {
            this.setState({
                data: response.data.recordsets[0]
            });
            console.log(this.state.data);
            return;
        }).catch( error => {
            if (error.response) {
                    console.error(Promise.reject(error.response.data));
                    return;
                }
            console.error(Promise.reject(error))
            return;
        });
    }
    
    render() {
        return (
            <>
            <Row>
                <Col span={6} />
                <Col span={3}>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select Area"
                        optionFilterProp="children"
                        onChange={this.onSelectChange}
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
                </Col>
                <Col span={2} />
                <Col span={3}>
                    <DatePicker onChange={this.onDateChange} />
                </Col>
                <Col span={2} />
                <Col span={2}>
                  <Button type="primary" onClick={this.onSearchClick}>Search Now</Button>
                </Col>
                <Col span={6} />
            </Row>
            <BaseTable dataSource={this.state.data} columns={this.state.columns}></BaseTable>
          </>
        )
    }
}
