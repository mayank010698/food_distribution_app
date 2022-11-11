import mysql.connector

import json
from flask import Flask, request, jsonify, redirect, url_for

###
app = Flask(__name__)


# Connect to server
def insertData(query):
    cnx = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="root",
        database="dabest")

    # Get a cursor
    cur = cnx.cursor()

    # Execute a query
    try:
        cur.execute(query)
        return "OK"
    except:
        return "FAIL"
    cnx.commit()
    # Print databases
    body = cur.fetchall()

    # Close connection
    cnx.close()

def executeQuery(query):
    cnx = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="root",
        database="dabest")

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

@app.route("/login",methods=["POST"])
def login():
    inp = request.json["inputData"]
    name = inp["name"]
    pwd = inp["password"]
    kind = inp["kind"]

    if(kind=="user"):
        query = "select * from User where ProviderID=\"{}\" and Password=\"{}\"".format(name,pwd)
        row = executeQuery(query)
    else:
        query = "select * from Provider where ProviderID=\"{}\" and Password=\"{}\"".format(name,pwd)
        row = executeQuery(query)

    if not row:
        data = {}
        data["response"]={}
        data["response"]["data"]={}
        data["response"]["message"] = "FAIL"
        data["response"]["data"]["columns"]=["FoodID","Kind"]
        data["response"]["data"]["rows"] = {}
    else:
        data = {}
        data["response"]={}
        data["response"]["data"]={}
        data["response"]["message"] = "OK"
        data["response"]["data"]["columns"]=["FoodID","Kind"]
        data["response"]["data"]["rows"] = row

    return data


@app.route("/getWaste",methods=['POST'])
def getWaste():
    print("called getWaste")
    inp = request.json["inputData"]
    provider_id = inp["providerID"]

    query= "SELECT  ODate , 2*TotalOffered as Produced,10 as Sold, ExcessSold, 2*TotalOffered-10-ExcessSold as Wasted from \
(select Date(ODate) as ODate, sum(Quantity) as ExcessSold From Orders where ProviderID=\""\
+provider_id+"\" group by Date(ODate))ord natural join\
(select Date(ODate) as ODate, sum(Quantity) as TotalOffered From Offers where ProviderID=\""+provider_id+"\" group by Date(ODate)\
)off"
    final_data = executeQuery(query)

    data = {}
    data["response"]={}
    data["response"]["data"]={}
    data["response"]["message"] = "OK"
    data["response"]["data"]["columns"]=["Date","Produced","Sold","ExcessSold","Wasted"]
    data["response"]["data"]["rows"] = final_data

    return json.dumps(data)

@app.route("/insertItem",methods=['POST'])
def addItem():
    inp = request.json["inputData"]
    

    provider_id = inp["providerID"]
    food_id = inp["foodID"]
    item_descript = inp["item_description"]
    Quantity = int(inp["quantity"])
    curdate = "2022-10-01"

    query = "INSERT INTO Offers Values(\"{}\",\"{}\",\"{}\",\"{}\",\"{}\")".format(provider_id,food_id,item_descript,curdate,Quantity)
    result = insertData(query)
    
    data = {}
    if(result=='OK'):
        data["response"]={}
        data["response"]["data"]={}
        data["response"]["message"] = "OK"
        data["response"]["data"]["columns"]=[]
        data["response"]["data"]["rows"] = {}
    else:
        data["response"]={}
        data["response"]["data"]={}
        data["response"]["message"] = "failed"
        data["response"]["data"]["columns"]=[]
        data["response"]["data"]["rows"] = {}

    return data

app.run(host='0.0.0.0', port='4000', debug=True)
