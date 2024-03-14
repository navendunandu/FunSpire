from flask import Flask,jsonify,request,make_response,send_from_directory

from flask_cors import CORS
from functools import wraps
from pymongo import MongoClient
from werkzeug.utils import secure_filename
import os
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util,ObjectId
from datetime import datetime, timedelta
app=Flask(__name__)

CORS(app)
cors=CORS(app, resources={
    r"/*":{
        "origins":"*"
    }
})
app.config['SECRET_KEY'] = 'thisissecret'

app.config['MONGO_URI'] = 'mongodb://localhost:27017/funspire'
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
mongo = MongoClient(app.config['MONGO_URI'])
db = mongo.funspire

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def token_required(t):
    @wraps(t)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user =  db.tbl_user.find_one({"_id":ObjectId(data['user_id'])})
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return t(current_user, *args, **kwargs)

    return decorated

@app.route('/activitytype',methods=['POST'])
def add_data():
    data=request.json
    #print(data)
    db.tbl_activitytype.insert_one(data)
    return "Data added successfully!"

@app.route('/eventtype',methods=['POST'])
def add_eventtype():
    data=request.json
    #print(data)
    db.tbl_eventtype.insert_one(data)
    return "Data added successfully!"


@app.route('/eventtype', methods=['GET'])
def retriveeventdata(): 
    cursor = db.tbl_eventtype.find()
    serialized_data = json_util.dumps(cursor)
    return serialized_data

@app.route('/eventtype/<string:id>',methods=['DELETE'])
def deleteeventtype(id):
   
   
    result = db.tbl_eventtype.delete_one({'_id': ObjectId(id)})

    if result.deleted_count == 1:
        response = {'message': 'Data deleted successfully'}
    else:
        response = {'message': 'Data not found'}

    return jsonify(response), 200
@app.route('/activity', methods=['POST'])
def add_activity():
    form_data = request.form.to_dict(flat=True)

    modified_data = {}

    try:
        modified_data['type'] = ObjectId(form_data['type'])
    except Exception as e:
        return f"Invalid 'type' ObjectId: {str(e)}", 400
    if request.files:
        file = request.files['photo']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

        modified_data['activityname'] = form_data['activityname']
        modified_data['hours'] = form_data['hours']
        modified_data['days'] = form_data['days']
        modified_data['area'] = form_data['area']
        modified_data['price'] = form_data['price']
        modified_data['site'] = form_data['site']
        modified_data['address'] = form_data['address']
        modified_data['pindode'] = form_data['pindode']
        modified_data['contact'] = form_data['contact']
        modified_data['latitude'] = form_data['latitude']
        modified_data['longtitude'] = form_data['longtitude']
        modified_data['photo'] = filename

        
        db.tbl_activity.insert_one(modified_data)

        return "Data added successfully!"
    else:
        modified_data['activityname'] = form_data['activityname']
        modified_data['hours'] = form_data['hours']
        modified_data['days'] = form_data['days']
        modified_data['area'] = form_data['area']
        modified_data['price'] = form_data['price']
        modified_data['site'] = form_data['site']
        modified_data['address'] = form_data['address']
        modified_data['pindode'] = form_data['pindode']
        modified_data['contact'] = form_data['contact']
        modified_data['latitude'] = form_data['latitude']
        modified_data['longtitude'] = form_data['longtitude']
       

        
        db.tbl_activity.insert_one(modified_data)

        return "Data added successfully!"

@app.route('/activitytype', methods=['GET'])
def retrivedata():
   
    
    cursor = db.tbl_activitytype.find()
    serialized_data = json_util.dumps(cursor)
    return serialized_data
@app.route('/activitytype/<string:id>',methods=['DELETE'])
def deleteactivitytype(id):
   
   
    result = db.tbl_activitytype.delete_one({'_id': ObjectId(id)})

    if result.deleted_count == 1:
        response = {'message': 'Data deleted successfully'}
    else:
        response = {'message': 'Data not found'}

    return jsonify(response), 200

    
    # Return the list as a JSON response


