import { Injectable } from '@angular/core';
import { RequestService } from '@shared/request/request.service';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';

export interface Experience {
  uuid: string;
  name: string;
  description: string;
  type: string;
  status: string;
  leadImage: string;
  setupStep: string;
  tags: Tag[];
  todoItemCount: number;
  statistics: Statistics;
}

export interface Tag {
  id: number;
  name: string;
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
      return this.demo.getExperiences();
    }

  }

}
