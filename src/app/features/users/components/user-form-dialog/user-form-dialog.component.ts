import {
  Component,
  Inject
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl:
    './user-form-dialog.component.html',

  styleUrl:
    './user-form-dialog.component.scss'
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

      this.form.patchValue({
        name: data.name,
        email: data.email,
        role: data.role
      });

    }

  }

  save() {

    if(this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.dialogRef.close(
      this.form.value
    );

  }

}