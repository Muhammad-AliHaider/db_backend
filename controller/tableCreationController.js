const {getConnection} = require("../connection");

module.exports = {
    CreateDesertsTable : async function(req,res,next){
        let connection;
        try{
            connection = await getConnection();
            const query = `CREATE TABLE Deserts (
                desert_id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
                deserts VARCHAR2(255) NOT NULL,
                protein NUMBER(10,2) NOT NULL,
                carbs NUMBER(10,2) NOT NULL,
                fat NUMBER(10,2) NOT NULL,
                unit_price NUMBER NOT NULL
            )
            `;
            

            await connection.execute(query);

            // res.status(202).send("Deserts Table Created");
            next();

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
    },
    CreatePersonTable : async function(req,res,next){
        let connection;
        try{
            connection = await getConnection();
            const query = `
            CREATE TABLE PERSON(
                person_id Number GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
                Name VarChar2(255),
                MobileNumber VarChar2(255),
                Email VarChar2(255),
                Address Varchar(255)
            )
            `;
            

            await connection.execute(query);

            // res.status(202).send("Person Table Created");
            next();

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
    },

    CreateOrdersTable : async function(req,res,next){
        let connection;
        try{
            connection = await getConnection();
            const query = `
            CREATE TABLE Orders (
                order_id NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY,
                person_id NUMBER,
                desert_id NUMBER,
                order_date VarChar(255),
                quantity NUMBER,
                total Number,
                FOREIGN KEY (person_id) REFERENCES PERSON (person_id),
                FOREIGN KEY (desert_id) REFERENCES Deserts (desert_id)
            )
            `;
            

            await connection.execute(query);

            // res.status(202).send("Orders Table Created");
            next();

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
    },

    CreateTriggersTotalPrice : async function(req,res,next){
        let connection;
        try{
            connection = await getConnection();
            const query = `
            CREATE OR REPLACE TRIGGER CalculateTotalPriceTrigger 
            BEFORE INSERT ON Orders 
            FOR EACH ROW 
            BEGIN 
                SELECT unit_price * :NEW.quantity INTO :NEW.total
                FROM Deserts
                WHERE desert_id = :NEW.desert_id;
            END;
            `;
            

            await connection.execute(query);

            // res.status(202).send("CreateTriggers Created");
            next();

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
    },

    CreateTriggerUpdateTotalPrice : async function(req,res,next){
        let connection;
        try{
            connection = await getConnection();
            const query = `
            CREATE OR REPLACE TRIGGER UpdateTotalPriceTrigger
            AFTER UPDATE ON Deserts
            FOR EACH ROW
            BEGIN
                UPDATE Orders
                SET total = :NEW.unit_price * quantity
                WHERE desert_id = :NEW.desert_id;
            END;`;
            await connection.execute(query);
            next();
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
    },

    CreateTriggerUpdateTotal : async function(req,res,next){
        let connection;
        try{
            connection = await getConnection();
            const query = `
            CREATE OR REPLACE TRIGGER UpdateTotalTrigger
            BEFORE UPDATE ON Orders
            FOR EACH ROW
            BEGIN
                SELECT unit_price * :NEW.quantity INTO :NEW.total
                FROM Deserts
                WHERE desert_id = :NEW.desert_id;
            END;`;
            await connection.execute(query);
            next();
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
    },
    

    CreateTriggerDeletePerson : async function(req,res,next){
        let connection;
        try{
            connection = await getConnection();
            const query = `
            CREATE OR REPLACE TRIGGER DeletePersonOrdersTrigger 
            BEFORE DELETE ON PERSON 
            FOR EACH ROW 
            BEGIN 
                DELETE FROM Orders
                WHERE person_id = :OLD.person_id;
            END;`;
            await connection.execute(query);
            next();
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
    },

    CreateProcedures : async function(req,res,next){
        let connection;
        try{
            connection = await getConnection();
            const query = `
            CREATE OR REPLACE PROCEDURE DeleteDesertAndOrders (
                p_desert_id NUMBER
            ) 
            AS 
            BEGIN 
                -- Delete orders associated with the dessert
                DELETE FROM Orders
                WHERE desert_id = p_desert_id;
                
                -- Delete the dessert itself
                DELETE FROM Deserts
                WHERE desert_id = p_desert_id;
                
                COMMIT; 
            EXCEPTION 
                WHEN OTHERS THEN 
                    ROLLBACK;
                    RAISE; 
            END DeleteDesertAndOrders;
            `;
            

            await connection.execute(query);

            res.status(202).send("All Table created successfully");

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
    },

    DropTables: async function(req,res,next){
        let connection;
        try{
            connection = await getConnection();
            

            await connection.execute(`DROP Trigger DeletePersonOrdersTrigger`);
            await connection.execute(`DROP Trigger UpdateTotalPriceTrigger`);
            await connection.execute(`DROP Trigger CalculateTotalPriceTrigger`);
            await connection.execute(`DROP Trigger UpdateTotalTrigger`);
            await connection.execute(`DROP PROCEDURE DeleteDesertAndOrders`);
            await connection.execute(`DROP TABLE Orders`);
            await connection.execute(`DROP TABLE Deserts`);
            await connection.execute(`DROP TABLE Person`);
            

            res.status(202).send("All Table Dropped successfully");
            // next();

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
    },

    testConnection : async function(req,res){
        let connection;
        try{
            // Connection.setCredential(req.body.userName, req.body.password);
            connection = await getConnection();
            res.status(200).send("Connection Successful");
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