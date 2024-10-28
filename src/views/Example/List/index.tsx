import { useState } from "react";
import {
  BaseAction,
  LayoutPanel,
  LayoutQuery,
  useForceUpdate,
} from "@think/components";
import { ExampleModel } from "@/api/controller/example";
import EditModal from "../Edit/EditModal";
import Filter from "./Filter";
import Result from "./Result";

const List = () => {
  const [filter, setFilter] = useState();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<ExampleModel>();
  const [forceKey, forceUpdate] = useForceUpdate();

  const handleEdit = (record?: ExampleModel) => {
    setOpen(true);
    setDetail(record);
  };

  const handleCancel = () => {
    setOpen(false);
    setDetail(undefined);
  };

  const handleSubmit = () => {
    handleCancel();
    forceUpdate();
  };

  const handleFilterChange = (values: any) => {
    setFilter(values);
  };

  return (
    <LayoutPanel>
      <LayoutQuery
        key={forceKey}
        title="示例列表"
        filter={<Filter onChange={handleFilterChange} />}
        action={
          <BaseAction ghost type="primary" onClick={() => handleEdit()}>
            新建
          </BaseAction>
        }
      >
        <Result filter={filter} onEdit={handleEdit} />
      </LayoutQuery>
      <EditModal
        open={open}
        detail={detail}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </LayoutPanel>
  );
};

export default List;
