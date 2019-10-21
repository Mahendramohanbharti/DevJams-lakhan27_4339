var oracledb = require('oracledb');
var dbConfig = {
    user: process.env.NODE_ORACLEDB_USER || "system",

    password: process.env.NODE_ORACLEDB_PASSWORD || "lakhandb",

    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "jdbc:oracle:thin:@WORKGROUP\LAPTO:1521:SYS$USERS",

    externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};

var connection4 = {
    database:
    {
            user: dbConfig.user,
            password: dbConfig.password,
            tns: dbConfig.connectString
    }
}    
module.exports = connection4;
