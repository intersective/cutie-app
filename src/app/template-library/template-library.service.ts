import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {DemoService} from '@services/demo.service';
import {RequestService} from '../shared/request/request.service';
import {Observable} from 'rxjs/Observable';
import {UtilsService} from '../shared/services/utils.service';

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
  name: string;
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
  ) { }

  static isInCategory(templateType: string, categoryType: string): boolean {
    return UtilsService.removeAllSpecialCharactersAndToLower(templateType) === UtilsService.removeAllSpecialCharactersAndToLower(categoryType);
  }

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
      return this.demo.importExperienceResponse().pipe(map(this._handleImportedExperienceResponse));
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
    return res.data;
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
        'leadImage': '',
        'name': 'Team Projects',
        'color': 'rgba(0,64,229, 0.7)',
        'isLarge': true
      },
      {
        'leadImage': '',
        'name': 'Internships',
        'color': 'rgba(85, 2, 136, 0.7)',
        'isLarge': true
      },
      {
        'leadImage': '',
        'name': 'Simulations',
        'color': 'rgba(229, 69, 0, 0.7)',
        'isLarge': true
      },
      {
        'leadImage': '',
        'name': 'Mentoring',
        'color': 'rgba(221, 0, 59, 0.7)',
        'isLarge': false
      },
      {
        'leadImage': '',
        'name': 'Accelerators',
        'color': 'rgba(37, 105, 120, 0.7)',
        'isLarge': false
      },
      {
        'leadImage': '',
        'name': 'Skills Portfolios',
        'color': 'rgba(9, 129, 7, 0.7)',
        'isLarge': false
      },
      {
        'leadImage': '',
        'name': 'Others',
        'color': 'rgba(69, 40, 48, 0.7)',
        'isLarge': false
      }
    ];
  }

}
