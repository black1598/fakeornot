import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './file-upload/file-upload.component.html',
  styleUrls: ['./file-upload/file-upload.component.scss']
})
export class AppComponent {
// Main task 
task: AngularFireUploadTask;

// Progress monitoring
percentage: Observable<number>;

snapshot: Observable<any>;

// Download URL
downloadURL: Observable<string>;

// State for dropzone CSS toggling
isHovering: boolean;

  title = 'app';

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  
   toggleHover(event: boolean) {
    this.isHovering = event;
  }


   startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

  

    // The main task
    this.task = this.storage.upload(path, file,)

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(snap => {
        console.log(snap)
        if (snap.bytesTransferred === snap.totalBytes) {
          // Update firestore on completion
          this.db.collection('photos').add( { path, size: snap.totalBytes })
        }
      })
    )


    // The file's download URL
    this.downloadURL = this.task.downloadURL(); 
  }



  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  
}
