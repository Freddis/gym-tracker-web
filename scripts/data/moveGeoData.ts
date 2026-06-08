// import {eq} from 'drizzle-orm';
// import {EntryType} from '../../src/backend/services/EntryService/types/EntryType';
// import {globalServiceFactory} from '../../src/backend/utils/GlobalServiceFactory/globalServiceFactoryInstance';

// const entryService = await globalServiceFactory.entry();
// const drizzleService = await globalServiceFactory.drizzle();
// const db = await drizzleService.getDb();
// const schema = drizzleService.getSchema();
// const chunk = 10;
// let page = 1;
// while (true) {
//   const entries = await entryService.getAll({
//     perPage: chunk,
//     page: page,
//     type: [EntryType.OutdoorRun],
//   });
//   page++;
//   if (entries.items.length === 0) {
//     break;
//   }
//   for (const entry of entries.items) {
//     console.log(`Processing entry ${entry.id}`);
//     const outdoorRun = entry.outdoorRun;
//     if (!outdoorRun.geoData) {
//       console.log(`No geo data for entry ${entry.id}`);
//       continue;
//     }
//     const count = await db.$count(schema.outdoorRunGeoData, eq(schema.outdoorRunGeoData.outdoorRunId, outdoorRun.id));
//     if (count > 0) {
//       console.log(`Geo data already exists for entry ${entry.id}`);
//       continue;
//     }
//     for (const obj of outdoorRun.geoData) {
//       await db.insert(schema.outdoorRunGeoData).values({
//         outdoorRunId: outdoorRun.id,
//         timestamp: obj.timestamp,
//         latitude: obj.latitude,
//         longitude: obj.longitude,
//         altitude: obj.altitude,
//         horizontalAccuracy: obj.horizontalAccuracy,
//         verticalAccuracy: obj.verticalAccuracy,
//         speed: obj.speed,
//         speedAccuracy: obj.speedAccuracy,
//         course: obj.course,
//         distance: obj.distance,
//       });
//     }
//     if (!outdoorRun.heartRateData) {
//       console.log(`No heart rate data for entry ${entry.id}`);
//       continue;
//     }
//     for (const obj of outdoorRun.heartRateData) {
//       await db.insert(schema.outdoorRunHeartRateData).values({
//         outdoorRunId: outdoorRun.id,
//         timestamp: obj.timestamp,
//         heartRate: Math.round(obj.heartRate),
//       });
//     }
//   }
// }
// page = 1;
// while (true) {
//   const entries = await entryService.getAll({
//     perPage: chunk,
//     page: page,
//     type: [EntryType.OutdoorWalk],
//   });
//   page++;
//   if (entries.items.length === 0) {
//     break;
//   }
//   for (const entry of entries.items) {
//     console.log(`Processing entry ${entry.id}`);
//     const outdoorWalk = entry.outdoorWalk;
//     if (!outdoorWalk.geoData) {
//       console.log(`No geo data for entry ${entry.id}`);
//       continue;
//     }
//     const count = await db.$count(schema.outdoorWalkGeoData, eq(schema.outdoorWalkGeoData.outdoorWalkId, outdoorWalk.id));
//     if (count > 0) {
//       console.log(`Geo data already exists for entry ${entry.id}`);
//       continue;
//     }
//     for (const obj of outdoorWalk.geoData) {
//       await db.insert(schema.outdoorWalkGeoData).values({
//         outdoorWalkId: outdoorWalk.id,
//         timestamp: Math.round(obj.timestamp),
//         latitude: obj.latitude,
//         longitude: obj.longitude,
//         altitude: obj.altitude,
//         horizontalAccuracy: obj.horizontalAccuracy,
//         verticalAccuracy: obj.verticalAccuracy,
//         speed: obj.speed,
//         speedAccuracy: obj.speedAccuracy,
//         course: obj.course,
//         distance: obj.distance,
//       });
//     }
//     if (!outdoorWalk.heartRateData) {
//       console.log(`No heart rate data for entry ${entry.id}`);
//       continue;
//     }
//     for (const obj of outdoorWalk.heartRateData) {
//       await db.insert(schema.outdoorWalkHeartRateData).values({
//         outdoorWalkId: outdoorWalk.id,
//         timestamp: Math.round(obj.timestamp),
//         heartRate: Math.round(obj.heartRate),
//       });
//     }
//   }
// }
// console.log('Done');
// await globalServiceFactory.cleanup();
