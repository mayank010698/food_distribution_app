import mysql.connector

import json
from flask import Flask, request, jsonify, redirect, url_for

###
app = Flask(__name__)


# Connect to server
def executeQuery(query):
    cnx = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="12341234",
        database="project")

    # Get a cursor
    cur = cnx.cursor()

    # Execute a query

    cur.execute(query)

    # Print databases
    body = cur.fetchall()

    # Close connection
    cnx.close()

    final_data = []
    for row in body:
        d = []
        for item in row:
            d.append(str(item).strip())
        final_data.append(d)
    return final_data

@app.route('/',methods=['POST','GET'])
def redirect_to_provider():
    if request.method == 'POST':
        dat = request.json
        provider_id = dat["username"]
        pwd = dat["password"]

        query = "select * from Provider where ProviderID=\"{}\" and Password=\"{}\"".format(provider_id,pwd)

        cnx = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="12341234",
        database="project")

        print(query)
        cur = cnx.cursor()
        cur.execute(query)

        row = cur.fetchall()

        cnx.close()
        print(provider_id)
        if not row:
            return json.dumps("login failed")
        else:
            return redirect(url_for('provider_info',provider_id=provider_id))

    
@app.route('/search')
def test():
    return executeQuery("SELECT * FROM Details LIMIT 5;")

@app.route('/provider/<provider_id>', methods=['GET','POST'])
def provider_info(provider_id,curdate='2022-04-02'):


    if request.method=='POST':
        data = request.json

        provider_id = data["provider_id"]
        food_id = data["food_id"]
        item_descript = data["item_descript"]
        Quantity = int(data["Quantity"])

        query = "INSERT INTO Offers Values(\"{}\",\"{}\",\"{}\",\"{}\",\"{}\")".format(provider_id,food_id,item_descript,curdate,Quantity)

        cnx = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="12341234",
        database="project")

        print(query)
        cur = cnx.cursor()
        cur.execute(query)
        cnx.commit()
        cnx.close()

        return " query executed successfully"

        
    cnx = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="12341234",
        database="project")

    # Get a cursor
    cur = cnx.cursor()

    # Execute a query
    query1 = "SELECT  ODate , 2*TotalOffered as Produced,10 as Sold, ExcessSold, 2*TotalOffered-10-ExcessSold as Wasted from \
(select Date(ODate) as ODate, sum(Quantity) as ExcessSold From Orders where ProviderID=\""\
+provider_id+"\" group by Date(ODate))ord natural join\
(select Date(ODate) as ODate, sum(Quantity) as TotalOffered From Offers where ProviderID=\""+provider_id+"\" group by Date(ODate)\
)off"

    query2 = "select * from Offers where ProviderID=\""  + provider_id + "\" and Date(ODate) =\""+curdate+"\"" 
    cur.execute(query1)

    # Print databases
    row = cur.fetchall()

    d = {}
    d["Wasted"] = json.dumps(row,default=str)

    cur.execute(query2)
    row = cur.fetchall()
    d["available"] = json.dumps(row,default=str)


    query3 = "SELECT * FROM FoodType"
    cur.execute(query3)
    row = cur.fetchall()
    d["FoodType"] = json.dumps(row, default=str)
    cnx.close()


    return d

@app.route("/getFoodKind")
def getFoodKind():
    query = "SELECT * FROM FoodType"
    final_data = executeQuery(query)

    data = {}
    data["response"]={}
    data["response"]["data"]={}
    data["response"]["message"] = "OK"
    data["response"]["data"]["columns"]=["FoodID","Kind"]
    data["response"]["data"]["rows"] = final_data


    return json.dumps(data)

@app.route("/getOffers",methods=['POST'])
def getOffers():
    inp = request.json["inputData"]
    provider_id = inp["searchInput"]

    query = "select * from Offers where ProviderID=\""  + provider_id +"\""
    final_data = executeQuery(query)

    data = {}
    data["response"]={}
    data["response"]["data"]={}
    data["response"]["message"] = "OK"
    data["response"]["data"]["columns"]=["ProviderID","FoodID","Item_Description","ODate","Quantity"]
    data["response"]["data"]["rows"] = final_data

    return json.dumps(data)









    


        





app.run(host='0.0.0.0', port='4000', debug=True)
