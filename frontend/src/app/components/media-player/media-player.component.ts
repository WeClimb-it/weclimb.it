import { Component, Inject, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Poi } from 'src/app/utils/Poi';

@Component({
  selector: 'wci-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPlayerComponent {
  selectedIndex = 0;

  constructor(
    public dialogRef: MatDialogRef<MediaPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: any; openDetail: (slug: string) => void },
  ) {}

  /**
   *
   */
  selectMedia(index: number): void {
    this.selectedIndex = index;
  }

  /**
   *
   */
  goToDetail(slug: string): void {
    this.data.openDetail(slug);
  }
}
