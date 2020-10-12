import React, { Component } from 'react'
import { DatePicker, Select, Row, Col, Button, Table } from 'antd';
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
            antdColumns: [],
            selectedDate: '',
            data: [{}],
            currentPage: 1,
            perPageSize: 500
        }
    }

    onDateChange(date: moment.Moment, dateString: string): void {
        console.log(date, dateString);
        this.setState({
            selectedDate: dateString
        });
    }

    c2a() {
        this.setState({
            antdColumns: (this.state.columns).map((item: any) => ({
                title: item.name,
                dataIndex: item.code,
                key: item.code
            }))
        }, () => console.log('antdColumns: ' + this.state.antdColumns));
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
                        { code: 'T1', name: '一网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度/℃', width: 100, align: 'right' },
                        { code: 'T3', name: '二网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T4', name: '二网回水温度/℃', width: 100, align: 'right' },
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
                    ],
                }, this.c2a);
                break;
            case 'V10004':
                this.setState({
                    columns : [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度/℃', width: 100, align: 'right' },
                        { code: 'T3', name: '二网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T4', name: '二网回水温度/℃', width: 100, align: 'right' },
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
                }, this.c2a);
                break;
            case 'V10005':
            case 'V10006':
            case 'V10007':
            case 'V10008':
            case 'V10009':
            case 'V10024':
            case 'V10025':
                this.setState({
                    columns: [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度/℃', width: 100, align: 'right' },
                        { code: 'T3', name: '二网低区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T4', name: '二网低区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T5', name: '二网高区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T6', name: '二网高区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T7', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T8', name: '一网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T9', name: '二网低区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T10', name: '低区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T11', name: '二网高区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T12', name: '二网高区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T13', name: '一网瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T14', name: '一网瞬时热量/GJ/h', width: 100, align: 'right' },
                        { code: 'T15', name: '一网热量累计/GJ', width: 100, align: 'right' },
                        { code: 'T16', name: '低区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T17', name: '低区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T18', name: '高区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T19', name: '高区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T20', name: '一网泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T21', name: '1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T22', name: '低区2号循环频率反泵馈/Hz', width: 100, align: 'right' },
                        { code: 'T23', name: '低区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T24', name: '高区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T25', name: '高区2号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T26', name: '高区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T27', name: '一网泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T28', name: '低区1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T29', name: '低区2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T30', name: '低区补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T31', name: '高区1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T32', name: '高区2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T33', name: '高区补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T34', name: '水箱水位高度/M', width: 100 },
                    ]
                }, this.c2a);
                break;
            case 'V10010':
                this.setState({
                    columns: [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度/℃', width: 100, align: 'right' },
                        { code: 'T3', name: '二网低区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T4', name: '二网低区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T5', name: '二网高区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T6', name: '二网高区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T7', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T8', name: '一网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T9', name: '二网低区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T10', name: '低区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T11', name: '二网高区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T12', name: '二网高区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T13', name: '一网瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T14', name: '一网瞬时热量/GJ/h', width: 100, align: 'right' },
                        { code: 'T15', name: '一网热量累计/GJ', width: 100, align: 'right' },
                        { code: 'T16', name: '低区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T17', name: '低区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T18', name: '高区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T19', name: '高区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T20', name: '一网泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T21', name: '1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T22', name: '低区2号循环频率反泵馈/Hz', width: 100, align: 'right' },
                        { code: 'T23', name: '低区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T24', name: '高区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T25', name: '高区2号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T26', name: '高区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T27', name: '一网泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T28', name: '低区1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T29', name: '低区2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T30', name: '低区补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T31', name: '高区1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T32', name: '高区2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T33', name: '高区补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T34', name: '水箱水位高度/M', width: 100, align: 'right' },
                        { code: 'T35', name: '南区一网瞬时流量（1）/m³/h', width: 100, },
                    ]
                }, this.c2a);
                break;
            case 'V10011':
                this.setState({
                    columns : [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度/℃', width: 100, align: 'right' },
                        { code: 'T3', name: '二网低区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T4', name: '二网低区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T5', name: '二网高区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T6', name: '二网高区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T7', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T8', name: '一网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T9', name: '二网低区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T10', name: '低区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T11', name: '二网高区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T12', name: '二网高区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T13', name: '一网瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T14', name: '一网瞬时热量/GJ/h', width: 100, align: 'right' },
                        { code: 'T15', name: '一网热量累计/GJ', width: 100, align: 'right' },
                        { code: 'T16', name: '低区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T17', name: '低区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T18', name: '高区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T19', name: '高区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T20', name: '一网泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T21', name: '1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T22', name: '低区2号循环频率反泵馈/Hz', width: 100, align: 'right' },
                        { code: 'T23', name: '低区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T24', name: '高区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T25', name: '高区2号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T26', name: '高区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T27', name: '水箱水位高度/M', width: 100, align: 'right' },
                        { code: 'T28', name: '一网热量累计(1)/M', width: 100 },
                    ]
                }, this.c2a);
                break;
            case 'V10012':
                this.setState({
                    columns: [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度/℃', width: 100, align: 'right' },
                        { code: 'T3', name: '二网低区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T4', name: '二网低区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T5', name: '二网高区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T6', name: '二网高区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T7', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T8', name: '一网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T9', name: '二网低区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T10', name: '低区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T11', name: '二网高区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T12', name: '二网高区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T13', name: '一网瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T14', name: '一网瞬时热量/GJ/h', width: 100, align: 'right' },
                        { code: 'T15', name: '一网热量累计/GJ', width: 100, align: 'right' },
                        { code: 'T16', name: '低区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T17', name: '低区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T18', name: '高区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T19', name: '高区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T20', name: '一网泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T21', name: '1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T22', name: '低区2号循环频率反泵馈/Hz', width: 100, align: 'right' },
                        { code: 'T23', name: '低区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T24', name: '高区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T25', name: '高区2号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T26', name: '高区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T27', name: '低区1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T28', name: '低区2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T29', name: '低区补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T30', name: '高区1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T31', name: '高区2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T32', name: '高区补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T33', name: '水箱水位高度/M', width: 100 },
                    ]
                }, this.c2a);
                break;
            case 'V10013':
            case 'V10014':
            case 'V10015':
            case 'V10017':
            case 'V10018':
            case 'V10019':
            case 'V10021':
            case 'V10022':
            case 'V10023':
                this.setState({
                    columns: [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度/℃', width: 100, align: 'right' },
                        { code: 'T3', name: '二网低区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T4', name: '二网低区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T5', name: '二网中区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T6', name: '二网中区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T7', name: '二网高区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T8', name: '二网高区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T9', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T10', name: '一网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T11', name: '二网低区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T12', name: '二网低区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T13', name: '二网中区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T14', name: '二网中区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T15', name: '二网高区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T16', name: '二网高区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T17', name: '一网瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T18', name: '一网瞬时热量/GJ/h', width: 100, align: 'right' },
                        { code: 'T19', name: '一网热量累计/GJ', width: 100, align: 'right' },
                        { code: 'T20', name: '低区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T21', name: '低区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T22', name: '中区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T23', name: '中区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T24', name: '高区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T25', name: '高区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T26', name: '一网泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T27', name: '低区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T28', name: '低区2号循环频率反泵馈/Hz', width: 100, align: 'right' },
                        { code: 'T29', name: '低区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T30', name: '中区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T31', name: '中区2号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T32', name: '中区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T33', name: '高区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T34', name: '高区2号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T35', name: '高区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T36', name: '一网变频电流反馈/A', width: 100, align: 'right' },
                        { code: 'T37', name: '低区1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T38', name: '低区2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T39', name: '低区补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T40', name: '中区1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T41', name: '中区2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T42', name: '中区补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T43', name: '高区1号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T44', name: '高区2号循环泵电流反馈/A', width: 100, align: 'right' },
                        { code: 'T45', name: '高区补水电流反馈/A', width: 100, align: 'right' },
                        { code: 'T46', name: '水箱水位高度/M', width: 100 },
                    ]
                }, this.c2a);
                break;
            case 'V10016':
                this.setState({
                    columns: [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度/℃', width: 100, align: 'right' },
                        { code: 'T3', name: '二网低区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T4', name: '二网低区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T5', name: '二网中区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T6', name: '二网中区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T7', name: '二网高区回水温度/℃', width: 100, align: 'right' },
                        { code: 'T8', name: '二网高区供水温度/℃', width: 100, align: 'right' },
                        { code: 'T9', name: '一网供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T10', name: '一网回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T11', name: '二网低区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T12', name: '二网低区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T13', name: '二网中区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T14', name: '二网中区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T15', name: '二网高区供水压力/MPa', width: 100, align: 'right' },
                        { code: 'T16', name: '二网高区回水压力/MPa', width: 100, align: 'right' },
                        { code: 'T17', name: '一网瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T18', name: '一网瞬时热量/GJ/h', width: 100, align: 'right' },
                        { code: 'T19', name: '一网热量累计/GJ', width: 100, align: 'right' },
                        { code: 'T20', name: '低区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T21', name: '低区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T22', name: '中区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T23', name: '中区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T24', name: '高区补水瞬时流量/m³/h', width: 100, align: 'right' },
                        { code: 'T25', name: '高区补水流量累计/m³', width: 100, align: 'right' },
                        { code: 'T26', name: '一网泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T27', name: '低区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T28', name: '低区2号循环频率反泵馈/Hz', width: 100, align: 'right' },
                        { code: 'T29', name: '低区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T30', name: '中区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T31', name: '中区2号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T32', name: '中区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T33', name: '高区1号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T34', name: '高区2号循环泵频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T35', name: '高区补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T36', name: '一网变频电流反馈/A', width: 100, align: 'right' },
                        { code: 'T37', name: '水箱水位高度/M', width: 100 },
                    ]
                }, this.c2a);
                break;
            case 'V10020':
                this.setState({
                    columns : [
                        { code: 'ReportTime', name: '记录时间', width: 100 },
                        { code: 'T1', name: '一网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T2', name: '一网回水温度/℃', width: 100, align: 'right' },
                        { code: 'T3', name: '二网供水温度/℃', width: 100, align: 'right' },
                        { code: 'T4', name: '二网回水温度/℃', width: 100, align: 'right' },
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
                        { code: 'T16', name: '补水频率反馈/Hz', width: 100, align: 'right' },
                        { code: 'T17', name: '水箱水位高度/M', width: 100 },
                    ]
                }, this.c2a);
                break;
        }
    }

    async onSearchClick() {
        if (!this.state.tableName || !this.state.selectedDate) {
            alert("请先选择区域和日期");
            return;
        };
        await axios({
            baseURL: `http://127.0.0.1:5000/dbo:tb=${this.state.tableName}&date=${this.state.selectedDate}`,
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

    onPageChange = (current: number) => {
        this.setState({
            currentPage: current,
        });
    };

    changePageSize(pageSize: number , current: number) {
        // 将当前改变的每页条数存到state中
        this.setState({
            perPageSize: pageSize,
        });
    }

    render() {
        const { currentPage, perPageSize, data } = this.state;
        //对pagination参数进行设置
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize:perPageSize,
            pageSizeOptions:['50', '500', '5000'],
            // showTotal: () => `共${total}条`,
            current: currentPage,
            total: data.length,
            onShowSizeChange: (current: number, pageSize: number) => this.changePageSize(pageSize,current),
            onChange: (current: number) => this.onPageChange(current),
        };
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
                        <Option value="V10000">公租房</Option>
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
            {/* <BaseTable dataSource={this.state.data} columns={this.state.columns}></BaseTable> */}
            <Table
                columns={this.state.antdColumns}
                dataSource={this.state.data}
                pagination={paginationProps}
                rowKey='ReportTime'
            >
            </Table>
          </>
        )
    }
}
