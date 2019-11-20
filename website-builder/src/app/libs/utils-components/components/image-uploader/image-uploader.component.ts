import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { fromEvent, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

/*
* All methods related to upload functionality placed in component itself,
* not in any facade service
* */
@Component({
  selector: 'wb-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploaderComponent implements OnInit {
  @ViewChild('uploadImageDialog', { static: true }) uploadImageDialog: TemplateRef<any>;
  @Input() image: string = null;
  @Input() withLink = false;
  @Output() uploadEvent = new EventEmitter<string>();
  dialogRef: MatDialogRef<any>;
  subscriptions: Subscription[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openUploadImageDialog() {
    this.dialogRef = this.dialog.open(this.uploadImageDialog, {
      width: '820px',
      height: '720px'
    });

    /* uploader area element */
    const area = document.getElementsByClassName('image-uploader-dialog')[0];

    /* all operations related to drag and drop events */
    this.preventDefaultOnDragEvents(area);
    this.addUiDragOverFeedback(area);
    this.addUiDragLeaveFeedback(area);
    this.handleDrop(area);

    /* unsubscribe from all subscriptions after dialog will be closed */
    this.dialogRef.afterClosed()
      .pipe(
        first()
      )
      .subscribe(() => {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
      });
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  /* Prevent default behavior on all events */
  preventDefaultOnDragEvents(area: Element) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      const subscription = fromEvent(area, eventName).subscribe(e => this.preventDefaults(e));

      this.subscriptions.push(subscription);
    });
  }

  /* add additional css class on dragover and dragenter events */
  addUiDragOverFeedback(area: Element) {
    ['dragenter', 'dragover'].forEach((eventName) => {
      const subscription = fromEvent(area, eventName).subscribe(() => area.classList.add('highlight'));

      this.subscriptions.push(subscription);
    });
  }

  /* remove additional css class on drop and dragleave events */
  addUiDragLeaveFeedback(area) {
    ['dragleave', 'drop'].forEach((eventName) => {
      const subscription = fromEvent(area, eventName).subscribe(() => area.classList.remove('highlight'));

      this.subscriptions.push(subscription);
    });
  }

  /* handle drop event and upload file */
  handleDrop(area) {
    const subscription = fromEvent(area, 'drop')
      .subscribe((e: DragEvent) => {
        const dt = e.dataTransfer;
        const file = dt.files;

        this.handleUploadImage(file[0]);
      });

    this.subscriptions.push(subscription);
  }

  /* parse file to base64 and emitting it up for saving it in store */
  handleUploadImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.uploadEvent.emit(reader.result as string);

      /* close dialog after file will be uploaded */
      this.dialogRef.close();
    };
  }

  removeImage() {
    this.uploadEvent.emit(null);
  }
}
