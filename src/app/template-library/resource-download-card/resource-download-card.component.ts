import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-resource-download-card',
  templateUrl: './resource-download-card.component.html',
  styleUrls: ['./resource-download-card.component.scss'],
})
export class ResourceDownloadCardComponent implements OnInit {

  @Input() skeleton: false;
  @Input() prompt: string;
  @Input() leadImage: string;
  @Input() src: string;

  resource = {
    name: 'Download Design Map',
    leadImage: 'https://images.pexels.com/photos/389819/pexels-photo-389819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    src: '/assets.logo.svg'
  };

  constructor() { }

  ngOnInit() {}

}
