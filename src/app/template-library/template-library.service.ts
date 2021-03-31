import { Injectable } from '@angular/core';
import {Statistics} from '../overview/overview.service';
import {map} from 'rxjs/operators';
import { environment } from '@environments/environment';
import { DemoService } from '@services/demo.service';
import {RequestService} from '../shared/request/request.service';
import {Observable} from 'rxjs/Observable';

export interface Template {
  uuid: string;
  name: string;
  description?: string;
  leadImageUrl?: string;
  leadVideoUrl?: string;
  institutionUUID: string;
  isPublic?: boolean;
  experienceType?: string;
  attributes: string[];
  modified?: string;
}

export interface Category {
  name: string;
  experienceType: string;
  leadImage: string;
  color: string;
  size: Size;
}

export interface CategorisedTemplates {
  category: Category;
  templates: Template[];
}

enum Size {
  'LARGE', 'SMALL'
}

@Injectable({
  providedIn: 'root'
})
export class TemplateLibraryService {

  constructor(
    private request: RequestService,
    private demo: DemoService,
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
          leadVideoUrl
          institutionUUID
          isPublic
          experienceType
          attributes {
            name
          }
          modified
        }
      }`,
      {},
      {
        noCache: true,
      }
    ).pipe(map(this._handleTemplates));
  }

  private _handleTemplates(res) {
    if (!res.data) {
      return [];
    }
    return res.data.templates.map(template => {
      return {
        ...template,
        ...{
          attributes: template.attributes.map(t => t.name)
        }
      };
    });
  }

  getCategories(): Category[] {
    return [
      {
        'leadImage': '',
        'name': 'Team Projects',
        'experienceType': 'team project',
        'color': 'rgba(0,64,229, 0.7)',
        'size': Size.LARGE
      },
      {
        'leadImage': '',
        'name': 'Internships',
        'experienceType': 'internship',
        'color': 'rgba(85, 2, 136, 0.7)',
        'size': Size.LARGE
      },
      {
        'leadImage': '',
        'name': 'Simulations',
        'experienceType': 'simulation',
        'color': 'rgba(229, 69, 0, 0.7)',
        'size': Size.LARGE
      },
      {
        'leadImage': '',
        'name': 'Mentoring',
        'experienceType': 'mentoring',
        'color': 'rgba(221, 0, 59, 0.7)',
        'size': Size.SMALL
      },
      {
        'leadImage': '',
        'name': 'Accelerators',
        'experienceType': 'accelerator',
        'color': 'rgba(37, 105, 120, 0.7)',
        'size': Size.SMALL
      },
      {
        'leadImage': '',
        'name': 'Skills Portfolios',
        'experienceType': 'skill portfolio',
        'color': 'rgba(9, 129, 7, 0.7)',
        'size': Size.SMALL
      },
      {
        'leadImage': '',
        'name': 'Others',
        'experienceType': 'other',
        'color': 'rgba(69, 40, 48, 0.7)',
        'size': Size.SMALL
      }
    ];
  }

}
