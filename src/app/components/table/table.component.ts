import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IResponseDTO } from '../../interfaces/accountinterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() tableHeaders: any[] = [];
  @Input() tableData: any[] = [];
  @Input() opciones?: boolean;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();
  filterText: string = '';
  filteredTableData: any[] = [];
  properties: string[] = [];

  ngOnChanges() {
    this.filterData();
  }

  ngOnInit(): void {
    this.filterData();
    this.properties = Object.keys(this.tableData[0]);
  }

  filterData() {
    if (this.filterText) {
      this.filteredTableData = this.tableData.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            String(value).toLowerCase().includes(this.filterText.toLowerCase())
        )
      );
    } else {
      this.filteredTableData = this.tableData;
    }
  }

  editAccount(account: IResponseDTO) {
    this.edit.emit(account);
  }
}
