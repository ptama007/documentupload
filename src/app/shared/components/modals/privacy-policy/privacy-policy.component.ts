import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface PrivacyPolicyModal {
  title: string;
  message: string;
  positive?: string;
  negative?: string;
  danger?: string;
  animation?: boolean;
}

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent extends SimpleModalComponent<PrivacyPolicyModal, boolean> implements PrivacyPolicyModal {
  title: string;
  message: string;
  danger?: string;
  positive?: string;
  negative?: string;
  animation?: boolean;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.close();
  }

}
