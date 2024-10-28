import { App, Form, Input, Modal, Space } from "antd";
import { useEffect } from "react";
import { BaseAction, BaseSelect } from "@think/components";
import {
  createExample,
  ExampleModel,
  updateExample,
} from "@/api/controller/example";
import { UserLevel } from "@/common/enums/user";

export type EditModalProps = {
  open?: boolean;
  detail?: ExampleModel;
  onCancel?: () => void;
  onSubmit?: () => void;
};

const EditModal = (props: EditModalProps) => {
  const { open, detail, onCancel, onSubmit } = props;
  const { id } = detail || {};
  const isEdit = !!id;

  const { message } = App.useApp();
  const [form] = Form.useForm<ExampleModel>();

  useEffect(() => {
    if (!open) {
      return;
    }

    form.resetFields();
    form.setFieldsValue({
      ...detail,
    });
  }, [detail, form, open]);

  const handleCancel = () => {
    form.resetFields();
    onCancel && onCancel();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const { ...rest } = values || {};

    const params = {
      ...rest,
    };

    if (isEdit) {
      await updateExample({ ...params, id });
    } else {
      await createExample({ ...params });
    }

    message.success(`${isEdit ? "编辑" : "新建"}成功`);
    handleCancel();
    onSubmit && onSubmit();
  };

  return (
    <Modal
      destroyOnClose
      open={open}
      title={isEdit ? "编辑" : "新建"}
      onCancel={handleCancel}
      onOk={handleSubmit}
      footer={
        <Space>
          <BaseAction onClick={handleCancel}>取消</BaseAction>
          <BaseAction type="primary" onClick={handleSubmit}>
            确定
          </BaseAction>
        </Space>
      }
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item
          name="name"
          label="名称"
          rules={[
            { required: true, whitespace: true, message: "请输入名称" },
            { max: 20, message: "请输入 20 位以内名称" },
          ]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item
          name="level"
          label="级别"
          rules={[{ required: true, message: "请选择级别" }]}
        >
          <BaseSelect
            allowClear
            options={UserLevel._list}
            placeholder="请选择级别"
          />
        </Form.Item>
        <Form.Item
          name="desc"
          label="描述"
          rules={[
            { whitespace: true, max: 200, message: "请输入 200 位以内描述" },
          ]}
        >
          <Input.TextArea placeholder="请输入描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
