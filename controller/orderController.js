const {getConnection} = require('../connection');

// Path: order/....

module.exports = {
    removeAllOrders: async function (req, res){
        let connection ;
        try {
            connection = await getConnection();
            const query = "TRUNCATE TABLE Orders";
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
    populateOrders: async function (req, res){

        let connection ;
        try {

            // INSERT INTO Orders (person_id, desert_id, order_date, quantity)
            // VALUES (1, 1, '2023/09/15', 2);
            connection = await getConnection();
            const dataOrder = [
                [1,10, '2023/09/15', 2],
                [2,5, '2023/09/05', 2],
                [3,2, '2023/09/25', 7],
                [2,7, '2023/09/21', 24],
                [4,10, '2023/08/15', 7],
                [5,1, '2023/09/15', 8],
            ];
            
            for (const OrderData of dataOrder) {
                const queryOrder = `INSERT INTO Orders (person_id, desert_id, order_date, quantity) VALUES (:1, :2, :3, :4)`;
                const bindsOrder = OrderData; // Bind the OrderData array directly
                const optionsOrder = {
                  autoCommit: true, // Commit each insert immediately
                };
                // console.log(query , "aaa----------->>>>")
                await connection.execute(queryOrder,bindsOrder,optionsOrder);
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
            const table = await connection.execute("SELECT Orders.*,Person.Name , Deserts.deserts , Deserts.unit_price FROM (Orders join Person on Orders.person_id = Person.person_id) join Deserts on Orders.desert_id = Deserts.desert_id");
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

    getOrderwithCondition: async function (req, res){
        let connection ;
        try {
            // console.log(req, "req from getDesertwithCondition")
            connection = await getConnection();
            const query = `SELECT Orders.*,Person.Name , Deserts.deserts FROM (Orders join Person on Orders.person_id = Person.person_id) join Deserts on Orders.desert_id = Deserts.desert_id WHERE ${req.body.condition}`;
            
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

    AddNewOrder: async function (req, res){
        let connection ;
        try {
            connection = await getConnection();
            const query = `INSERT INTO Orders (person_id, desert_id, order_date, quantity) VALUES (:1, :2, :3, :4)`;
            const binds = [req.body.person_id, req.body.desert_id, req.body.order_date, req.body.quantity];
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

    UpdateOrder: async function (req, res) {
        let connection;
        try {
          connection = await getConnection();
          const binds = [
            req.body.person_id,
            req.body.desert_id,
            req.body.order_date,
            req.body.quantity,
            req.body.order_id,
          ];
      
          console.log("binds -> ", binds);
          const query = `UPDATE Orders SET person_id = :1, desert_id = :2, order_date = :3, quantity = :4 WHERE order_id = :5`;
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
  
  
      DeleteOrderAtID : async function (req, res){
  
        let connection ;
        try{
          connection = await getConnection();
          const query = `Delete from Orders WHERE order_id = :1`;
          const binds = [req.body.order_id];
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