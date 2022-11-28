import mysql.connector
import json
from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

def executeQuery(query):
    cnx = mysql.connector.connect(
        host="34.173.238.55",
        user="root",
        password="12341234",
        database="dabest3")

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


@app.route("/getWaste",methods=['POST'])                                    # COMPLEX QUERY 1 
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

# executeQuery("Select f.Kind, count(*) as availableOptions From FoodType f natural join Offers o group by f.Kind Order by o.ODate;")

# @app.route('/foodOptions', methods=['GET','POST'])
# def foodOptions():
#     if request.method=='POST':
#         d = executeQuery("Select f.FoodID, f.Kind, count(*) as availableOptions From FoodType f natural join Offers o group by f.Kind Order by o.ODate;")
#         return d



@app.route("/getOrders",methods=['POST'])                # READ
def getOrder():
    inp = request.json["inputData"]
    user_id = inp["userID"]
    query = "SELECT * FROM Orders WHERE UserID='"+user_id+"'"
    print(query)
    
    final_data = executeQuery(query)

    data = {}
    data["response"]={}
    data["response"]["data"]={}
    data["response"]["message"] = "OK"
    data["response"]["data"]["columns"]=["OrderID","UserID","ProviderID","FoodID","Quantity","ODate"]
    data["response"]["data"]["rows"] = final_data
    print(data)
    return json.dumps(data)


@app.route("/getOffers",methods=['POST'])
def getOffers():                                            # READ
    inp = request.json["inputData"]
    provider_id = inp["searchInput"]

    query = "select * from Offers where ProviderID=\""  + provider_id +"\" and Date(ODate)='2020-12-14' and Quantity>0"
    print(query)
    final_data = executeQuery(query)

    data = {}
    data["response"]={}
    data["response"]["data"]={}
    data["response"]["message"] = "OK"
    data["response"]["data"]["cols"]=["ProviderID","FoodID","Item_Description","ODate","Quantity"]
    data["response"]["data"]["rows"] = final_data
    return json.dumps(data)

@app.route("/getOffersAll",methods=['POST'])
def getOffersAll():                                         # READ

    query = "select ProviderID,FoodID,Item_Description,ODate, CurQuantity from Offers where Date(ODate)='2020-12-14' and CurQuantity>0 limit 200 ;"
    final_data = executeQuery(query)

    data = {}
    data["response"]={}
    data["response"]["data"]={}
    data["response"]["message"] = "OK"
    data["response"]["data"]["cols"]=["ProviderID","FoodID","Item_Description","ODate","Quantity"]
    data["response"]["data"]["rows"] = final_data

    return json.dumps(data)

def insertData(query):
    cnx = mysql.connector.connect(
        host="34.173.238.55",
        user="root",
        password="12341234",
        database="dabest3")

    # Get a cursor
    cur = cnx.cursor()

    # Execute a query
    try:
        print("In try")
        cur.execute(query)
        cnx.commit()
        print(query)
        print("---")
        return "OK"
    except Exception as e:
        print("errrr")
        print(e)
        return "FAIL"
    
    # Print databases
    body = cur.fetchall()

    # Close connection
    cnx.close()

#mayank
@app.route("/insertItem",methods=['POST'])
def addItem():                                  # CREATE
    inp = request.json["inputData"]
    

    provider_id = inp["providerID"]
    food_id = inp["foodID"]
    item_descript = inp["item_description"]
    Quantity = int(inp["quantity"])
    curdate = '2020-12-14 00:00:00'

    query = "INSERT INTO Offers Values(\"{}\",\"{}\",\"{}\",\"{}\",\"{}\",\"{}\")".format(provider_id,food_id,item_descript,curdate,Quantity,Quantity)
    print(query)
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

@app.route('/foodOptions', methods=['GET','POST'])
def foodOptions():                                                  # COMPLEX QUERY 2
    if request.method=='POST':
        body = executeQuery("Select f.FoodID, f.Kind, count(*) as availableOptions From FoodType f natural join Offers o group by f.FoodID,f.Kind;")
        final_data = []
        for row in body:
            d = []
            for item in row:
                d.append(item)
            final_data.append(d)
        
        data = {}
        data["response"]={}
        data["response"]["data"]={}
        data["response"]["message"] = "OK"
        data["response"]["data"]["columns"]=["FoodID","Kind","AvailableQty"]
        data["response"]["data"]["rows"] = final_data

        return data

