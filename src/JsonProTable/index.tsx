import JsonFormItemEditer from './JsonFormItemEditer';
import JsonProTable from './JsonProTable';
import JsonProTablePicker from './JsonProTablePicker';
import type { JsonProTableProps } from './JsonProTable';

export { JsonProTableProps,JsonProTablePicker };

const Page = JsonProTable as typeof JsonProTable & {
    JsonFormItemEditer: typeof JsonFormItemEditer;
    JsonProTablePicker: typeof JsonProTablePicker;
}

Page.JsonFormItemEditer = JsonFormItemEditer;
Page.JsonProTablePicker = JsonProTablePicker;

export default Page;