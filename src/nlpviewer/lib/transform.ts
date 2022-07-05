/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ISinglePack,
  IOntology,
  IAnnotation,
  ILink,
  IProjectConfigs,
} from './interfaces';
import {camelCaseDeep} from './utils';

export function transformPack(
  rawPack: string,
  rawOntology: string
): [ISinglePack, IOntology] {
  const data = JSON.parse(rawPack);
  const config = JSON.parse(rawOntology);
  const configTransformed = {
    constraints: [],
    ...camelCaseDeep(config),
  };

  return [data, configTransformed] as any;
}

export function transformBackAnnotation(annotation: IAnnotation): any {
  return {
    'py/object': annotation.legendId,
    'py/state': {
      _span: {
        begin: annotation.span.begin,
        end: annotation.span.end,
        'py/object': 'forte.data.span.Span',
      },
      _tid: annotation.id,
      ...annotation.attributes,
    },
  };
}

export function transformBackLink(link: ILink): any {
  return {
    'py/object': link.legendId,
    'py/state': {
      _child: link.toEntryId,
      _parent: link.toEntryId,
      _tid: link.id,
      ...link.attributes,
    },
  };
}

export function transformProjectConfig(rawConfig: string): IProjectConfigs {
  const config = JSON.parse(rawConfig);
  return {
    legendConfigs: config ? config.legendConfigs : {},
    scopeConfigs: config ? config.scopeConfigs : {},
    layoutConfigs: config ? config.layoutConfigs : {},
    remoteConfigs: config ? config.remoteConfigs : {},
  };
}