@app.route('/event',methods=['POST'])
def add_events():
    form_data = request.form.to_dict(flat=True)

    modified_data = {}

    try:
        modified_data['type'] = ObjectId(form_data['type'])
    except Exception as e:
        return f"Invalid 'type' ObjectId: {str(e)}", 400
    if request.files:
        file = request.files['photo']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)

        modified_data['Eventname'] = form_data['Eventname']
        modified_data['hours'] = form_data['hours']
        modified_data['days'] = form_data['days']
        modified_data['area'] = form_data['area']
        modified_data['price'] = form_data['price']
        modified_data['site'] = form_data['site']
        modified_data['address'] = form_data['address']
        modified_data['pindode'] = form_data['pindode']
        modified_data['contact'] = form_data['contact']
        modified_data['latitude'] = form_data['latitude']
        modified_data['longtitude'] = form_data['longtitude']
        modified_data['photo'] = filename
        db.tbl_events.insert_one(modified_data)
    else:
        modified_data['Eventname'] = form_data['Eventname']
        modified_data['hours'] = form_data['hours']
        modified_data['days'] = form_data['days']
        modified_data['area'] = form_data['area']
        modified_data['price'] = form_data['price']
        modified_data['site'] = form_data['site']
        modified_data['address'] = form_data['address']
        modified_data['pindode'] = form_data['pindode']
        modified_data['contact'] = form_data['contact']
        modified_data['latitude'] = form_data['latitude']
        modified_data['longtitude'] = form_data['longtitude']
        
        db.tbl_events.insert_one(modified_data)
    return "Data added successfully!"



@app.route('/event', methods=['GET'])
def geteventdata(): 
    #cursor = db.tbl_events.find()
    pipeline = [
        {
            '$lookup': {
                'from': 'tbl_eventtype',
                'localField': 'type',
                'foreignField': '_id',
                'as': 'typeinfo'
            }
        }
    ]

    cursor = db.tbl_events.aggregate(pipeline)
    result = list(cursor)

    # Convert ObjectId instances to strings using json_util
    json_result = json_util.dumps(result)

    return json_result

@app.route('/activity', methods=['GET'])
def getactivitydata(): 
    pipeline = [
        {
            '$lookup': {
                'from': 'tbl_activitytype',
                'localField': 'type',
                'foreignField': '_id',
                'as': 'typeinfo'
            }
        }
    ]

    cursor = db.tbl_activity.aggregate(pipeline)
    result = list(cursor)

    # Convert ObjectId instances to strings using json_util
    json_result = json_util.dumps(result)

    return json_result

@app.route('/user',methods=['POST'])
def add_users():
    data=request.json
    #print(data)
    data['password']= generate_password_hash(data['password'], method='sha256')
    db.tbl_user.insert_one(data)
    return "Data added successfully!"
@app.route('/login/<string:emails>/<string:passwords>', methods =['GET'])

def login(emails,passwords):
   
    user = db.tbl_user.find_one({'email':emails})
    users=db.tbl_user.find_one({'email':emails,'status':1})

    if users:
        if check_password_hash(users['password'], passwords):
            token = jwt.encode({
    'user_id': str(users['_id']),  # Convert ObjectId to string
    'username': users['name'],
    'expiration': str(datetime.utcnow() + timedelta(minutes=120))
}, app.config['SECRET_KEY'])
            json_result = json_util.dumps(({'token' : token,'username':user['name'],'email':user['email'],'password':user['password'],'login':"users"}))
            return json_result
        else:
            return make_response ({'error':"Passwords doesnt match!"})
    elif user:
        if check_password_hash(user['password'], passwords):
            token = jwt.encode({
    'user_id': str(user['_id']),  # Convert ObjectId to string
    'username': user['name'],
    'expiration': str(datetime.utcnow() + timedelta(minutes=120))
}, app.config['SECRET_KEY'])
            json_result = json_util.dumps(({'token' : token,'username':user['name'],'email':user['email'],'password':user['password'],'login':"user"}))
            return json_result
        else:
            return make_response ({'error':"Passwords doesnt match!"})
    else:
        return make_response ({'error':"Invalid LogIn!Register"})


