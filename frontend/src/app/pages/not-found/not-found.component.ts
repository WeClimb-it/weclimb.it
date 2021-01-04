import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'wci-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
