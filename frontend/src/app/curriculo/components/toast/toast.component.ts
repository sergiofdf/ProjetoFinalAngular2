import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @ViewChild('myToast',{static:true}) toastEl: any;

  @Output() toastEmitter: EventEmitter<Toast> = new EventEmitter<Toast>();
  @Input() toastMessage!: string;
  @Input() messageType: string = 'bg-success';

  toast!: Toast;

  ngOnInit() {
    this.toast = new Toast(this.toastEl.nativeElement, {});
    this.toastEmitter.emit(this.toast);
  }
}
