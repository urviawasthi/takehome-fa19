from typing import Tuple

from flask import Flask, jsonify, request, Response
import mockdb.mockdb_interface as db

app = Flask(__name__)


def create_response(
    data: dict = None, status: int = 200, message: str = ""
) -> Tuple[Response, int]:
    """Wraps response in a consistent format throughout the API.
    
    Format inspired by https://medium.com/@shazow/how-i-design-json-api-responses-71900f00f2db
    Modifications included:
    - make success a boolean since there's only 2 values
    - make message a single string since we will only use one message per response
    IMPORTANT: data must be a dictionary where:
    - the key is the name of the type of data
    - the value is the data itself

    :param data <str> optional data
    :param status <int> optional status code, defaults to 200
    :param message <str> optional message
    :returns tuple of Flask Response and int, which is what flask expects for a response
    """
    if type(data) is not dict and data is not None:
        raise TypeError("Data should be a dictionary 😞")

    response = {
        "code": status,
        "success": 200 <= status < 300,
        "message": message,
        "result": data,
    }
    return jsonify(response), status


"""
~~~~~~~~~~~~ API ~~~~~~~~~~~~
"""


@app.route("/")
def hello_world():
    return create_response({"content": "hello huh!"})


@app.route("/mirror/<name>")
def mirror(name):
    data = {"name": name}
    return create_response(data)

@app.route("/contacts", methods=['GET'])
def get_contacts():
    hobby = request.args.get('hobby')  
    if (hobby is None):
        return create_response({"contacts": db.get('contacts')})
    if db.getByHobby('contacts', hobby) is None:
        return create_response(status=404, message="No contact with this id exists")
    return create_response({"contacts": db.getByHobby('contacts', hobby)}) 
    

@app.route("/shows/<id>", methods=['DELETE'])
def delete_show(id):
    if db.getById('contacts', int(id)) is None:
        return create_response(status=404, message="No contact with this id exists")
    db.deleteById('contacts', int(id))
    return create_response(message="Contact deleted")


# TODO: Implement the rest of the API here!
@app.route("/contacts/<id>", methods=['GET'])
def getContactId(id): 
	return create_response({"contacts": db.getById('contacts', int(id))})

@app.route("/contacts", methods=['POST'])
def createContact(): 
    name = request.json.get("name"); 
    nickname = request.json.get("nickname"); 
    hobby = request.json.get("hobby"); 
    if name is None: 
        return create_response(status=404, message="No name provided")
    if nickname is None: 
        return create_response(status=404, message="No nickname provided")
    if hobby is None: 
        return create_response(status=404, message="No hobby provided")    
    db.create('contacts', {"name": name, "nickname": nickname, "hobby": hobby}); 
    return create_response(status = 201, data = {"contacts": db.get('contacts')})

"""
~~~~~~~~~~~~ END API ~~~~~~~~~~~~
"""
if __name__ == "__main__":
    app.run(port=8080, debug=True)
