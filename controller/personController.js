const {getConnection} = require('../connection');

// Path: person/....

module.exports = {
    removeAllPeople: async function (req, res){
        let connection ;
        try {
            connection = await getConnection();
            const query = "TRUNCATE TABLE PERSON";
            const options={
                autoCommit: true, // Commit each insert immediately
            }
            await connection.execute(query ,[], options);
            // console.log(table.rows);
            res.status(202).send("Deleted");
          } catch (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Internal Server Error');
          } finally {
            if (connection) {
              try {
                // Release the connection when done
                await connection.close();
              } catch (error) {
                console.error('Error closing database connection:', error);
              }
            }
        }
    },
    populatePeople: async function (req, res){

        let connection ;
        try {
            connection = await getConnection();
            const dataPerson = [
              ['John Doe', '123-456-7890', 'johndoe@example.com', '123 Main St, Anytown'],
              ['Jane Smith', '987-654-3210', 'janesmith@example.com', '456 Elm St, Another Town'],
              ['Alice Johnson', '555-123-4567', 'alice@example.com', '789 Oak St, Somewhere'],
              ['Bob Williams', '555-555-5555', 'bob@example.com', '321 Pine St, Nowhere'],
              ['Emily Davis', '444-789-1234', 'emily@example.com', '101 Cedar St, Elsewhere'],
              ['Michael Brown', '123-555-9999', 'michael@example.com', '555 Maple St, Anywhere']
            ];
            
            for (const personData of dataPerson) {
                const queryPerson = `INSERT INTO PERSON (Name, MobileNumber, Email, Address) VALUES (:1, :2, :3, :4)`;
                const bindsPerson = personData; // Bind the personData array directly
                const optionsPerson = {
                  autoCommit: true, // Commit each insert immediately
                };
                // console.log(query , "aaa----------->>>>")
                await connection.execute(queryPerson,bindsPerson,optionsPerson);
              }

              res.status(202).send("Populated");
        } 
        catch (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Internal Server Error');
          
        } 
        finally {
            if (connection) {
              try {
                // Release the connection when done
                await connection.close();
              } catch (error) {
                console.error('Error closing database connection:', error);
              }
            }
        }
    },

    GetWholeTable: async function  (req, res){
        let connection ;
        try {
            connection = await getConnection();
            const table = await connection.execute("SELECT * FROM person");
            // console.log(table.rows);
            res.status(200).send(table);
          } catch (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Internal Server Error');
          } finally {
            if (connection) {
              try {
                // Release the connection when done
                await connection.close();
              } catch (error) {
                console.error('Error closing database connection:', error);
              }
            }
        } 
        // return table;
    },

    getPersonwithCondition: async function (req, res){
        let connection ;
        try {
            // console.log(req, "req from getDesertwithCondition")
            connection = await getConnection();
            const query = `SELECT * FROM Person WHERE ${req.body.condition}`;
            
            // bind = [req.body.condition];
            // console.log(bind[0], "bind")
            const table = await connection.execute(query);
            // console.log(table.rows);
            res.status(200).send(table);
          } catch (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Internal Server Error');
          } finally {
            if (connection) {
              try {
                // Release the connection when done
                await connection.close();
              } catch (error) {
                console.error('Error closing database connection:', error);
              }
            }
        } 
    },

    AddNewPerson: async function (req, res){
        let connection ;
        try {
            connection = await getConnection();
            const query = `INSERT INTO Person (Name, MobileNumber, Email, Address) VALUES (:1, :2, :3, :4)`;
            const binds = [req.body.Name, req.body.MobileNumber, req.body.Email, req.body.Address];
            const options = {
              autoCommit: true, // Commit each insert immediately
            };
            // console.log(query , "aaa----------->>>>")
            await connection.execute(query,binds,options);
            res.status(202).send("Added");
        } 
        catch (error) {
            console.error('Error executing SQL query:', error);
            res.status(500).send('Internal Server Error');
          
        } 
        finally {
            if (connection) {
              try {
                // Release the connection when done
                await connection.close();
              } catch (error) {
                console.error('Error closing database connection:', error);
              }
            }
        }
    },

    UpdatePerson: async function (req, res) {
        let connection;
        try {
          connection = await getConnection();
          const binds = [
            req.body.Name,
            req.body.MobileNumber,
            req.body.Email,
            req.body.Address,
            req.body.person_id,
          ];
      
          console.log("binds -> ", binds);
          const query = `UPDATE Person SET Name = :1, MobileNumber = :2, Email = :3, Address = :4 WHERE person_id = :5`;
          const options = {
            autoCommit: true, // Commit each insert immediately
          }
    
          const respnse = await connection.execute(query, binds, options);
  
      
          res.status(202).send("Updated");
        } catch (error) {
          console.error("Error executing SQL query:", error);
          res.status(500).send('Internal Server Error');
        } finally {
          if (connection) {
            try {
              // Release the connection when done
              await connection.close();
            } catch (error) {
              console.error('Error closing database connection:', error);
            }
          }
        }
      },
  
  
      DeletePersonAtID : async function (req, res){
  
        let connection ;
        try{
          connection = await getConnection();
          const query = `Delete from Person WHERE person_id = :1`;
          const binds = [req.body.person_id];
          const options = {
            autoCommit: true, // Commit each insert immediately
          };
  
          await connection.execute(query,binds,options);
          res.status(202).send("Deleted");
        }
        catch(error){
          console.log("Error executing SQL query:" ,error)
          res.status(500).send('Internal Server Error');
        }
        finally{
          if(connection){
            try{
              await connection.close();
            }
            catch(error){
              console.log("Error closing database connection:", error);
            }
          }
  
        }
  
      }




}