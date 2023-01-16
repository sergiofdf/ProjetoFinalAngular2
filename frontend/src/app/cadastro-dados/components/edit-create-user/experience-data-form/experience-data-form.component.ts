import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/cadastro-dados/services/users.service';

@Component({
  selector: 'app-experience-data-form',
  templateUrl: './experience-data-form.component.html',
  styleUrls: ['./experience-data-form.component.css']
})
export class ExperienceDataFormComponent implements OnInit {

  public experienceForm!: FormGroup;
  @Input() experienceType: string = 'Experiência Profissional';

  constructor(
  ) { }

  ngOnInit(): void {
    this.buildExperienceForm();
  }

  private buildExperienceForm(): void {
    this.experienceForm = new FormGroup({
      userId: new FormControl(),
      experienceId: new FormControl(null, [Validators.required]),
      experienceType: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      initialDate: new FormControl(null, [Validators.required]),
      finalDate: new FormControl(null, [Validators.required]),
      expDescription:new FormControl(null, [Validators.required]),
    });
  }

}
