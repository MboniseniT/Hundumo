import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from "ng-uikit-pro-standard";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss']
})
export class AreYouSureComponent implements OnInit {

  public editableRow: { message:string };
  public saveButtonClicked: Subject<any> = new Subject();

  message:string;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.message = this.editableRow.message;
  }

  editRow() {
    this.saveButtonClicked.next(this.editableRow);
    this.modalRef.hide();
  }

}
