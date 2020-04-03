import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MediaPlayerComponent } from 'src/app/components/media-player/media-player.component';
import { ContentType } from 'src/app/utils/ContentType';
import { Poi } from 'src/app/utils/Poi';

@Component({
  selector: 'wci-base-item',
  template: '<div></div>',
})
export class BaseListItemComponent {
  // Used to consturct the url of the detail page
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
