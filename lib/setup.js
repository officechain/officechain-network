
/**
 * Setup the demo
 * @param {org.officechain.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
function setupDemo(setupDemo) {
  console.log('setupDemo');

  var factory = getFactory();
  var NS = 'org.officechain';
  var NS_D = 'org.vda';

  var people = [
    { type: 'employee', workerId: 'e1', firstName: 'Alice' },
    { type: 'employee', workerId: 'e2', firstName: 'Bob' },
    { type: 'manager', workerId: 'm1', firstName: 'Carol' },
    { type: 'contractor', workerId: 'c1', firstName: 'Dave' }
  ];

  var employees = [];
  var managers = [];
  var contractors = [];

  for (var index in people) {
    var worker = people[index];
    if (worker.type === 'employee') {
      var employee = factory.newResource(NS, 'Employee', worker.workerId);
      employee.firstName = worker.firstName;
      employees.push(employee);
    }
    if (worker.type === 'manager') {
      var manager = factory.newResource(NS, 'Manager', worker.workerId);
      manager.firstName = worker.firstName;
      managers.push(manager);
    }
    if (worker.type === 'contractor') {
      var contractor = factory.newResource(NS, 'Contractor', worker.workerId);
      contractor.firstName = worker.firstName;
      contractors.push(contractor);
    }
  }

  var company = factory.newResource(NS, 'Company', 'comp1');
  company.name = 'A Company';

  return getParticipantRegistry(NS + '.Employee')
    .then(function(employeeRegistry) {
      return employeeRegistry.addAll(employees);
    })
    .then(function() {
      return getParticipantRegistry(NS + '.Manager');
    })
    .then(function(managerRegistry) {
      return managerRegistry.addAll(managers);
    })
    .then(function() {
      return getParticipantRegistry(NS + '.Contractor');
    })
    .then(function(contractorRegistry) {
      return contractorRegistry.addAll(contractors);
    })
    .then(function() {
      return getParticipantRegistry(NS + '.Company');
    })
    .then(function(companyRegistry) {
      return companyRegistry.add(company);
    });

}
