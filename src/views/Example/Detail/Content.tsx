import { LayoutSimple } from "@think/components";
import { ExampleModel } from "@/api/controller/example";

export type ContentProps = {
  detail?: ExampleModel;
};

const Content = (props: ContentProps) => {
  const { detail } = props;

  return <LayoutSimple>{JSON.stringify(detail)}</LayoutSimple>;
};

export default Content;
