import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-edit-exec-kpa',
  templateUrl: './edit-exec-kpa.component.html',
  styleUrls: ['./edit-exec-kpa.component.scss']
})
export class EditExecKpaComponent implements OnInit {

  public editableRow: { id: string, name: string, description: string, userId: string };
  public saveButtonClicked: Subject<any> = new Subject();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required)
  });

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.form.controls['id'].patchValue(this.editableRow.id);
      this.form.controls['name'].patchValue(this.editableRow.name);
      this.form.controls['description'].patchValue(this.editableRow.description);
      this.form.controls['userId'].patchValue(this.editableRow.userId);
  }

  editRow() {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

  get name() { return this.form.get('name'); }

    get description() { return this.form.get('description'); }

    get userId() { return JSON.parse(localStorage.getItem('currentUser')).firstName; }

}
