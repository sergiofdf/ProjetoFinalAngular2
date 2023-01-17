import { Experience } from '../../models/experience.model';
import { SkillDataFormComponent } from './skill-data-form/skill-data-form.component';
import { ExperienceDataFormComponent } from './experience-data-form/experience-data-form.component';
import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { Skill } from '../../models/skill.model';
import { SocialMedia } from '../../models/social-media.model';

@Component({
  selector: 'app-edit-create-user',
  templateUrl: './edit-create-user.component.html',
  styleUrls: ['./edit-create-user.component.css'],
})
export class EditCreateUserComponent implements OnInit {
  public educationsExperienceForms!: FormGroup[];
  public socialMedia!: FormGroup;
  public userId!: string;
  public isUpdate: boolean = false;
  public componentsToDelete: any = [];

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;

  @ViewChild('educationContainer', { read: ViewContainerRef })
  educationContainer!: ViewContainerRef;

  @ViewChild('skillsContainer', { read: ViewContainerRef })
  skillsContainer!: ViewContainerRef;

  @ViewChild('dadosPessoais') dadosPessoais!: any;
  @ViewChild('expProfissional') expProfissional!: any;
  @ViewChild('expEducation') expEducation!: any;
  @ViewChild('skillFirstForm') skillFirstForm!: any;
  @ViewChild('socialMediaData') socialMediaData!: any;

