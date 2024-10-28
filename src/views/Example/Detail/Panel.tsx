import { Button, Descriptions, Space, Statistic } from "antd";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import {
  DropdownActions,
  LayoutDetail,
  Loading,
  useFetch,
} from "@think/components";
import { ExampleModel, queryExample } from "@/api/controller/example";
import { UserLevel } from "@/common/enums/user";
import { formatSecond, formatTimespan } from "@/common/format";
import Content from "./Content";

export type PanelProps = {
  onEdit?: (detail: ExampleModel) => void;
};

const Panel = (props: PanelProps) => {
  const { onEdit } = props;

  const { exampleId } = useParams();
  const fetchParams = useMemo(() => ({ id: exampleId }), [exampleId]);
  const { loading, data: detail } = useFetch(queryExample, {
    autoFetch: [fetchParams],
  });

  const { id, name, level, date, elapsed, count, desc } = detail || {};

  return (
    <LayoutDetail
      title={
        <Space align="center">
          <span>[{id}]</span>
          <span title={name}>{name}</span>
        </Space>
      }
      action={
        <DropdownActions
          actionAlign="left"
          disabled={!detail}
          actions={[
            {
              onClick: () => onEdit?.(detail!),
              children: "编辑",
            },
          ]}
        >
          <Button type="primary">
            <Space size={4}>
              <span>操作</span>
              <DownOutlined />
            </Space>
          </Button>
        </DropdownActions>
      }
      description={
        <Descriptions
          size="small"
          column={3}
          items={[
            {
              key: "level",
              label: "级别",
              children: UserLevel._label(level) || level || "-",
            },
            {
              key: "date",
              label: "时间",
              children: date ? formatSecond(date) : "-",
            },
            {
              key: "elapsed",
              label: "耗时",
              children: elapsed ? formatTimespan(elapsed) : "-",
            },
            {
              key: "desc",
              label: "描述",
              children: desc || "-",
            },
          ]}
        />
      }
      statistic={
        <div>
          <Statistic title="数量" value={count} />
        </div>
      }
    >
      <Content detail={detail} />
      <Loading spinning={loading} />
    </LayoutDetail>
  );
};

export default Panel;
