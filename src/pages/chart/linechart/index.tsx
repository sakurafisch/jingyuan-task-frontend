import React, { Component } from 'react'
import { Select, Button, Row, Col, DatePicker} from 'antd';
import { autobind } from 'core-decorators';
import axios from 'axios';
import { Line, Scatter, Area } from '@ant-design/charts';

const { Option } = Select;
const tableName = ['V10000', 'V10001', 'V10002', 'V10003', 'V10004', 'V10005', 'V10006', 'V10007', 'V10008', , 'V10009', 'V100010', 'V100011', 'V10012', , 'V10012', , 'V10013', 'V10014', 'V10015', 'V10016', 'V10017', 'V10018', 'V10019', 'V10020', 'V10021', 'V10022', 'V10023', 'V10024', 'V10025'];
const area: any[] = ['公租房', '翰博三期', '翰博二期', '丽景', '宏颐', '龙腾', '府梓', '绿茵', '人杰二期', '碧桂园高层', '碧桂园南区', '碧桂园北区', '碧桂园别墅区', '明发', '太湖一期', '太湖二期', '人杰一期', '亚太换一期', '亚太换二期', '碧桂园西区', '北苑', '亚泰三期', '翰博皇家御湾', '太湖明珠', '碧桂园东北区', '博物馆']
let areaMapTable = new Map();
for (let i = 0; i < 26; ++i) {
    areaMapTable.set(area[i], tableName[i]);
}
const temperatureOfNet: any = {
    "公租房": ['一网供水温度', '一网回水温度', '二网供水温度', '二网回水温度'],
    "翰博三期": ['一网供水温度', '一网回水温度', '二网供水温度', '二网回水温度'],
    "翰博二期": ['一网供水温度', '一网回水温度', '二网供水温度', '二网回水温度'],
    "丽景": ['一网供水温度', '一网回水温度', '二网供水温度', '二网回水温度'],
    "宏颐": ['一网供水温度', '一网回水温度', '二网供水温度', '二网回水温度'],
    "龙腾": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "府梓": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "绿茵": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "人杰二期": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "碧桂园高层": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "碧桂园南区": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "碧桂园北区": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "碧桂园别墅区": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "明发": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "太湖一期": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "太湖二期": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "人杰一期": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "亚太换一期": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "亚太换二期": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "碧桂园西区": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "北苑": ['一网供水温度', '一网回水温度', '二网供水温度', '二网回水温度'],
    "亚泰三期": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "翰博皇家御湾": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "太湖明珠": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网中区供水温度', '二网中区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "碧桂园东北区": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
    "博物馆": ['一网供水温度', '一网回水温度', '二网低区供水温度', '二网低区回水温度', '二网高区供水温度', '二网高区回水温度'],
};
let temperatureMapColumn = new Map();
for (let i = 0; i < 26; ++i) {
    switch(i){
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 20:
            temperatureMapColumn.set(temperatureOfNet[area[i]][0], 'T1')
            temperatureMapColumn.set(temperatureOfNet[area[i]][1], 'T2')
            temperatureMapColumn.set(temperatureOfNet[area[i]][2], 'T3')
            temperatureMapColumn.set(temperatureOfNet[area[i]][3], 'T4')
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 24:
        case 25:
            temperatureMapColumn.set(temperatureOfNet[area[i]][0], 'T1')
            temperatureMapColumn.set(temperatureOfNet[area[i]][1], 'T2')
            temperatureMapColumn.set(temperatureOfNet[area[i]][2], 'T3')
            temperatureMapColumn.set(temperatureOfNet[area[i]][3], 'T4')
            temperatureMapColumn.set(temperatureOfNet[area[i]][4], 'T5')
            temperatureMapColumn.set(temperatureOfNet[area[i]][5], 'T6')
            break;
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 21:
        case 22:
        case 23:
            temperatureMapColumn.set(temperatureOfNet[area[i]][0], 'T1')
            temperatureMapColumn.set(temperatureOfNet[area[i]][1], 'T2')
            temperatureMapColumn.set(temperatureOfNet[area[i]][2], 'T3')
            temperatureMapColumn.set(temperatureOfNet[area[i]][3], 'T4')
            temperatureMapColumn.set(temperatureOfNet[area[i]][4], 'T5')
            temperatureMapColumn.set(temperatureOfNet[area[i]][5], 'T6')
            temperatureMapColumn.set(temperatureOfNet[area[i]][6], 'T7')
            temperatureMapColumn.set(temperatureOfNet[area[i]][7], 'T8')
            temperatureMapColumn.set(temperatureOfNet[area[i]][8], 'T9')
            break;
    }
}


