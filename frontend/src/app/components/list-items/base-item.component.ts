import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeoLocation } from 'src/app/classes/geolocation.class';
import { MediaPlayerComponent } from 'src/app/components/media-player/media-player.component';
import { ContentType } from 'src/app/utils/ContentType';
import { Poi } from 'src/app/utils/Poi';

@Component({
  selector: 'wci-base-item',
  template: '<div></div>',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BaseListItemComponent {
  @Input() currentLocation: GeoLocation;
  @Input() userLocation: GeoLocation;
  @Input() showCategory: boolean;

  // Used to construct the url of the detail page
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
      data: {
        item,
        openDetail: (slug: string) => {
          this.dialog.closeAll();
          this.goToDetailUrl(slug);
        },
      },
    });
  }
}