@app.route('/activity/<string:id>',methods=['DELETE'])
def deleteactivity(id):
   
   
    result = db.tbl_activity.delete_one({'_id': ObjectId(id)})

    if result.deleted_count == 1:
        response = {'message': 'Data deleted successfully'}
    else:
        response = {'message': 'Data not found'}

    return jsonify(response), 200

@app.route('/event/<string:id>',methods=['DELETE'])
def deleteevent(id):
   
   
    result = db.tbl_events.delete_one({'_id': ObjectId(id)})

    if result.deleted_count == 1:
        response = {'message': 'Data deleted successfully'}
    else:
        response = {'message': 'Data not found'}

    return jsonify(response), 200

@app.route('/interest',methods=['POST'])
@token_required
def add_interst(current_user):
    data=request.json
    data['user_id']=(current_user['_id'])
    db.tbl_interest.insert_one(data)    
    uerdata=db.tbl_user.update_one({'_id':ObjectId(current_user['_id'])},{'$set':{'status':1}})
    if uerdata.modified_count > 0:
            return jsonify({'message': 'Field updated successfully'})
    else:
            return jsonify({'message': 'No changes applied'})

@app.route('/results', methods=['GET'])
@token_required
def retriveresultsc(current_user):
    #interst
    interestdata=db.tbl_interest.find_one({'user_id':ObjectId(current_user['_id'])})
    #print(interestdata['interst'])
    
    #print(eventtype)
    if interestdata['typeofintrest']=="events":
        eventtype=db.tbl_eventtype.find_one({'Eventtype_name':interestdata['interst']})
        if interestdata['areaofinterest']=="Outdoor":
            eventdata=db.tbl_events.find({'area':"Outdoor",'type':eventtype['_id']})
            #print(type(eventdata))
            serialized_data = json_util.dumps(eventdata)
            return serialized_data
        else:
            eventdata=db.tbl_events.find({'area':"Indoor",'type':eventtype['_id']})
            #print(type(eventdata))
            serialized_data = json_util.dumps(eventdata)
            return serialized_data
    else:
        activitytype=db.tbl_activitytype.find_one({'activitytype_name':interestdata['interst']})
        if interestdata['areaofinterest']=="Outdoor":
            activitydata=db.tbl_activity.find({'area':"Outdoor",'type':activitytype['_id']})
            #print(type(activitydata))
            serialized_data = json_util.dumps(activitydata)
            return serialized_data
        else:
            activitydata=db.tbl_activity.find({'area':"Indoor",'type':activitytype['_id']})
            #print(type(activitydata))
            serialized_data = json_util.dumps(activitydata)
            return serialized_data
    #cursor = db.tbl_activitytype.find()

@app.route('/userprofile', methods=['GET'])
@token_required
def userprofile(current_user):
    userdata=db.tbl_user.find_one({'_id':ObjectId(current_user['_id'])})
    serialized_data=json_util.dumps(userdata)
    return serialized_data

@app.route('/eventwishlist',methods=['POST'])
@token_required
def add_eventwishlist(current_user): 
    data=request.json
    act=data['eventid']['$oid']
    data['eventid']=ObjectId(act)
    data['user_id']=ObjectId(current_user['_id'])
    db.tbl_eventwishlist.insert_one(data)
    return "Data added successfully!"


@app.route('/uploads/<path:filename>')
def serve_static(filename):
    return send_from_directory('uploads', filename)

@app.route('/activitywishlist',methods=['POST'])
@token_required
def add_activitywishlist(current_user):
    data=request.json
    act=data['activityid']['$oid']
    data['activityid']=ObjectId(act)
    data['user_id']=ObjectId(current_user['_id'])
    
   
    
    db.tbl_activitywishlist.insert_one(data)
    return "Data added successfully!"
