import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.component';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(32);
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      console.log();
    }
  }
}
