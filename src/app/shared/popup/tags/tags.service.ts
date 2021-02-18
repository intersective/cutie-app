import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';
import { UtilsService } from '@services/utils.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(
    private demo: DemoService,
    private utils: UtilsService,
  ) {}

  getTagsBy(term: string) {
    if (environment.demo) {
      return this.demo.getTags();
    }
  }

  updateExperienceTags(experience, tags: string[]) {
    if (environment.demo) {
      return this.demo.updateExperienceTags(experience, tags).pipe(map(res => {
        this.utils.broadcastEvent('exp-tags-updated', { experience, tags });
        return res;
      }));
    }
  }

}
