import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searching: boolean;
  searchValue: string;
  @Input() title: string;
  // has search button
  @Input() hasSearch = false;
  // has go back button
  @Input() hasBack = false;
  // has send message button
  @Input() hasSend = false;
  // search event
  @Output() search = new EventEmitter<string>();
  // go back event
  @Output() back = new EventEmitter<null>();
  // send message event
  @Output() send = new EventEmitter<null>();
  @ViewChild('searchRef', { static: false }) searchRef: IonInput;
  constructor(
  ) { }

  ngOnInit() {
    this.searching = false;
    this.searchValue = '';
  }

  // toggle the search bar
  doSearch() {
    this.searching = !this.searching;
    this.searchValue = '';
    if (this.searching) {
      // start searching
      setTimeout(
        () => {
          this.searchRef.setFocus();
        },
        500
      );
    } else {
      // finish searching
      this.onSearch();
    }
  }

  onSearch() {
    this.search.emit(this.searchValue);
  }

  goBack() {
    this.back.emit();
  }

  onSend() {
    this.send.emit();
  }
}
