'use strict';

/**
 * Log work for a company
 * @param {org.officechain.LogWorkForCompany} workLog - the log to be processed
 * @transaction
 */
function logWorkForCompany(workLog) {

  var factory = getFactory();
  var NS = 'org.officechain';

  var work = factory.newResource(NS, 'Work', 'TODO:ChangeMeToUnique');
  work.startDate = workLog.startDate;
  work.endDate = workLog.endDate;
  if (workLog.duration) {
    work.duration = workLog.duration;
  }
  work.worker = factory.newRelationship(NS, 'Worker', workLog.workerId);
  work.company = workLog.company;

  // save the work log
  return getAssetRegistry(work.getFullyQualifiedType())
    .then(function (registry) {
      return registry.add(work);
    });

}
