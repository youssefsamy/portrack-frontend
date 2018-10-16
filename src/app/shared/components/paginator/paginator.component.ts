import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input() total = 0;
  @Input() currentPage = 1;
  @Input() pageSize = 10;

  @Output() change: EventEmitter<any> = new EventEmitter();

  public maxPageSize = 1;

  constructor() {}

  getPageText() {
    if (!this.total) {
      return 'Showing 0 entries';
    }
    return `Showing ${(this.currentPage - 1) * this.pageSize + 1} to ${Math.min(
      this.currentPage * this.pageSize,
      this.total
    )}
    of ${this.total} entries`;
  }

  ngOnChanges() {
    this.maxPageSize = Math.ceil(this.total / this.pageSize);
  }

  triggerChange(pageNumber) {
    this.change.emit(pageNumber);
  }
}
