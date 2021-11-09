import React, { useState } from 'react';

import { 
  AutoComplete, 
  Input,
  Divider,
  Icon,
  Row,
  Col,
  Select
} from "./components";

const { Option } = Select

type optionItem = {label: string, value: string};
type optionType = optionItem[]

function App() {
  const [options, setOptions] = useState<optionType | []>([])

  const searchChange = (searchText: string) => {
    setOptions([
      {label: '1', value: '1'},
      {label: '2', value: '123'},
      {label: '3', value: '123456'}
    ]);
  }

  const selectOption = (data?: optionItem) => {
    console.log(data)
  }


  const handleChange = (evt: React.ChangeEvent) => {
    // console.log(evt)
  }

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
        </Row>
        
      </div>

      <div className="base-info">
        <Divider message="icon"></Divider>
        <Icon type="loading" style={{fontSize: '32px'}}/>
        <Icon type="youtube" style={{color: 'red'}} />
      </div>
    </div>
  );
}

export default App;
