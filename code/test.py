import mysql.connector

import json
from flask import Flask, request, jsonify

app = Flask(__name__)


# Connect to server
def executeQuery(query):
    cnx = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        password="",
        database="Test")

    # Get a cursor
    cur = cnx.cursor()

    # Execute a query

    cur.execute(query)

    # Print databases
    row = cur.fetchall()
    print("Testing show tables")
    print(row)
    # Close connection
    cnx.close()
    return json.dumps(row)



@app.route('/search')
def test():
    return executeQuery("SELECT * FROM Details LIMIT 5;")

app.run(host='0.0.0.0', port='4000', debug=True)