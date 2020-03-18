import { Component, OnInit, Input } from '@angular/core';
import { Crag } from 'src/app/interfaces/graphql/crag.type';

@Component({
  selector: 'wci-crag-list-item',
  templateUrl: 'crag-item.component.html',
  styleUrls: ['../common.scss'],
})
export class CragListItemComponent implements OnInit {
  @Input() data: Crag;

  currentMonth = new Date().getMonth();

  constructor() {}

  ngOnInit() {}
}