#Register API
@app.route('/register',methods=['POST'])
def register():
    inp = request.json["inputData"]
    name = inp["name"]
    pwd = inp["password"]
    kind = inp["kind"]
    email = inp["email"]
    PhoneNumber=inp["PhoneNumber"]
    socialhandle=inp["SocialHandle"]
    address=inp["Address"]
    zipcode=inp["ZipCode"]
    print(name, pwd, kind,email,PhoneNumber, socialhandle,address,zipcode)
    
    #Getting cid
    q1="""
    SELECT Count(*)
    FROM Details
    """
    q1_output=executeQuery(q1)
    print(q1_output)
    cid=int(q1_output[0][0])+1


    #Inserting into Details
    print("Inserting values into details:",cid,email,PhoneNumber,socialhandle,address,zipcode)
    # return None
    query1="""
    INSERT INTO Details 
    VALUES(
    '{}',
    '{}',
    '{}',
    '{}',
    '{}',
    '{}')
    """.format(cid,email,PhoneNumber,socialhandle, address,zipcode)
    print("Query 1",query1)
    result1 = insertData(query1)
    print("result1(register)",result1)
    
    print("kind::=>", kind)
    if(kind=='user'):
         #Getting uid
        q1="""
        SELECT Count(*)
        FROM User
        """
        q1_output=executeQuery(q1)
        print("user count: ",q1_output)
        uid="U"+str(int(q1_output[0][0])+1)
        
        
        #Inserting into Users
        print("Inserting values into Users:",cid,uid,name,pwd,'Individual')
        query2="""
        INSERT INTO User
        Values(
            '{}',
            '{}',
            '{}',
            '{}',
            'Individial'
        )
        """.format(cid,uid,name,pwd)
        print("insert user query",query2)
        result2 = insertData(query2)
        print("result2",result2)
    
    else:
        #Getting uid
        q1="""
        SELECT Count(*)
        FROM Provider
        """
        q1_output=executeQuery(q1)
        print(q1_output)
        pid="P"+str(int(q1_output[0][0])+1)


        #Inserting into Providers
        print("Inserting values into Providers:",pid,name,cid,pwd,3)
        query2="""
        INSERT INTO Provider (ProviderID,Name,ContactID,Password,Rating)
        Values (
            '{}',
            '{}',
            '{}',
            '{}',
            3
         )
        """.format(pid,name,cid,pwd)
        print(query2)
        result2 = insertData(query2)
        print("result2",result2)


    data = {}
    if(result1=='OK' and result2=='OK'):
        data["response"]={}
        data["response"]["data"]={}
        data["response"]["message"] = "OK"
        data["response"]["data"]["kind"]=kind
        if(kind=='user'):
            data["response"]["data"]["user"]=uid
        else:
            data["response"]["data"]["user"]=pid

    else:
        data["response"]={}
        data["response"]["data"]={}
        data["response"]["message"] = "failed"
        data["response"]["data"]["kind"]=kind
        if(kind=='user'):
            data["response"]["data"]["user"]=uid
        else:
            data["response"]["data"]["user"]=pid
    
    print(data)
    return data

@app.route("/login",methods=["POST"])
def login():                                        # READ
    print("In login api")
    inp = request.json["inputData"]
    name = inp["name"]
    pwd = inp["password"]
    kind = inp["kind"]
    print(name, pwd, kind)

    if(kind=="user"):
        query = "select UserID from User where UserID=\"{}\" and Password=\"{}\"".format(name,pwd)
        row = executeQuery(query)
    else:
        query = "select ProviderID from Provider where ProviderID=\"{}\" and Password=\"{}\"".format(name,pwd)
        row = executeQuery(query)

    print(row)

    data = {}
    if not row:
        data["response"]={}
        data["response"]["data"]={}
        data["response"]["message"] = "FAIL"
        data["response"]["data"]["rows"] = {}
    else:
        data["response"]={}
        data["response"]["data"]={}
        data["response"]["message"] = "OK"
        data["response"]["data"]["kind"]=kind
        data["response"]["data"]["user"]=name
    return data

