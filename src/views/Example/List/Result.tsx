import { App } from "antd";
import { useState } from "react";
import {
  ColumnActions,
  RouteTable,
  RouteTableGetData,
  RouteTableProps,
  useForceUpdate,
  useInterval,
} from "@think/components";
import { NamedLink } from "@think/router-utils";
import {
  deleteExample,
  ExampleModel,
  pagingExample,
} from "@/api/controller/example";
import { UserLevel } from "@/common/enums/user";
import { formatTimespan } from "@/common/format";

export type ResultProps = {
  filter?: Record<string, any>;
  onEdit?: (detail: ExampleModel) => void;
};

const Result = (props: ResultProps) => {
  const { filter, onEdit } = props || {};

  const { message } = App.useApp();
  const [forceKey, forceUpdate] = useForceUpdate();
  const [delay, setDelay] = useState(-1);

  useInterval(forceUpdate, delay);

  const fetchData: RouteTableGetData = async (params) => {
    const { filter, ...rest } = params;
    const { date, ...filterRest } = filter || {};
    const [startDate, endDate] = date || [];

    const res = await pagingExample({
      ...rest,
      ...filterRest,
      startDate,
      endDate,
    });

    const needRefresh = Math.random() >= 0.5;
    setDelay(needRefresh ? 5000 : -1);

    return res.data;
  };

  const handleDelete = async (record: ExampleModel) => {
    const { id } = record;
    await deleteExample({ id });
    message.success("删除成功");
    forceUpdate();
  };

  const columns: RouteTableProps<ExampleModel>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      width: 100,
      title: "名称",
      dataIndex: "name",
    },
    {
      width: 100,
      title: "级别",
      dataIndex: "level",
      render: (_, { level }) => {
        return UserLevel._label(level) || level;
      },
    },
    {
      width: 180,
      title: "时间",
      dataIndex: "date",
      renderDateTime: true,
    },
    {
      width: 100,
      title: "耗时",
      dataIndex: "elapsed",
      render: (_, { elapsed }) => {
        return elapsed ? formatTimespan(elapsed) : "-";
      },
    },
    {
      width: 100,
      title: "数量",
      dataIndex: "count",
      renderSeparator: true,
    },
    {
      title: "描述",
      dataIndex: "desc",
      renderPlaceholder: true,
      renderMultiLine: true,
      renderTooltip: true,
    },
    {
      align: "right",
      width: 130,
      title: "操作",
      dataIndex: "actions",
      render: (_, record) => {
        const { id } = record || {};
        return (
          <ColumnActions
            dropdownActions={[
              {
                children: "编辑",
                onClick: () => onEdit?.(record),
              },
              {
                children: "删除",
                onClick: () => handleDelete(record),
                popconfirm: { stopPropagation: true, title: "确认删除？" },
              },
            ]}
          >
            <NamedLink name="example-detail" params={{ exampleId: id }}>
              详情
            </NamedLink>
          </ColumnActions>
        );
      },
    },
  ];

  return (
    <RouteTable
      size="small"
      rowKey="id"
      loadingDelay={delay >= 0 ? 1000 : undefined}
      refreshKey={forceKey}
      columns={columns}
      filter={filter}
      fetchData={fetchData}
    />
  );
};

export default Result;
