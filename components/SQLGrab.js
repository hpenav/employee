var noflo = require('noflo');
const sql = require('mssql')

var config = {
    user: 'octa',
    password: 'octa204!',
    server: '192.168.100.107', 
    database: 'Veritrax5' 
};

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
    // connect to your database
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('SELECT * FROM Veritrax5.dbo.tblEvents', function (err, cursor) {

            if (err) console.log(err)

            var totalSQLRecords = (cursor.recordsets[0].length);
            console.log("totalRecords: " + totalSQLRecords);

        });
      	sql.close();
    });
    // Read packets we need to process
    var data = input.getData('in');
    // Process data and send output
    output.send({
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};
