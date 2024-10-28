import { useState } from "react";
import { useForceUpdate } from "@think/components";
import { ExampleModel } from "@/api/controller/example";
import EditModal from "../Edit/EditModal";
import Panel from "./Panel";

const Detail = () => {
  const [forceKey, forceUpdate] = useForceUpdate();
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<ExampleModel>();

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

  return (
    <>
      <Panel key={forceKey} onEdit={handleEdit} />
      <EditModal
        open={open}
        detail={detail}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Detail;