@autobind
export default class Linechart extends Component<any, any> {

    state = {
        areaState: temperatureOfNet[area[0]],
        temperatureState: temperatureOfNet[area[0]][0],
        tableState: areaMapTable.get(area[0]),
        columnState: temperatureMapColumn.get(temperatureOfNet[area[0]][0]),
        dateState: '',
        responseDataState: [{}],
        barchartX: [{}],
    };

    
    handleAreaStateChange(value: any) {
        this.setState({
            areaState: temperatureOfNet[value],
            temperatureState: temperatureOfNet[value][0],
            tableState: areaMapTable.get(value),
            columnState: temperatureMapColumn.get(temperatureOfNet[value][0]),
            responseDataState: [{}]
        });
    };

    onTemperatureStateChange(value: any) {
        this.setState({
            temperatureState: value,
            columnState: temperatureMapColumn.get(this.state.areaState[value]),
            responseDataState: [{}]
        });
    };

    async onSearchClick(value: any) {
        if (!this.state.dateState) {
            alert('请先选择日期');
            return;
        }
        if (!this.state.tableState || !this.state.columnState) {
            alert('请先选择地区和网段');
            return;
        }
        await axios({
            baseURL: `http://api.jingyuan.winnerwinter.com/time:tb=${this.state.tableState}&column=${this.state.columnState}&date=${this.state.dateState}`,
            method: 'get',
        }).then(response => {
            this.setState({
                responseDataState: response.data.recordset,
            });
            console.log(this.state.responseDataState);
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

    onDateChange(date: moment.Moment, dateString: string) {
        this.setState({
            dateState: dateString
        })
    }


    render() {
        const { areaState } = this.state;

        const { responseDataState, columnState } = this.state;
        const scatterConfig = {
            appendPadding: 10,
            data: responseDataState,
            xField: 'ReportTime',
            yField: `${columnState}`,
            shape: 'circle',
            yAxis: { 
                line: { style: { stroke: '#aaa' } },
                max: 800, 
            },
            xAxis: {
              nice: true,
              min: 100,
              grid: { line: { style: { stroke: '#eee' } } },
              line: { style: { stroke: '#aaa' } },
            },
            pointStyle: { stroke: '#fff' },
        };
        const lineConfig = {
            data: responseDataState,
            xField: 'ReportTime',
            yField: `${columnState}`,
            xAxis: {
                min: 100,
            },
            yAxis: { 
                max: 800, 
            },
        };
        const areaConfig = {
            data: responseDataState,
            xField: 'ReportTime',
            yField: `${columnState}`,
            xAxis: {
              tickCount: 5,
            },
          };

        return (
        <>
            <Row>
                <Col span={4}>
                    <Select
                        defaultValue={area[0]}
                        style={{ width: 180 }}
                        onChange={this.handleAreaStateChange}
                    >
                        {area.map(ar => (
                        <Option key={ar}>{ar}</Option>
                        ))}
                    </Select>
                </Col>
                <Col span={2} />
                <Col span={6}>
                    <Select
                        style={{ width: 180 }}
                        value={this.state.temperatureState}
                        onChange={this.onTemperatureStateChange}
                    >
                        {areaState.map((temperature: any) => (
                        <Option key={temperature}>{temperature}</Option>
                        ))}
                    </Select>
                </Col>
                <Col span={6}>
                    <DatePicker onChange={this.onDateChange}></DatePicker>
                </Col>
                <Col span={2}></Col>
                <Col span={4}>
                  <Button type="primary" onClick={this.onSearchClick}>Search Now</Button>
                </Col>
            </Row>
            <Line {...lineConfig}></Line>
            <Scatter {...scatterConfig}></Scatter>
            <Area {...areaConfig}></Area>
          </>
        );
    }
}
