import React, { useState, useEffect } from 'react';

import { 
  AutoComplete, 
  Input,
  Divider,
  Icon,
  Row,
  Col,
  Select,
  Tag,
  Cascader
} from "./components";

const { Option } = Select

type optionItem = {label: string, value: string};
type optionType = optionItem[]

function App() {

  // ======================= Autocomplete =========================
  const [options, setOptions] = useState<optionType | []>([])

  const searchChange = (searchText: string) => {
    setOptions([
      {label: '1', value: '1'},
      {label: '2', value: '123'},
      {label: '3', value: '123456'}
    ]);
  }

  const selectOption = (data?: string) => {
    console.log(data)
  }
  // ==============================================================

  // ========================= Input ==============================
  const handleChange = (evt: React.ChangeEvent) => {
    // console.log(evt)
  }
  // ==============================================================

  // ========================== Tag ===============================
  const closeTag =() => {
    console.log('close tag')
  }
  // ==============================================================

  interface cascaderOptions {
    label?: string
    value?: string
    leaf?: boolean
    children?: Array<cascaderOptions>
  }
  // ====================== Cascader ==============================
  const [cascaderOptions, setCascaderOptions] = useState<Array<cascaderOptions>>([]);
  const [field_options, setFieldOptions] = useState([]);

  useEffect(() => {
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

  const onChange = (value) => {
    console.log(value);
  };

  const filter = (inputValue: string, path) => {
    return path.labels.some(
      (label) => label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  const changeOptions = () => {
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
    ]);
  };

  const loadData = (selectedOptions) => {};

  // ==============================================================


  return (
    <div className="App">
      <div className="base-info">
        <Divider message="auto-complete 自动完成">
          <div className="children">
            children
          </div>
        </Divider>

        <Row gutter={32}>
          <Col span={8}>
            <AutoComplete 
              allowClear={true}
              options={options} 
              placeholder={"请输入"} 
              onSearch={searchChange} 
              onSelect={selectOption} />
          </Col>
          <Col span={8}>
            <AutoComplete 
              placeholder={"请输入"} 
              options={[
                {
                  label: '1',
                  value: '123'
                },
                {
                  label: '2',
                  value: '258'
                }
              ]} 
              filterOption={(inputValue: string, option: optionItem) => {
                return option?.value.indexOf(inputValue) !== -1
              }}/>
          </Col>
        </Row>
        
      </div>

      <div className="base-info">
        <Divider message="input "></Divider>
        <Row gutter={[32, 24]}>
          <Col span={4}>
            <Input 
              allowClear={true}
              placeholder="请输入" />
          </Col>
          <Col span={4}>
            <Input onChange={handleChange} disabled={true} placeholder="请输入" />
          </Col>
          <Col span={4}>
            <Input type="password" onChange={handleChange} placeholder="请输入" />
          </Col>
        </Row>
      </div>

      <div className="base-info">
        <Divider message="select"></Divider>
        <Row gutter={24}>
          <Col span={4}>
            <Select 
              placeholder="请选择" 
              style={{width: '100px'}} 
              options={[{
                label: '1',
                value: '123'
              }]}></Select>
          </Col>
          <Col span={4}>
            <Select 
              disabled={true}
              placeholder="请选择" 
              style={{width: '150px'}}></Select>
          </Col>
          <Col span={4}>
            <Select 
              loading={true}
              placeholder="请选择" 
              style={{width: '150px'}}></Select>
          </Col>
          <Col span={4}>
            <Select 
              mode={'multiple'}
              placeholder="请选择" 
              style={{width: '180px'}} 
              options={[
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
              ]}></Select>
          </Col>
        </Row>
      </div>

      <div className="base-info">
        <Divider message="Tag"></Divider>
        <Row>
          <Col span={8}>
            <Tag>tag base</Tag>
            <Tag color={'magenta'}>magenta</Tag>
            <Tag color={'red'}>red</Tag>
            <Tag color={'#2db7f5'}>#2db7f5</Tag>
            <Tag closable={true} onClose={closeTag}>tag close</Tag>
          </Col>
        </Row>
        
      </div>

      <div className="base-info">
        <Divider message="icon"></Divider>
        <Icon type="loading" style={{fontSize: '32px'}}/>
        <Icon type="youtube" style={{color: 'red'}} />
      </div>

      <div className="base-info">
        <div style={{ width: 240, marginRight: 20 }}>
          <Cascader
            options={cascaderOptions}
            showSearch={true}
            onChange={onChange}
            placeholder="请选择"
          />
        </div>

        <div style={{ width: 240, marginRight: 20 }}>
          <Cascader
            options={cascaderOptions}
            showSearch={{
              filter,
            }}
            onChange={onChange}
            placeholder="请选择"
          />
        </div>

        <div style={{ width: 240, marginRight: 20 }}>
          <Cascader
            options={field_options}
            fieldNames={{
              label: "name",
              value: "id",
            }}
            loadData={loadData}
            onChange={onChange}
            placeholder="请选择"
          />
        </div>

        <button onClick={changeOptions}>点击</button>
      </div>
    </div>
  );
}

export default App;
