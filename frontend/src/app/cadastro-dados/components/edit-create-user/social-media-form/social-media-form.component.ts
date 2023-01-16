import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-social-media-form',
  templateUrl: './social-media-form.component.html',
  styleUrls: ['./social-media-form.component.css']
})
export class SocialMediaFormComponent implements OnInit {

  public socialMediaForm!: FormGroup;

  constructor(
  ) { }

  ngOnInit(): void {
    this.buildsocialMediaForm();
  }

  private buildsocialMediaForm(): void {
    this.socialMediaForm = new FormGroup({
      userId: new FormControl(),
      socialMediaInfoId: new FormControl(null, [Validators.required]),
      facebookUrl: new FormControl(null, [Validators.required]),
      instagramUrl: new FormControl(null, [Validators.required]),
      githubUrl: new FormControl(null, [Validators.required]),
      linkedinUrl: new FormControl(null, [Validators.required]),
    });
  }
}
