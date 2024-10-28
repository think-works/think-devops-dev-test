import { Form, Input } from "antd";
import { BaseDateRangePicker, BaseSelect, FilterForm } from "@think/components";
import { UserLevel } from "@/common/enums/user";

export type FilterProps = {
  action?: React.ReactNode;
  onChange?: (params: Record<string, any>) => void;
};

const Filter = (props: FilterProps) => {
  const { action, onChange } = props || {};

  return (
    <FilterForm
      action={action}
      onFilterChange={onChange}
      items={[
        <Form.Item key="keyword" name="keyword" label="名称">
          <Input allowClear />
        </Form.Item>,
        <Form.Item key="levels" name="levels" label="级别">
          <BaseSelect
            allowClear
            mode="multiple"
            maxTagCount={2}
            optionFilterProp="label"
            options={UserLevel._list}
          />
        </Form.Item>,
        <Form.Item key="date" name="date" label="时间">
          <BaseDateRangePicker
            showTime
            startOf={["s", null]}
            endOf={[null, "s"]}
          />
        </Form.Item>,
      ]}
    />
  );
};

export default Filter;
