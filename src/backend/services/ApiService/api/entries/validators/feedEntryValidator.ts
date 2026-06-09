import {outdoorRunValidator} from './outdoorRunValidator';
import {outdoorWalkValidator} from './outdoorWalkValidator';
import {entryValidator} from './entryValidator';


export const reducedOutdoorRunValidator = outdoorRunValidator.omit({
  geoData: true,
  heartRateData: true,
}).openapi({ref: 'ReducedOutdoorRun', description: 'Reduced outdoor run.'});

export const reducedOutdoorWalkValidator = outdoorWalkValidator.omit({
  geoData: true,
  heartRateData: true,
}).openapi({ref: 'ReducedOutdoorWalk', description: 'Reduced outdoor walk.'});

export const feedEntryValidator = entryValidator.extend({
  outdoorRun: reducedOutdoorRunValidator.optional().openapi({description: 'Outdoor run. Only for outdoor run entries.'}),
  outdoorWalk: reducedOutdoorWalkValidator.optional().openapi({description: 'Outdoor walk. Only for outdoor walk entries.'}),
}).openapi({ref: 'FeedEntry', description: 'Entry. Reduced version of entry for feed.'});
