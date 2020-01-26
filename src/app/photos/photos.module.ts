import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';
import { DarkenOnHoverModule } from '../shared/directives/darken-on-hover/darken-on-hover.module';

@NgModule({
    declarations: [],
    imports: [ 
        PhotoModule,
        PhotoFormModule,
        PhotoListModule,
        RouterModule,
        DarkenOnHoverModule,
        PhotoDetailsModule
    ]
})
export class PhotosModule {}