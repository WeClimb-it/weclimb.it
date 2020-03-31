import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentType } from 'src/app/utils/ContentType';
import { Poi } from 'src/app/utils/Poi';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaPlayerComponent } from 'src/app/components/media-player/media-player.component';

@Component({
  selector: 'wci-base-item',
  template: '<div></div>',
})
export class BaseListItemComponent {
  protected itemSection: ContentType;

  constructor(protected router: Router, public dialog: MatDialog) {}

  /**
   *
   */
  goToDetailUrl(slug: string) {
    this.router.navigate([this.itemSection, slug]);
  }

  /**
   *
   */
  openMediaDialog(item: Poi): void {
    this.dialog.open(MediaPlayerComponent, {
      panelClass: 'media-dialog',
      data: item,
    });
  }
}