  expId: number = 0;
  workExpReferences = Array<ComponentRef<ExperienceDataFormComponent>>();
  educationExpReferences = Array<ComponentRef<ExperienceDataFormComponent>>();
  skillId: number = 0;
  skillsReferences = Array<ComponentRef<SkillDataFormComponent>>();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('create')) {
      this.isUpdate = false;
    }
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.isUpdate = true;
      this.updateForm(this.userId);
    }
  }

  public addWorkExperienceForm(experience?: Experience): void {
    const expComponentRef = this.container.createComponent(
      ExperienceDataFormComponent
    );

    expComponentRef.setInput('expId', ++this.expId);
    expComponentRef.setInput('parentRef', this);
    expComponentRef.setInput('experienceType', 'Experiência Profissional');
    expComponentRef.setInput('experienceData', experience);
    this.workExpReferences.push(expComponentRef);
  }

  public removeWorkExperienceForm(id: number): void {
    if (this.container.length < 1) return;

    const componentRef = this.workExpReferences.filter(
      (x) => x.instance.expId == id
    )[0];

    this.componentsToDelete.push({
      id: componentRef.instance.experienceData.experienceId,
      type: 'experience',
    });

    const containerIndex: number = this.container.indexOf(
      componentRef.changeDetectorRef as any
    );

    // removing component from container
    this.container.remove(containerIndex);

    // removing component from the list
    this.workExpReferences = this.workExpReferences.filter(
      (x) => x.instance.expId !== id
    );
  }

  public addEducationExperienceForm(experience?: Experience): void {
    const educationExpComponentRef = this.educationContainer.createComponent(
      ExperienceDataFormComponent
    );

    educationExpComponentRef.setInput('expId', ++this.expId);
    educationExpComponentRef.setInput('parentRef', this);
    educationExpComponentRef.setInput(
      'experienceType',
      'Experiência Acadêmica'
    );
    educationExpComponentRef.setInput('experienceData', experience);

    this.educationExpReferences.push(educationExpComponentRef);
  }

  public removeEducationExperienceForm(id: number): void {
    if (this.educationContainer.length < 1) return;

    const componentRef = this.educationExpReferences.filter(
      (x) => x.instance.expId == id
    )[0];

    this.componentsToDelete.push({
      id: componentRef.instance.experienceData.experienceId,
      type: 'experience',
    });

    const educationContainerIndex: number = this.educationContainer.indexOf(
      componentRef.changeDetectorRef as any
    );

    // removing component from container
    this.educationContainer.remove(educationContainerIndex);

    // removing component from the list
    this.educationExpReferences = this.educationExpReferences.filter(
      (x) => x.instance.expId !== id
    );
  }

  public addSkillForm(skill?: Skill): void {
    const skillComponentRef = this.skillsContainer.createComponent(
      SkillDataFormComponent
    );
    skillComponentRef.setInput('skillId', ++this.skillId);
    skillComponentRef.setInput('parentRef', this);
    skillComponentRef.setInput('skillData', skill);

    this.skillsReferences.push(skillComponentRef);
  }

  public removeSkillForm(id: number): void {
    if (this.skillsContainer.length < 1) return;

    const componentRef = this.skillsReferences.filter(
      (x) => x.instance.skillId == id
    )[0];

    this.componentsToDelete.push({
      id: componentRef.instance.skillData.skillId,
      type: 'skill',
    });

    const skillsContainerIndex: number = this.skillsContainer.indexOf(
      componentRef.changeDetectorRef as any
    );

    // removing component from container
    this.skillsContainer.remove(skillsContainerIndex);

    // removing component from the list
    this.skillsReferences = this.skillsReferences.filter(
      (x) => x.instance.skillId !== id
    );
  }

  private updateForm(id: string): void {
    this.usersService.getUserById(id).subscribe({
      next: (res) => {
        const user = res;
        this.dadosPessoais.userForm.patchValue(user);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.usersService.getExperiencesByUserId(id).subscribe({
      next: (res) => {
        const experiences: Experience[] = res;
        const workExperiences = experiences.filter(
          (exp) => exp.experienceType === 'Profissional'
        );
        const educationExperiences = experiences.filter(
          (exp) => exp.experienceType === 'Acadêmica'
        );
        if (workExperiences.length > 0) {
          this.expProfissional.experienceForm.patchValue(workExperiences[0]);
          for (let i = 1; i < workExperiences.length; i++) {
            this.addWorkExperienceForm(workExperiences[i]);
          }
        }
        if (educationExperiences.length > 0) {
          this.expEducation.experienceForm.patchValue(educationExperiences[0]);
          for (let i = 1; i < educationExperiences.length; i++) {
            this.addEducationExperienceForm(educationExperiences[i]);
          }
        }
      },
      error: (err) => {
        console.log('Erro ao consultar experiências do usuário:', err);
      },
    });
    this.usersService.getSkillsByUserId(id).subscribe({
      next: (res) => {
        const skills: Skill[] = res;
        if (skills.length > 0) {
          this.skillFirstForm.skillForm.patchValue(skills[0]);
          for (let i = 1; i < skills.length; i++) {
            this.addSkillForm(skills[i]);
          }
        }
      },
      error: (err) => {
        console.log('Erro ao consultar experiências do usuário:', err);
      },
    });
    this.usersService.getSocialMediaByUserId(id).subscribe({
      next: (res) => {
        const socialMedia: SocialMedia = res;
        this.socialMediaData.socialMediaForm.patchValue(socialMedia);
      },
      error: (err) => {
        console.log('Erro ao consultar experiências do usuário:', err);
      },
    });
  }

  public onSubmit(): void {
    if (!this.isUpdate) {
      this.createNewUser();
    } else {
      this.updateCompleteUser();
    }
    this.router.navigate(['/cadastro-dados']);
  }

  private createNewUser(): void {
    const user = this.dadosPessoais.userForm.getRawValue();
    user.userRole = 'Usuário';
    delete user.userId;
    this.usersService.createUser(user).subscribe({
      next: () => {
        this.router.navigate(['/cadastro-dados']);
      },
      error: (err) => console.log('Erro ao cadastrar usuário: ', err),
    });
  }

  private updateCompleteUser(): void {
    const user = this.dadosPessoais.userForm.getRawValue();
    this.usersService.updateUserById(user).subscribe({
      error: (err) => console.log('Erro ao atualizar dados do usuário: ', err),
    });

    const firstExpProfissional: Experience =
      this.expProfissional.experienceForm.getRawValue();
    if (firstExpProfissional.experienceId > 0) {
      this.usersService
        .updateExperiencesByUserId(firstExpProfissional)
        .subscribe({
          error: (err) =>
            console.log(
              'Erro ao atualizar experiência profissional do usuário: ',
              err
            ),
        });
    }

    if (this.workExpReferences.length > 0) {
      this.workExpReferences.map((workExp) => {
        this.usersService
          .updateExperiencesByUserId(workExp.instance.experienceData)
          .subscribe({
            error: (err) =>
              console.log(
                'Erro ao atualizar experiência profissional do usuário: ',
                err
              ),
          });
      });
    }

    const firstExpEducation: Experience =
      this.expEducation.experienceForm.getRawValue();
    if (firstExpEducation.experienceId > 0) {
      this.usersService.updateExperiencesByUserId(firstExpEducation).subscribe({
        error: (err) =>
          console.log(
            'Erro ao atualizar experiência acadêmica do usuário: ',
            err
          ),
      });
    }

    if (this.educationExpReferences.length > 0) {
      this.educationExpReferences.map((educationExp) => {
        this.usersService
          .updateExperiencesByUserId(educationExp.instance.experienceData)
          .subscribe({
            error: (err) =>
              console.log(
                'Erro ao atualizar experiência acadêmica do usuário: ',
                err
              ),
          });
      });
    }

    const firstSkill: Skill = this.skillFirstForm.skillForm.getRawValue();
    if (firstSkill.skillId > 0) {
      this.usersService.updateSkillsByUserId(firstSkill).subscribe({
        error: (err) =>
          console.log('Erro ao atualizar competência do usuário: ', err),
      });
    }

    if (this.skillsReferences.length > 0) {
      this.skillsReferences.map((skillRef) => {
        this.usersService
          .updateSkillsByUserId(skillRef.instance.skillData)
          .subscribe({
            error: (err) =>
              console.log('Erro ao atualizar competência do usuário: ', err),
          });
      });
    }

    const socialMedia: SocialMedia =
      this.socialMediaData.socialMediaForm.getRawValue();
    this.usersService.updateSocialMediaByUserId(socialMedia).subscribe({
      error: (err) =>
        console.log('Erro ao atualizar as redes sociais do usuário: ', err),
    });

    if (this.componentsToDelete.length > 0) {
      this.componentsToDelete.map((component: any) => {
        if (component.type == 'experience') {
          this.usersService.deleteExperience(component.id).subscribe({
            error: (err) => console.log('Erro ao excluir experiência: ', err),
          });
        } else {
          this.usersService.deleteSkill(component.id).subscribe({
            error: (err) => console.log('Erro ao excluir competência: ', err)
          });
        }
      });
    }
  }
}
