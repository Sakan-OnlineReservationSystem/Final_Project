import pymongo
import pandas as pd
import numpy as np 


def init_recommender(property_collection):
    # get the global rating by calculating the average mean of all hotels
    pipeline = [
        {
            '$group': {
                '_id': None,
                'global_average_rating': {'$avg': '$rating'}
        }
    }
    ]
    # Execute the aggregation query
    result = list(property_collection.aggregate(pipeline))[0]  
    if result:
        global_mean = result['global_average_rating']
    else:
        global_mean = 0.0

     #update the score of each hotel   
    for property in property_collection.find({}, {'rating':1, 'numberOfReviewers':1 }):
        rate = property['rating']
        reviewers = property['numberOfReviewers']
        weight = np.sqrt(reviewers)
        if reviewers == 0:
            reviewers = 1
        
        score = (reviewers * rate + weight * global_mean)/(reviewers+weight)
    
        property_collection.update_one(
            {'_id':property['_id']},
            {'$set':{'score':score}}
        )

def build_recommender(personzlied=False):
    
    mongo_url = 'mongodb+srv://ahmedhesham122000:SakanDataBase@sakandatabase.8xx7paz.mongodb.net/?retryWrites=true&w=majority'
    client = pymongo.MongoClient(mongo_url)
    database = client['test']
    collection = database['hotels']
    
    if(not personzlied):
        init_recommender(collection)

    if (personzlied):
        pass

    

if __name__ == '__main__':
    build_recommender(True)