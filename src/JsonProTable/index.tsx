import JsonFormItemEditer from './JsonFormItemEditer';
import type { JsonProTableProps } from './JsonProTable';
import JsonProTable from './JsonProTable';
import JsonProTablePicker from './JsonProTablePicker';

export { JsonProTableProps, JsonProTablePicker };

const Page = JsonProTable as typeof JsonProTable & {
  JsonFormItemEditer: typeof JsonFormItemEditer;
  JsonProTablePicker: typeof JsonProTablePicker;
};

Page.JsonFormItemEditer = JsonFormItemEditer;
Page.JsonProTablePicker = JsonProTablePicker;

export default Page;
