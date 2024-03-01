import os
import json 
import pymongo
import random
import certifi
ca = certifi.where()

random.seed(42)


#turn grade into number of stars
def get_stars(grade):
    if grade.strip()=='Basic':
        return 1
    elif grade.strip()=='Fair' or grade.strip()=='Suprep':
        return 2
    elif grade.strip()=='Good' or grade.strip()=='Fabulous':
        return 3
    elif grade.strip()=='Very good':
        return 4
    elif grade.strip()=='Exceptional':
        return 5
    else:
        return 2
    
#predict the price range based on the hotel type
def get_price_limits(number_of_stars):
    if number_of_stars == '1 Star':
        min = 30
        max = 90
    elif number_of_stars == '2 Stars':
        min = 50
        max = 150
    elif number_of_stars == '3 Stars':
        min=100
        max=500
    elif number_of_stars == '4 Stars':
        min=300
        max=700
    elif number_of_stars == '5 Stars':
        min=500
        max=900
    else:
        min=700
        max=1000

    return min, max

def is_string_number(s):
    if '.' in s:
        # Check if the string is a float
        parts = s.split('.')
        if len(parts) == 2 and parts[0].isdigit() and parts[1].isdigit():
            return True
        else:
            return False
    else:
        # Check if the string is an integer
        return s.isdigit()

def add_data_to_database(mongo_url):
    #connect to database
    client = pymongo.MongoClient(mongo_url, tlsCAFile=ca)

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

        #go through each hotel of the hotels and get the data
        for key in file.keys():
            hotel = file[key]
            #print(type(hotel))
            
            name=key
            property_type='hotel'
            city=hotel['city']
            country=hotel['country']
            address=hotel['address']
            distance=round(random.uniform(0.5, 50))
            photos=hotel['images']
            #title=name
            desc=hotel['description']
            rating=2
            if (is_string_number(hotel['average_score'])):
                rating=float(hotel['average_score'])
            var = hotel['#reviewers'].split()[0]
            number_of_reviewers = 0
            if (is_string_number(var)):
                number_of_reviewers = int(var)
            number_of_stars=get_stars(hotel['grade'])
            aminties=hotel['aminties']

            rooms=[]
            min_price, max_price = get_price_limits(number_of_stars)



            for i in range(len(hotel['room_type'])):
                ratio = (max_price-min_price) / len(hotel['room_type'])
                nums = random.randint(3, 5)
                r = []
                for j in range(nums):
                    r.append({"number": j, "unavailableDates": []})
                numPeople = 2;
                if (is_string_number(hotel['#individual'][i])):
                    numPeople = int(hotel['#individual'][i])
                room_info = {
                    'type':hotel['room_type'][i],
                    'price': random.randint(int(min_price + (ratio*i)), int(min_price+(ratio*(i+1)))),
                    'maxPeople':numPeople,
                    'desc':'',
                    'roomNumbers': r
                }
                inserted_room = rooms_collection.insert_one(room_info)
                #id = random.randint(1, 10^6)
                #print(inserted_room.inserted_id)
                rooms.append(inserted_room.inserted_id)

        
            
            hotel_info= {
                'name':name, 
                'type':property_type,
                'city': city,
                'country':country,
                'address': address,
                'distance': distance,
                'photos':photos,
                #'title':title,
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
    #print("4500")
    mongo_url = 'mongodb+srv://ahmedhesham122000:SakanDataBase@sakandatabase.8xx7paz.mongodb.net/?retryWrites=true&w=majority'
    add_data_to_database(mongo_url)
    print('data was saved successfully!')