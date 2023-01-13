import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  @Output() public formDataOutput: EventEmitter<FormGroup> = new EventEmitter();

  toast!: Toast;

  contactForm!: FormGroup;

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      message: new FormControl(null, [
        Validators.required]),
    });
  }

  public onSubmit(): void {
    this.formDataOutput.emit(this.contactForm);
    this.contactForm.reset();

    this.toast.show();
  }

  public keyPress(event: any) {
    const pattern = /[0-9]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  get f() {
    return this.contactForm.controls;
  }

  createToast(toastElement: Toast): void {
    this.toast = toastElement;
  }

  closeForm(): void {
    this.contactForm.reset();
  }
}
