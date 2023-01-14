import { CurriculoRoutingModule } from './curriculo-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CurriculoComponent } from './curriculo.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideSectionComponent } from './components/side-section/side-section.component';
import { CoreSectionComponent } from './components/core-section/core-section.component';
import { IconTextComponent } from './components/icon-text/icon-text.component';
import { SkillLevelComponent } from './components/skill-level/skill-level.component';
import { InfoTextComponent } from './components/info-text/info-text.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    CurriculoComponent,
    FooterComponent,
    SideSectionComponent,
    CoreSectionComponent,
    IconTextComponent,
    SkillLevelComponent,
    InfoTextComponent,
    ContactFormComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurriculoRoutingModule
  ]
})
export class CurriculoModule { }
