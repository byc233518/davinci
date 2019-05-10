/*
 * <<
 * Davinci
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

import React from 'react'

import { Form, Row, Col, Input, Radio, Tabs, Tree } from 'antd'
const TreeNode = Tree.TreeNode
const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group
const TabPane = Tabs.TabPane

const utilStyles = require('../../../assets/less/util.less')
const styles = require('../Portal.less')

interface IProtalListProps {
  projectId: number
  type: string
  form: any
  params?: any
  onCheckUniqueName?: (pathname: string, data: any, resolve: () => any, reject: (error: string) => any) => any
}

export class PortalForm extends React.PureComponent<IProtalListProps, {}> {
  private checkNameUnique = (rule, value = '', callback) => {
    const { onCheckUniqueName, type, form, projectId } = this.props
    const { id } = form.getFieldsValue()

    const data = {
      projectId,
      id: type === 'add' ? '' : id,
      name: value
    }
    if (!value) {
      callback()
    }
    onCheckUniqueName('dashboardPortal', data,
      () => {
        callback()
      }, (err) => {
        callback(err)
      })
  }

  public render () {
    const { getFieldDecorator } = this.props.form

    const commonFormItemStyle = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 }
    }

    return (
      <Form>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem className={utilStyles.hide}>
              {getFieldDecorator('id', {
                hidden: this.props.type === 'add'
              })(
                <Input />
              )}
            </FormItem>
            <FormItem className={utilStyles.hide}>
              {getFieldDecorator('avatar', {})(
                <Input />
              )}
            </FormItem>
            <FormItem label="名称" {...commonFormItemStyle} hasFeedback>
              {getFieldDecorator('name', {
                rules: [{
                  required: true,
                  message: 'Name 不能为空'
                }, {
                  validator: this.checkNameUnique
                }]
              })(
                <Input placeholder="Name" />
              )}
            </FormItem>
            <FormItem label="描述" {...commonFormItemStyle}>
              {getFieldDecorator('description', {
                initialValue: ''
              })(
                <TextArea
                  placeholder="Description"
                  autosize={{minRows: 2, maxRows: 6}}
                />
              )}
            </FormItem>
            <FormItem label="是否发布" {...commonFormItemStyle}>
              {getFieldDecorator('publish', {
                initialValue: true
              })(
                <RadioGroup>
                  <Radio value>发布</Radio>
                  <Radio value={false}>编辑</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(PortalForm)
