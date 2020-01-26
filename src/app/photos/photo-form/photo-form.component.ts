import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _photoService: PhotoService,
    private _router: Router,
    private _alertService: AlertService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.photoForm = this._formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    
    this._photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => {
        this._alertService.success('Upload complete', true);
        this._router.navigate(['/user', this._userService.getUserName()]);
      });
  }

  handleFile(file: File) {
    this.file = file;

    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
