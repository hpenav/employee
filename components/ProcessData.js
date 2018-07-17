var noflo = require('noflo');


exports.getComponent = function() {
  var c = new noflo.Component();
  c.description = 'SQLGrab';
  c.icon = 'database';
  c.inPorts.add('in', {
    datatype: 'all',
    description: 'Packet to forward'
  });
  c.outPorts.add('out', {
    datatype: 'all'
  });
  c.process(function (input, output) {
    // Check preconditions on input data
    if (!input.hasData('in')) {
      return;
    }
    
    // Read packets we need to process
    var data = input.getData('in');
    console.log("dataIn : " + data)
    
    // Process data and send output
    output.send({
      
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};