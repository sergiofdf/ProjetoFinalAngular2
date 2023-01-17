import { Experience } from '../../models/experience.model';
import { SkillDataFormComponent } from './skill-data-form/skill-data-form.component';
import { ExperienceDataFormComponent } from './experience-data-form/experience-data-form.component';
import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { Skill } from '../../models/skill.model';
import { SocialMedia } from '../../models/social-media.model';

@Component({
  selector: 'app-edit-create-user',
  templateUrl: './edit-create-user.component.html',
  styleUrls: ['./edit-create-user.component.css']
})
export class EditCreateUserComponent implements OnInit  {

  public educationsExperienceForms!: FormGroup[];
  public socialMedia!: FormGroup;
  public userId!: string;
  public isUpdate:boolean = false;

  @ViewChild('container', {read: ViewContainerRef}) container!: ViewContainerRef;

  @ViewChild('educationContainer', {read: ViewContainerRef}) educationContainer!: ViewContainerRef;

  @ViewChild('skillsContainer', {read: ViewContainerRef}) skillsContainer!: ViewContainerRef;

  @ViewChild('dadosPessoais') dadosPessoais!: any;
  @ViewChild('expProfissional') expProfissional!: any;
  @ViewChild('expEducation') expEducation!: any;
  @ViewChild('skillFirstForm') skillFirstForm!: any;
  @ViewChild('socialMediaData') socialMediaData!: any;

  expId: number = 0;
  workExpReferences = Array<ComponentRef<ExperienceDataFormComponent>>();
  educationExpReferences = Array<ComponentRef<ExperienceDataFormComponent>>();
  skillId:number = 0;
  skillsReferences = Array<ComponentRef<SkillDataFormComponent>>();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if(this.router.url.includes('create')){
      this.isUpdate = false;
    }
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.isUpdate = true;
      this.updateForm(this.userId);
    }
  }

  public addWorkExperienceForm(experience?: Experience): void{
    const expComponentRef = this.container.createComponent(ExperienceDataFormComponent);

    expComponentRef.setInput('expId', ++this.expId);
    expComponentRef.setInput('parentRef', this);
    expComponentRef.setInput('experienceType', 'Experiência Profissional');
    expComponentRef.setInput('experienceData', experience);
    this.workExpReferences.push(expComponentRef);
  }

  public removeWorkExperienceForm(id: number): void{
    if (this.container.length < 1) return;

    const componentRef = this.workExpReferences.filter(
      x => x.instance.expId == id
    )[0];

    const containerIndex: number = this.container.indexOf(componentRef.changeDetectorRef as any);

    // removing component from container
    this.container.remove(containerIndex);

    // removing component from the list
    this.workExpReferences = this.workExpReferences.filter(
      x => x.instance.expId !== id);
  }

  public addEducationExperienceForm(experience?: Experience): void{
    const educationExpComponentRef = this.educationContainer.createComponent(ExperienceDataFormComponent);

    educationExpComponentRef.setInput('expId', ++this.expId);
    educationExpComponentRef.setInput('parentRef', this);
    educationExpComponentRef.setInput('experienceType', 'Experiência Acadêmica');
    educationExpComponentRef.setInput('experienceData', experience);

    this.educationExpReferences.push(educationExpComponentRef);
  }

  public removeEducationExperienceForm(id: number): void{
    if (this.educationContainer.length < 1) return;

    const componentRef = this.educationExpReferences.filter(
      x => x.instance.expId == id
    )[0];

    const educationContainerIndex: number = this.educationContainer.indexOf(componentRef.changeDetectorRef as any);

    // removing component from container
    this.educationContainer.remove(educationContainerIndex);

    // removing component from the list
    this.educationExpReferences = this.educationExpReferences.filter(
      x => x.instance.expId !== id);
  }

  public addSkillForm(skill?: Skill): void{
    const skillComponentRef = this.skillsContainer.createComponent(SkillDataFormComponent);
    skillComponentRef.setInput('skillId', ++this.skillId);
    skillComponentRef.setInput('parentRef', this);
    skillComponentRef.setInput('skillData', skill);

    this.skillsReferences.push(skillComponentRef);
  }

  public removeSkillForm(id: number): void{
    if (this.skillsContainer.length < 1) return;

    const componentRef = this.skillsReferences.filter(
      x => x.instance.skillId == id
    )[0];

    const skillsContainerIndex: number = this.skillsContainer.indexOf(componentRef.changeDetectorRef as any);

    // removing component from container
    this.skillsContainer.remove(skillsContainerIndex);

    // removing component from the list
    this.skillsReferences = this.skillsReferences.filter(
      x => x.instance.skillId !== id);
  }

  private updateForm(id: string): void {
    this.usersService.getUserById(id).subscribe({
      next: (res) => {
        const user = res;
        this.dadosPessoais.userForm.patchValue(user);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.usersService.getExperiencesByUserId(id).subscribe({
      next: (res) => {
        const experiences: Experience[] = res;
        const workExperiences = experiences.filter( exp => exp.experienceType === 'Profissional');
        const educationExperiences = experiences.filter( exp => exp.experienceType === 'Acadêmica');
        if(workExperiences.length > 0){
          this.expProfissional.experienceForm.patchValue(workExperiences[0]);
          for( let i = 1; i < workExperiences.length; i++ ){
            this.addWorkExperienceForm(workExperiences[i]);
          }
        }
        if(educationExperiences.length > 0){
          this.expEducation.experienceForm.patchValue(educationExperiences[0]);
          for( let i = 1; i < educationExperiences.length; i++ ){
            this.addEducationExperienceForm(educationExperiences[i]);
          }
        }
      },
      error: (err) => {
        console.log('Erro ao consultar experiências do usuário:', err);
      }
    });
    this.usersService.getSkillsByUserId(id).subscribe({
      next: (res) => {
        const skills: Skill[] = res;
        if(skills.length > 0){
          this.skillFirstForm.skillForm.patchValue(skills[0]);
          for( let i = 1; i < skills.length; i++ ){
            this.addSkillForm(skills[i]);
          }
        }
      },
      error: (err) => {
        console.log('Erro ao consultar experiências do usuário:', err);
      }
    });
    this.usersService.getSocialMediaByUserId(id).subscribe({
      next: (res) => {
        const socialMedia: SocialMedia = res;
        this.socialMediaData.socialMediaForm.patchValue(socialMedia);
      },
      error: (err) => {
        console.log('Erro ao consultar experiências do usuário:', err);
      }
    });
  }

  public onSubmit(): void{
    const user = this.dadosPessoais.userForm.getRawValue();
    user.userRole = 'Usuário';
    delete user.userId;
    this.usersService.createUser(user).subscribe({
      next: (res) => {
        this.router.navigate(['/cadastro-dados'])
      },
      error: (err) => console.log('Erro ao cadastrar usuário: ', err)
    })
  }

}