@app.route('/eventswishlist', methods=['GET'])
@token_required
def vieweventwishlist(current_user):
    data=[]
    ids=[]
    l=[]
    userdata=db.tbl_eventwishlist.find({'user_id':ObjectId(current_user['_id'])})
    for i in userdata:
        l.append(i['eventid'])
    print(len(l))
    for i in l:
        ids.append(i)
    print(ids)
    for j in ids:
        datas={}
        dt=db.tbl_events.find_one({'_id':j})
        if dt is not None:
            datas['_id']=dt['_id']
            datas['Eventname']=dt['Eventname']
            datas['hours']=dt['hours']
            datas['days']=dt['days']
            datas['price']=dt['price']
            datas['site']=dt['site']
            datas['address']=dt['address']
            datas['pincode']=dt['pindode']
            datas['contact']=dt['contact']
            datas['area']=dt['area']

            data.append(datas)
    serialized_data=json_util.dumps(data)
    return serialized_data
@app.route('/activitywishlist', methods=['GET'])
@token_required
def viewactivitywishlist(current_user):
   
    data=[]
    ids=[]
    l=[]
    userdata=db.tbl_activitywishlist.find({'user_id':ObjectId(current_user['_id'])})
    for i in userdata:
        l.append(i['activityid'])
    print(len(l))
    for i in l:
        ids.append(i)
    print(ids)
    for j in ids:
        datas={}
        dt=db.tbl_activity.find_one({'_id':j})
        if dt is not None:
            datas['_id']=dt['_id']
            datas['activityname']=dt['activityname']
            datas['hours']=dt['hours']
            datas['days']=dt['days']
            datas['price']=dt['price']
            datas['site']=dt['site']
            datas['address']=dt['address']
            datas['pincode']=dt['pindode']
            datas['contact']=dt['contact']
            datas['area']=dt['area']

            data.append(datas)
    serialized_data=json_util.dumps(data)
    return serialized_data
    
@app.route('/deleteIntrest',methods=['DELETE'])
@token_required
def deleteInterest(current_user):
   
   
    result = db.tbl_interest.delete_one({'user_id': ObjectId(current_user['_id'])})

    if result.deleted_count == 1:
        response = {'message': 'Data deleted successfully'}
    else:
        response = {'message': 'Data not found'}

    return jsonify(response), 200

@app.route('/activitywishlist/<string:id>',methods=['DELETE'])
@token_required
def deleteactivitywishlist(current_user,id):
   
   
    result = db.tbl_activitywishlist.delete_one({'user_id': ObjectId(current_user['_id']),'activityid':ObjectId(id)})

    if result.deleted_count == 1:   
        response = {'message': 'Data deleted successfully'}
    else:
        response = {'message': 'Data not found'}

    return jsonify(response), 200

@app.route('/eventwishlist/<string:id>',methods=['DELETE'])
@token_required
def deleteeventwishlist(current_user,id):
   
   
    result = db.tbl_eventwishlist.delete_one({'user_id': ObjectId(current_user['_id']),'eventid':ObjectId(id)})

    if result.deleted_count == 1:
        response = {'message': 'Data deleted successfully'}
    else:
        response = {'message': 'Data not found'}

    return jsonify(response), 200

@app.route('/checkwishlist/<string:id>',methods=['GET'])
@token_required
def checkwishlist(current_user,id):
   
    print(id)
    result = db.tbl_eventwishlist.find_one({'user_id': ObjectId(current_user['_id']),'eventid':ObjectId(id)})

    result1 = db.tbl_activitywishlist.find_one({'user_id': ObjectId(current_user['_id']),'activityid':ObjectId(id)})
    if result:
        response = {'message':True}
    elif result1:
        response = {'message':True}
    else:
        response = {'message': False}
    return response
 
    
if __name__=="__main__":
    app.run(debug=True)