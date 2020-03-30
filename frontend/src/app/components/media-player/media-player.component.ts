import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'wci-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent {
  selectedIndex = 0;

  constructor(public dialogRef: MatDialogRef<MediaPlayerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  selectMedia(index: number): void {
    this.selectedIndex = index;
  }
}
