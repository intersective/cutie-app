import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: 'tags.component.html',
  styleUrls: ['tags.component.scss']
})
export class TagsComponent {
  title = '';
  tags: string[] = [];
  // type of the tags - where is this component used
  type: string;
  // the related data
  data: any;

  newTag: string;

  constructor(
    private service: TagsService,
    public modalController: ModalController,
  ) {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => {
        if (term.length < 2) {
          return [];
        }
        return this.service.getTagsBy(term).pipe(map(tags => {
          // put the term itself at the top
          if (tags.includes(term)) {
            tags.splice(tags.indexOf(term), 1);
          }
          return [...[term], ...tags];
        }));
      })
    )

  selected($e) {
    $e.preventDefault();
    const item = $e.item.toLowerCase();
    if (!this.tags.includes(item)) {
      this.tags.push(item);
    }
    this.newTag = '';
  }

  remove(item) {
    this.tags.splice(this.tags.indexOf(item), 1);
  }

  confirmed(save: boolean) {
    if (save) {
      switch (this.type) {
        case 'experience':
          if (JSON.stringify(this.tags) !== JSON.stringify(this.data.tags)) {
            this.service.updateExperienceTags(this.data, this.tags).subscribe();
          }
          break;
      }
    }
    return this.modalController.dismiss();
  }

}
