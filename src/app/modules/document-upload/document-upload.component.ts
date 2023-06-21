import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { SimpleModalService } from 'ngx-simple-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PrivacyPolicyComponent } from 'src/app/shared/components/modals/privacy-policy/privacy-policy.component';
import { UsersService } from '../users/users.service';
import { environment } from './../../../../src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})

/**
 * DocumentUploadComponent class
 *
 * The component class manage the document upload.
 */
export class DocumentUploadComponent implements OnInit {
  uploadValidation: any = true;
  params: any;
  warningMessage: any = "";
  files: any[] = [];
  userDetail: any = {};
  continueToUpload: boolean = false;

  constructor(public sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private toastrService: ToastrService,
    private simpleModalService: SimpleModalService,
  ) {
    this.params = this.route.snapshot.params;
    var a: any = moment(new Date()).startOf('day');
    var b = moment(this.usersService.dec(this.params['expiredOn'])).startOf('day');
    var days = a.diff(b, 'days');
    
    if (days > environment.linkExpiredAfter) {
      this.usersService.textFor404 = "The link you have followed has expired.";
      this.router.navigate(['expired']);
      return;
    }

    if (!Object.keys(this.params).length) {
      this.uploadValidation = false;
    }

    this.userDetail = {
      firstName: this.usersService.dec(this.params['firstName']),
      lastName: this.usersService.dec(this.params['lastName']),
      paymentCode: this.usersService.dec(this.params['paymentCode'])
    };
  }

  formData = new FormData();

  ngOnInit(): void {
    
  }

  /**
   * Checks change detection, invoked after the default change detector runs.
   *
   * @param void
   * @return void
   * @public
   */
  ngDoCheck() {
    if (this.userDetail.firstName && this.userDetail.lastName && this.userDetail.paymentCode) {
      this.uploadValidation = false;
    } else {
      this.uploadValidation = true;
    }
  }

  /**
   * Check validation for input fields.
   *
   * @param void
   * @return void
   * @public
   */
  checkValidation() {
    return new Promise((resolve, reject) => {
      if (this.userDetail.firstName && this.userDetail.lastName && this.userDetail.paymentCode) {
        if (
          this.userDetail.firstName.toLowerCase() != this.usersService.dec(this.params['firstName']).toLowerCase() ||
          this.userDetail.lastName.toLowerCase() != this.usersService.dec(this.params['lastName']).toLowerCase() ||
          this.userDetail.paymentCode != this.usersService.dec(this.params['paymentCode'])
        ) {
          this.warningMessage = "Error: Entered values are incorrect!";
          this.uploadValidation = true;
        } else {
          this.uploadValidation = false;
          this.warningMessage = "";
          resolve(true);
        }
      }
    });
  }

  /**
   * Delete the files from the file list.
   *
   * @param {Number} : index
   * @return void
   * @public
   */
  public fileLeave(file: any) {
    let index = this.files.indexOf(file);
    this.files.splice(index, 1);
  }

  /**
   * Drag and drop the files.
   *
   * @param {NgxFileDropEntry[]} : file
   * @return void
   * @public
   */
  public onFileDropped(file: NgxFileDropEntry[]) {
    this.prepareFilesList(file);
  }

  /**
   * Simulate the upload files process.
   *
   * @param {Number} : index
   * @return void
   * @public
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 10);
      }
    }, 100);
  }

  /**
   * Convert Files list to normal array list.
   *
   * @param {Array<any>} : files
   * @return void
   * @public
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * Append the formData with drag & drop and browse of files.
   *
   * @param {NgxFileDropEntry[]} : file
   * @return {Promise} : resolve
   * @public
   */
  prepareFormData(files: NgxFileDropEntry[]) {
    return new Promise((resolve) => {
      for (let index = 0; index < files.length; index++) {
        const droppedFile = files[index];
        // IS IT A FILE?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file(async (file: File) => {
            // HERE YOU CAN ACCESS THE REAL FILE
            this.formData.append('files', file, droppedFile.relativePath);
            if (index == this.files.length - 1) {
              resolve(true);
            }
          });
        } else {
          // IT WAS A DIRECTORY (EMPTY DIRECTORIES ARE ADDED, OTHERWISE ONLY FILES)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        }
      }
    });
  }

  /**
   * Upload the files.
   *
   * @param {NgxFileDropEntry[]} : file
   * @return void
   * @public
   */
  async onSubmit(file: NgxFileDropEntry[]) {
    this.toastrService.clear();
    this.formData = new FormData();
    this.files = file;
    await this.checkValidation();
    await this.prepareFormData(file);

    this.spinner.show();
    let message = `<body> 
      <br> 
      Dear <b>Admin,</b> 
      <br> <br> 
      Documents have been uploaded successfully with below details: <br>
      First Name: <b>${this.userDetail.firstName}</b> <br>
      Last Name: <b>${this.userDetail.lastName}</b> <br>
      Payment Code: <b>${this.userDetail.paymentCode}</b>
      <br><br> 
    </body>`;

    this.formData.append('to', JSON.stringify(environment.emailSendTo));
    this.formData.append('subject', 'Millennia Uploaded Documents');
    this.formData.append('message', message);

    setTimeout(() => {
      this.usersService.sendMail(this.formData).subscribe((res: any) => {
        this.spinner.hide();
        if (res.status == 200) {
          this.toastrService.success('Documents uploaded successfully.');
          let randomString = this.usersService.randomString();
          this.router.navigate(['/thankyou', randomString]);
        } else {
          this.toastrService.error("File size must be less than 25MB", "", {
            timeOut: 10000,
            extendedTimeOut: 0,
            disableTimeOut: true
          });
        }
        this.spinner.hide();
      }, (error: any) => {
        this.toastrService.error('Something went wrong!');
        this.spinner.hide();
      });
    }, 3000);
  }

  openPrivacyModal() {
    this.simpleModalService.addModal(PrivacyPolicyComponent, {
      title: 'Privacy Policy',
      message: ''
    }).subscribe(res => {
      // DO SOMTHING
    });
  }

  cancel() {
    this.continueToUpload = false;
    window.close();
  }

  continue() {
    this.continueToUpload = true;
  }
}
