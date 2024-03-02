import os
import json 
import pymongo
import random 

random.seed(42)


#turn grade into number of stars
def get_stars(grade):
    if grade=='Basic':
        return '1 Star'
    elif grade=='Fair' or grade=='Suprep':
        return '2 Stars'
    elif grade=='Good' or grade=='Fabulous':
        return '3 Stars'
    elif grade=='Very good':
        return '4 Stars'
    elif grade=='Exceptional':
        return '5 Stars'
    else:
        return '7 Stars'
    
#predict the price range based on the hotel type
def get_price_limits(number_of_stars):
    if number_of_stars == '1 Star':
        min = 300
        max = 900
    elif number_of_stars == '2 Stars':
        min = 500
        max = 1500
    elif number_of_stars == '3 Stars':
        min=1000
        max=5000
    elif number_of_stars == '4 Stars':
        min=3000
        max=7000
    elif number_of_stars == '5 Stars':
        min=5000
        max=9000
    else:
        min=7000
        max=10000

    return min, max


def add_data_to_database(mongo_url):
    #connect to database
    client = pymongo.MongoClient(mongo_url)

    #get the database we work with
    db = client['test']

    #define the collections(tables) we work with
    hotel_collection = db['hotels']
    rooms_collection = db['rooms']

    #read the saved data in json files
    file_dir = './'
    json_files = [file for file in os.listdir(file_dir) if file.endswith('.json')]


    #extract the data from each file one by one
    for json_file in json_files:
        temp = open(json_file)
        file = json.load(temp)
        print(f'uploading data of {json_file}.....')
        #go through each hotel of the hotels and get the data
        for key in file.keys():
            hotel = file[key]    
            name=key
            property_type='hotel'
            city=hotel['city']
            country=hotel['country']
            address=['address']
            distance=round(random.uniform(0.5, 50))
            photos=hotel['images']
            title=hotel
            desc=hotel['description']
            rating=hotel['average_score']
            number_of_reviewers=hotel['#reviewers'].split()[0]
            number_of_stars=get_stars(hotel['grade'])
            aminties=hotel['aminties']
            
            
            rooms=[]
            min_price, max_price = get_price_limits(number_of_stars)
            
            ratio = 1
            try:
                if (len(hotel['room_type']) != 0): 
                    ratio = (max_price-min_price) / len(hotel['room_type'])
            except:
                ratio =1

            for i in range(len(hotel['room_type'])):
                id = random.randint(1, 10^6)
                rooms.append(id)
                room_info = {
                    'id': id,
                    'type':hotel['room_type'][i],
                    'price': random.randint(int(min_price + (ratio*i)), int(min_price+(ratio*(i+1)))),
                    'maxPeople':hotel['#individual'][i],
                    'desc':'',
                    'roomNumbers': random.randint(3, 50)
                }
                rooms_collection.insert_one(room_info)

        
            
            hotel_info= {
                'name':name, 
                'type':property_type,
                'city': city,
                'country':country,
                'address': address,
                'distance': distance,
                'photos':photos,
                'title':title,
                'desc':desc,
                'rating':rating,
                'rooms':rooms, 
                'cheapestPrice':min_price, 
                'featured': True,
                'aminity':aminties,
                'numberOfReviewers': number_of_reviewers,
                'numberOfStars': number_of_stars
            }
            hotel_collection.insert_one(hotel_info)


if __name__=='__main__':
    print('start adding data to database.....')
    mongo_url = 'mongodb+srv://ahmedhesham122000:SakanDataBase@sakandatabase.8xx7paz.mongodb.net/?retryWrites=true&w=majority'
    add_data_to_database(mongo_url)
    print('data was saved successfully!')