@app.route('/getOfferDetail',methods=['POST'])
def getOfferDetail():
    print("getOfferDetail called")                                   # READ
    data=request.json
    provider_id=data['inputData']['ProviderID']
    food_id=data['inputData']['FoodID']
    query="""
    SELECT p.ProviderID, p.Name, o.CurQuantity, o.Item_Description
    FROM Offers o JOIN Provider p on o.ProviderID=p.ProviderID
    WHERE o.ProviderID='{}' AND o.FoodID='{}' AND DATE(o.ODate)="2020-12-14";
    """.format(provider_id,food_id)

    b=executeQuery(query)
    print("aaaaaa",b,provider_id,food_id)

    # return b
    response={}
    response['message']="OK"
    response['data']={}
    response['data']['quantityAvailable']=b[0][2]
    response['data']['Provider']={}
    response['data']['Provider']['ProviderId']=b[0][0]
    response['data']['Provider']['ProviderName']=b[0][1]
    response['data']['FoodKind']={}
    response['data']['FoodKind']['FoodID']=5
    response['data']['FoodKind']['Kind']=b[0][3]

    return json.dumps(response)

@app.route("/feedback",methods=['POST'])                # READ
def Feedback():
    inp = request.json["inputData"]
    user_id = inp["UserID"]
    query = "SELECT * from  Feedback WHERE UserID ='{}';".format(user_id)
    result = executeQuery(query)
    data = {}
    
    data["response"]={}
    data["response"]["data"]={}
    data["response"]["message"] = "OK"
    data["response"]["data"]["columns"]=["FeedbackID","UserID","ProviderID","Comment","Rating","Date"]
    data["response"]["data"]["rows"] = result
    return data

@app.route('/placeOrder',methods=['POST'])              # CREATE and UPDATE
def placeOrder():
    data=request.json
    provider_id=data['inputData']['ProviderID']
    food_id=data['inputData']['FoodID']
    user_id=data['inputData']['UserID']
    quantity=data['inputData']['quantity']
    countqry='SELECT COUNT(*) from Orders'
    # print(countqry.strip('['))
    countDetails=executeQuery(countqry)
    countdetails2=countDetails[0]
    print(countdetails2[0])
    print(type(countdetails2))

    query="""
        INSERT INTO Orders Values(
            '{}',
            '{}',
            '{}',
            '{}',
             {},
            '{}'
        )
    """.format(str(int(countdetails2[0])+1),user_id,provider_id,food_id,quantity,"2020-12-14 01:48:52")
    insertData(query)

    query="""SELECT Quantity from Offers 
    where FoodID='{}' and ProviderID='{}' and Date(ODate)='2020-12-14'
    """.format(food_id,provider_id)
    print(query)


    print('Line 322',executeQuery(query))

    query="""
    UPDATE Offers
    SET CurQuantity=CurQuantity-{}
    WHERE FoodID='{}' and ProviderID='{}' and Date(ODate)='2020-12-14'
    """.format(str(int(quantity)),food_id,provider_id)
    

    print("311")
    print(query)
    insertData(query)
    
    query="""SELECT Quantity from Offers 
    where FoodID='{}' and ProviderID='{}' and Date(ODate)='2020-12-14'
    """.format(food_id,provider_id)
    
    print('Line 336',executeQuery(query))
    response={}
    response['message']="OK"
    response['data']={}
    response['data']['OrderDetails']=int(countdetails2[0])+1
    return json.dumps(response)

@app.route("/deleteFeedback",methods=['POST'])                      # Delete
def deleteFeedback():
    inp = request.json["inputData"]
    feed_id = inp["FeedbackID"]
    query = "DELETE FROM Feedback WHERE feedbackID ='{}';".format(feed_id)
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



@app.route('/search',methods=['POST'])                  # Search
def searchfooditem():
    data=request.json
    description=data['inputData']['description']
    query="""
    SELECT ProviderId, FoodId, Item_Description, CurQuantity FROM Offers 
    WHERE Item_Description LIKE '%{}%' and Date(ODate)='2020-12-14' and CurQuantity>0 limit 200;
    """.format(description)
    a=executeQuery(query)
    response={}
    response['message']="OK"
    response['data']={}
    response['data']['columns']=['ProviderId','FoodId','Item_Description','Quantity']
    response['data']['rows']=a
    b={}
    b['response']=response
    return b


@app.route('/searchByKind',methods=['POST'])                  # Search
def searchfooditemByKind():
    data=request.json
    kindID=data['inputData']['kindID']
    query="""
    SELECT ProviderId, FoodId, Item_Description, CurQuantity FROM Offers 
    WHERE FoodId='{}' and Date(ODate)='2020-12-14' and CurQuantity>0 limit 200;
    """.format(kindID)
    a=executeQuery(query)
    response={}
    response['message']="OK"
    response['data']={}
    response['data']['columns']=['ProviderId','FoodId','Item_Description','Quantity']
    response['data']['rows']=a
    b={}
    b['response']=response
    return b


app.run(host='0.0.0.0', port='8000', debug=True)
