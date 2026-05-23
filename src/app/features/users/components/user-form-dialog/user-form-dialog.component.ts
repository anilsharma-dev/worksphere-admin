import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss'
})
export class UserFormDialogComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,

    private dialogRef:
      MatDialogRef<UserFormDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {

    this.form = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      role: [
        '',
        Validators.required
      ]

    });

    if(data) {
      this.form.patchValue(data);
    }

  }

  save() {

    if(this.form.invalid) {
      return;
    }

    this.dialogRef.close(
      this.form.value
    );

  }

}