import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-edit-characteristic',
  templateUrl: './edit-characteristic.component.html',
  styleUrls: ['./edit-characteristic.component.scss']
})
export class EditCharacteristicComponent implements OnInit {

  public editableRow: { id: string, description: string};
  public saveButtonClicked: Subject<any> = new Subject();

  public form: FormGroup = new FormGroup({
    id: new FormControl({value: '', disabled: true}),
    description: new FormControl('', Validators.required)
  });

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.form.controls['id'].patchValue(this.editableRow.id);
      this.form.controls['description'].patchValue(this.editableRow.description);
  }

  editRow() {
    this.editableRow = this.form.getRawValue();
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

    get description() { return this.form.get('description'); }

}
