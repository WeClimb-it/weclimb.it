import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentType } from 'src/app/utils/ContentType';

@Component({
  selector: 'wci-base-item',
  template: '<div></div>',
})
export class BaseListItemComponent {
  protected itemSection: ContentType;

  constructor(protected router: Router) {}

  /**
   *
   */
  goToDetailUrl(slug: string) {
    this.router.navigate([this.itemSection, slug]);
  }
}
