import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContentType } from 'src/app/utils/ContentType';
import { Poi } from 'src/app/utils/Poi';
import { GeoLocation } from 'src/app/classes/geolocation.class';

@Component({
  selector: 'wci-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetailCardComponent {
  @Input() type: ContentType;
  @Input() data: Poi;
  @Input() currentLocation: GeoLocation;
  @Input() userLocation: GeoLocation;
  @Input() loading: boolean;
  @Input() errored: boolean;

  constructor(private router: Router) {}

  /**
   *
   */
  close(): void {
    this.router.navigate(['/']);
  }
}
