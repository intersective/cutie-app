import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';

export interface Experience {
  id?: number;
  uuid: string;
  name: string;
  description: string;
  type: string;
  status: string;
  leadImage: string;
  setupStep: string;
  tags: string[];
  todoItemCount: number;
  statistics: Statistics;
}

export interface Tag {
  name: string;
  active?: boolean;
  count?: number;
}

export interface Statistics {
  enrolledUserCount: UserCount;
  registeredUserCount: UserCount;
  activeUserCount: UserCount;
  feedbackLoopStarted: number;
  feedbackLoopCompleted: number;
  reviewRatingAvg: number;
  onTrackRatio: number;
  lastUpdated: number;
}

export interface UserCount {
  admin: number;
  coordinator: number;
  mentor: number;
  participant: number;
}

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(
    private request: RequestService,
    private demo: DemoService
  ) { }

  getExperiences() {
    if (environment.demo) {
      return this.demo.getExperiences().pipe(map(this._handleExperiences));
    }
    return this.request.graphQLQuery(
      `query experiences {
        experiences {
          uuid
          name
          description
          type
          leadImage
          status
          setupStep
          tags{
            name
          }
          todoItemCount
          statistics{
            enrolledUserCount {
              admin
              coordinator
              mentor
              participant
            }
            registeredUserCount{
              admin
              coordinator
              mentor
              participant
            }
            activeUserCount{
              admin
              coordinator
              mentor
              participant
            }
            feedbackLoopStarted
            feedbackLoopCompleted
            reviewRatingAvg
            onTrackRatio
            lastUpdated
          }
        }
      }`
    ).pipe(map(this._handleExperiences));
  }

  private _handleExperiences(res) {
    if (!res.data) {
      return [];
    }
    return res.data.experiences.map(exp => {
      return {
        ...exp,
        ...{
          tags: exp.tags.map(t => t.name)
        }
      };
    })
  }

}
