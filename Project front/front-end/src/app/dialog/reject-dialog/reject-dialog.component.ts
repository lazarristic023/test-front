import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reject-dialog',
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.css']
})
export class RejectDialogComponent implements OnInit{

  rejectForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RejectDialogComponent>
  ) { }

  ngOnInit(): void {
    this.rejectForm = this.formBuilder.group({
      reason: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.rejectForm.valid) {
      this.dialogRef.close(this.rejectForm.value.reason);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
