import React, { useState, useEffect } from 'react';
import { AutoComplete, Input, Divider, Icon, Row, Col, Select, Tag, Cascader } from "./components";
var Option = Select.Option;
function App() {
    // ======================= Autocomplete =========================
    var _a = useState([]), options = _a[0], setOptions = _a[1];
    var searchChange = function (searchText) {
        setOptions([
            { label: '1', value: '1' },
            { label: '2', value: '123' },
            { label: '3', value: '123456' }
        ]);
    };
    var selectOption = function (data) {
        console.log(data);
    };
    // ==============================================================
    // ========================= Input ==============================
    var handleChange = function (evt) {
        // console.log(evt)
    };
    // ==============================================================
    // ========================== Tag ===============================
    var closeTag = function () {
        console.log('close tag');
    };
    // ====================== Cascader ==============================
    var _b = useState([]), cascaderOptions = _b[0], setCascaderOptions = _b[1];
    var _c = useState([]), field_options = _c[0], setFieldOptions = _c[1];
    useEffect(function () {
        setCascaderOptions([
            {
                label: "肉类",
                value: "10001",
                leaf: false,
                children: [
                    {
                        label: "牛肉",
                        value: "10002",
                        leaf: false,
                        children: [
                            {
                                label: "牛头",
                                value: "10003",
                                leaf: true,
                            },
                            {
                                label: "牛腿",
                                value: "10004",
                                leaf: true,
                            },
                            {
                                label: "牛B",
                                value: "10005",
                                leaf: true,
                            },
                        ],
                    },
                    {
                        label: "猪肉",
                        value: "10006",
                        leaf: false,
                        children: [
                            {
                                label: "🐖头",
                                value: "10007",
                                leaf: true,
                            },
                            {
                                label: "🐖腿",
                                value: "10008",
                                leaf: true,
                            },
                        ],
                    },
                ],
            },
            {
                label: "蔬菜类",
                value: "20001",
                leaf: false,
                children: [
                    {
                        label: "青菜",
                        value: "20002",
                        leaf: false,
                        children: [
                            {
                                label: "菠菜",
                                value: "20003",
                                leaf: true,
                            },
                            {
                                label: "油麻菜",
                                value: "20004",
                                leaf: true,
                            },
                        ],
                    },
                ],
            },
        ]);
        setFieldOptions([
            {
                name: "肉类",
                id: "10001",
                leaf: false,
                children: [
                    {
                        name: "牛肉",
                        id: "10002",
                        leaf: false,
                        children: [
                            {
                                name: "牛头",
                                id: "10003",
                                leaf: true,
                            },
                            {
                                name: "牛腿",
                                id: "10004",
                                leaf: true,
                            },
                            {
                                name: "牛B",
                                id: "10005",
                                leaf: true,
                            },
                        ],
                    },
                    {
                        name: "猪肉",
                        id: "10006",
                        leaf: false,
                        children: [
                            {
                                name: "🐖头",
                                id: "10007",
                                leaf: true,
                            },
                            {
                                name: "🐖腿",
                                id: "10008",
                                leaf: true,
                            },
                        ],
                    },
                ],
            },
            {
                name: "蔬菜类",
                id: "20001",
                leaf: false,
                children: [
                    {
                        name: "青菜",
                        id: "20002",
                        leaf: false,
                        children: [
                            {
                                name: "菠菜",
                                id: "20003",
                                leaf: true,
                            },
                            {
                                name: "油麻菜",
                                id: "20004",
                                leaf: true,
                            },
                        ],
                    },
                ],
            },
        ]);
    }, []);
    var onChange = function (value) {
        console.log(value);
    };
    var filter = function (inputValue, path) {
        return path.labels.some(function (label) { return label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1; });
    };
    // ==============================================================
    return (React.createElement("div", { className: "App" },
        React.createElement("div", { className: "base-info" },
            React.createElement(Divider, { message: "auto-complete \u81EA\u52A8\u5B8C\u6210" },
                React.createElement("div", { className: "children" }, "children")),
            React.createElement(Row, { gutter: 32 },
                React.createElement(Col, { span: 8 },
                    React.createElement(AutoComplete, { allowClear: true, options: options, placeholder: "请输入", onSearch: searchChange, onSelect: selectOption })),
                React.createElement(Col, { span: 8 },
                    React.createElement(AutoComplete, { placeholder: "请输入", options: [
                            {
                                label: '1',
                                value: '123'
                            },
                            {
                                label: '2',
                                value: '258'
                            }
                        ], filterOption: function (inputValue, option) {
                            return (option === null || option === void 0 ? void 0 : option.value.indexOf(inputValue)) !== -1;
                        } })))),
        React.createElement("div", { className: "base-info" },
            React.createElement(Divider, { message: "input " }),
            React.createElement(Row, { gutter: [32, 24] },
                React.createElement(Col, { span: 4 },
                    React.createElement(Input, { allowClear: true, placeholder: "\u8BF7\u8F93\u5165" })),
                React.createElement(Col, { span: 4 },
                    React.createElement(Input, { onChange: handleChange, disabled: true, placeholder: "\u8BF7\u8F93\u5165" })),
                React.createElement(Col, { span: 4 },
                    React.createElement(Input, { type: "password", onChange: handleChange, placeholder: "\u8BF7\u8F93\u5165" })))),
        React.createElement("div", { className: "base-info" },
            React.createElement(Divider, { message: "select" }),
            React.createElement(Row, { gutter: 24 },
                React.createElement(Col, { span: 4 },
                    React.createElement(Select, { placeholder: "\u8BF7\u9009\u62E9", style: { width: '100px' }, options: [{
                                label: '1',
                                value: '123'
                            }] })),
                React.createElement(Col, { span: 4 },
                    React.createElement(Select, { disabled: true, placeholder: "\u8BF7\u9009\u62E9", style: { width: '150px' } })),
                React.createElement(Col, { span: 4 },
                    React.createElement(Select, { loading: true, placeholder: "\u8BF7\u9009\u62E9", style: { width: '150px' } })),
                React.createElement(Col, { span: 4 },
                    React.createElement(Select, { mode: 'multiple', placeholder: "\u8BF7\u9009\u62E9", style: { width: '180px' }, options: [
                            {
                                label: '1',
                                value: '1'
                            },
                            {
                                label: '2',
                                value: '2'
                            },
                            {
                                label: '3',
                                value: '3'
                            }
                        ] })))),
        React.createElement("div", { className: "base-info" },
            React.createElement(Divider, { message: "Tag" }),
            React.createElement(Row, null,
                React.createElement(Col, { span: 8 },
                    React.createElement(Tag, null, "tag base"),
                    React.createElement(Tag, { color: 'magenta' }, "magenta"),
                    React.createElement(Tag, { color: 'red' }, "red"),
                    React.createElement(Tag, { color: '#2db7f5' }, "#2db7f5"),
                    React.createElement(Tag, { closable: true, onClose: closeTag }, "tag close")))),
        React.createElement("div", { className: "base-info" },
            React.createElement(Divider, { message: "icon" }),
            React.createElement(Icon, { type: "loading", style: { fontSize: '32px' } }),
            React.createElement(Icon, { type: "youtube", style: { color: 'red' } })),
        React.createElement("div", { className: "base-info" },
            React.createElement(Divider, { message: "Cascader" }),
            React.createElement(Row, { gutter: 24 },
                React.createElement(Col, { span: 4 },
                    React.createElement(Cascader, { options: cascaderOptions, showSearch: true, onChange: onChange, placeholder: "\u8BF7\u9009\u62E9" })),
                React.createElement(Col, { span: 4 },
                    React.createElement(Cascader, { options: cascaderOptions, showSearch: {
                            filter: filter,
                        }, onChange: onChange, placeholder: "\u8BF7\u9009\u62E9" })),
                React.createElement(Col, { span: 4 },
                    React.createElement(Cascader, { options: field_options, fieldNames: {
                            label: "name",
                            value: "id",
                        }, onChange: onChange, placeholder: "\u8BF7\u9009\u62E9" }))))));
}
export default App;
