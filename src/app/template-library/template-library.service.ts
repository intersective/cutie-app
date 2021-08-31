import { Injectable, NgZone } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';
import { RequestService } from '../shared/request/request.service';
import { Observable } from 'rxjs/Observable';
import { urlFormatter } from 'helper';

export interface Template {
  uuid: string;
  name: string;
  description?: string;
  leadImageUrl?: string;
  leadVideoUrl?: string;
  type?: string;
  attributes?: string[];
  designMapUrl?: string;
  operationsManualUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  leadImage: string;
  color: string;
  isLarge: boolean;
}

export interface CategorisedTemplates {
  category: Category;
  templates: Template[];
}

export interface ImportExperienceResponse {
  experienceUuid: string;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateLibraryService {

  constructor(
    private request: RequestService,
    private demo: DemoService,
    private _zone: NgZone
  ) { }

  getTemplates(): Observable<Template[]> {
    if (environment.demo) {
      return this.demo.getTemplates().pipe(map(this._handleTemplates));
    }
    return this.request.graphQLQuery(
      `query templates {
        templates {
          uuid
          name
          description
          leadImageUrl
          type
        }
      }`,
      {}
    ).pipe(map(this._handleTemplates));
  }

  getTemplatesByCategory(category: string): Observable<Template[]> {
    if (environment.demo) {
      return this.demo.getTemplates().pipe(map(this._handleTemplates));
    }
    return this.request.graphQLQuery(
      `query templates($type: String) {
        templates(type: $type) {
          uuid
          name
          description
          leadImageUrl
          leadVideoUrl
          type
        }
      }`,
      {
        type: category
      }
    ).pipe(map(this._handleTemplates));
  }

  getTemplatesByFilter(filter: string): Observable<Template[]> {
    if (environment.demo) {
      return this.demo.getTemplates().pipe(map(this._handleTemplates));
    }
    return this.request.graphQLQuery(
      `query templates($filter: String) {
        templates(filter: $filter) {
          uuid
          name
          description
          leadImageUrl
          leadVideoUrl
          type
        }
      }`,
      {filter}
    ).pipe(map(this._handleTemplates));
  }

  getTemplate(uuid: string): Observable<Template> {
    if (environment.demo) {
      return this.demo.getTemplate().pipe(map(this._handleTemplate));
    }
    return this.request.graphQLQuery(
      `query template($uuid: ID!) {
        template(uuid: $uuid) {
          uuid
          name
          description
          leadImageUrl
          leadVideoUrl
          type
          attributes
          designMapUrl
          operationsManualUrl
        }
      }`,
      {uuid}
    ).pipe(map(this._handleTemplate));
  }

  importExperience(templateUuid: string): Observable<ImportExperienceResponse> {
    if (environment.demo) {
      return this.demo.importExperience().pipe(map(this._handleImportedExperienceResponse));
    }
    return this.request.graphQLMutate(
      `mutation importExperience($templateUuid: ID!) {
        importExperience(templateUuid: $templateUuid) {
          experienceUuid
        }
      }`,
      {templateUuid}
    ).pipe(map(this._handleImportedExperienceResponse));
  }

  private _handleImportedExperienceResponse(res) {
    if (!res || !res.data) {
      return null;
    }
    return res.data.importExperience;
  }

  importExperienceUrl(templateUuid: string): Observable<string> {
    if (environment.demo) {
      return this.demo.importExperienceUrl(templateUuid).pipe(map(this._handleImportedExperienceUrlResponse));
    }
    return this.request.graphQLQuery(
      `query importExperienceUrl($templateUuid: ID!) {
        importExperienceUrl(templateUuid: $templateUuid)
      }`,
      { templateUuid }
    ).pipe(map(this._handleImportedExperienceUrlResponse));
  }

  private _handleImportedExperienceUrlResponse(res): string {
    if (!res || !res.data) {
      return null;
    }
    return res.data.importExperienceUrl;
  }

  createExperienceSSE(url: string): Observable<{ progress?: number; redirect?: string }> {
    return Observable.create(observer => {
      const eventSource = new EventSource(url);
      eventSource.onopen = () => { console.log('connection open'); };
      eventSource.onmessage = (message) => {
        const messageData = JSON.parse(message.data);
        if (messageData.progress) {
          this._zone.run(() => {
            observer.next({ progress: messageData.progress });
          });
        }
        if (messageData.experienceUuid) {
          eventSource.close();
          this._zone.run(() => {
            observer.next({ redirect: urlFormatter(environment.Practera, `/users/change/experience/${messageData.experienceUuid}?redirect=/design`) });
          });
        }
      };
      eventSource.onerror = (err) => {
        console.error('connection failed', err);
        eventSource.close();
        this._zone.run(() => {
          observer.error();
        });
      };
    });
  }

  private _handleTemplate(res) {
    // we are using Apollo client cache, so it will return undefined initially, we should treat this as we are still loading the data
    if (!res || !res.data) {
      return null;
    }
    return res.data.template;
  }

  private _handleTemplates(res) {
    // we are using Apollo client cache, so it will return undefined initially, we should treat this as we are still loading the data
    if (!res || !res.data) {
      return null;
    }
    return res.data.templates;
  }

  getCategories(): Category[] {
    return [
      {
        'leadImage': '/assets/template-library/teamProjects.png',
        'name': 'Team Projects',
        'id': 'Team Project',
        'description': 'Create teams of learners who complete a project with multiple feedback loops from industry experts\n' +
          'Use and edit our pre-loaded content with step by step instructions used by more than 10,000 students. Team-based project require a client brief and someone to provide feedback for each learner team (If you don’t have projects for your learners, send us a note!)',
        'color': 'rgba(0,64,229, 0.7)',
        'isLarge': true
      },
      {
        'leadImage': '/assets/template-library/internship.png',
        'name': 'Internships',
        'id': 'Internship',
        'description': 'Monitor and quality assure your (virtual) internship program at scale with our fully editable content with step by step instructions used by more than 10,000 students. Use our step by step instructions for both intern and supervisor to engage in regular feedback, reflection and planning loops. Internships require a placement and supervisor to provide feedback for each learner.',
        'color': 'rgba(85, 2, 136, 0.7)',
        'isLarge': true
      },
      {
        'leadImage': '/assets/template-library/simulation.png',
        'name': 'Work Simulations',
        'id': 'Work Simulation',
        'description': 'Scaling authentic work-integrated learning experiences is hard - but did you know that you can simulate real world tasks in an authentic way that gives students an insight into their potential future job? We have created a range of realistic and authentic work simulation experiences that students love!',
        'color': 'rgba(229, 69, 0, 0.7)',
        'isLarge': true
      },
      {
        'leadImage': '/assets/template-library/mentoring.png',
        'name': 'Mentoring',
        'id': 'Mentoring',
        'description': 'Support mentees and mentors engage in a structured mentoring relationship. Our fully editable pre-loaded content comes with step by step instructions for both mentor and mentee to engage in regular feedback, reflection and planning loops. Mentoring experiences require pairs or groups of mentors and mentees.',
        'color': 'rgba(221, 0, 59, 0.7)',
        'isLarge': false
      },
      {
        'leadImage': '/assets/template-library/accelerators.png',
        'name': 'Accelerators',
        'id': 'Accelerator',
        'description': 'Run your accelerator program effectively and efficiently with our editable pre-loaded content with step by step instructions. Support teams of learners go through an innovation process with multiple feedback loops and manage quality assurance for your cohort to guarantee success.',
        'color': 'rgba(37, 105, 120, 0.7)',
        'isLarge': false
      },
      {
        'leadImage': '/assets/template-library/skillsPortfolio.png',
        'name': 'Skills Portfolios',
        'id': 'Skills Portfolio',
        'description': 'With our Skills Portfolio experiences, you can support learners to build portfolios of their real world learning experiences and achievements against competency frameworks. You can use any competency framework and drive skill development tracking with reflective learning and feedback loops.',
        'color': 'rgba(9, 129, 7, 0.7)',
        'isLarge': false
      },
      {
        'leadImage': '/assets/template-library/other.jpg',
        'name': 'Others',
        'id': 'Other',
        'description': 'Practera supports any type of experiential learning. Below are some examples of other experiences our customers have used in the past.',
        'color': 'rgba(69, 40, 48, 0.7)',
        'isLarge': false
      }
    ];
  }

}
