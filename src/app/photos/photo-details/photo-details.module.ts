import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { RouterModule } from '@angular/router';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';
import { ShowIfLoggedModule } from 'src/app/shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
    declarations: [
        PhotoDetailsComponent,
        PhotoCommentsComponent,
        PhotoOwnerOnlyDirective
    ],
    exports: [
        PhotoDetailsComponent,
        PhotoCommentsComponent
    ],
    imports: [
        CommonModule,
        PhotoModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        VMessageModule,
        ShowIfLoggedModule
    ]
})
export class PhotoDetailsModule {}