import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:geocoding/geocoding.dart';
import 'package:get/get.dart';
import 'package:hotelyn/features/search-result/cubit/SearchStates.dart';
import 'package:hotelyn/shared/end-points.dart';
import 'package:hotelyn/shared/network/remote/DioHelper.dart';
import 'package:toast/toast.dart';

import '../../../shared/components/Components.dart';
import '../../../shared/network/local/Cachhelper.dart';
import 'SearchStates.dart';

class SearchCubit extends Cubit<SearchStates> {

  SearchCubit(): super(InitialSearchStates());

  static SearchCubit get(context) => BlocProvider.of(context);

  late List items;
  int totalCount = -1;
  double latitude = 0.0;
  double longitude = 0.0;


  void getLocation() async {
    //latitude = await CachHelper.getData(key: "latitude") as double;
    //longitude = await CachHelper.getData(key: "longitude") as double;
  }
  void getData({
  required Map<String, dynamic> query
  }) async {
    print("i am heeeeerrrrrreeeee");
    //String token = await CachHelper.getData(key: 'token');
    print("out of herrrrrrrrrrrrre");
    await DioHelper.getData2(url: '/hotels?featured=true&limit=4')//,token:  token,query: query)
        .then((value) {
          //print("lalalalaalallalallaalaalla");
          items = value.data;//['cars'];
          print("data: ${value.data}");
          totalCount = 4;//value.data['totalCount'] as int;
          print(items.length);
          emit(state);
         });
  }

  Map<String, dynamic> car = {
    "images": [
      "assets/images/2.png",
      "assets/images/2.png",
      "assets/images/2.png",
      "assets/images/2.png",
    ],// avatar
    "ownerImage": "assets/images/owner.png",
    "ownerName": "Salah Ahmed",
    "price": "500",
    "location": "Alexandria",
    "maxDays": 3,
    "fuelType": "Natural Gas",
    "seatsCount": 4,
    "year": 2022,
    "air": true,
    "radio": true,
    "gear": "Manual",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "reviews": [
      {
        "content": "Very good car",
        "reviewerAvatar": "assts/images/1.png",
        "reviewerFirstName": "Salah",
        "reviewerLastName": "Ahmed",
        "updatedAt": "12/2/2022 1:06:16 AM",
        "rating" : "5",
      },
      {
        "content": "bla bla bla",
        "reviewerAvatar": "assets/images/2.png",
        "reviewerFirstName": "Salah",
        "reviewerLastName": "Ahmed",
        "updatedAt": "12/2/2022 1:06:16 AM",
        "rating" : "4",
      },
      {
        "content": "Nice car",
        "reviewerAvatar": "assets/images/owner.png",
        "reviewerFirstName": "Salah",
        "reviewerLastName": "Ahmed",
        "updatedAt": "12/2/2022 1:06:16 AM",
        "rating" : "3",
      },
    ]
  };
  Map<String, dynamic> tokenInfo={};
  Map<String, dynamic> userInfo = {};
  var avatar="";
  Future<void> getUserById(id) async {
    //emit(GetUserByIDState());
    String token = await CachHelper.getData(key: 'token') as String;
    tokenInfo = parseJwt(token);
    DioHelper.getData(
      url: "users/${id}",
      query: {
      }, token: token,
    ).then((value) {
      print("useeeeeeeeeeeeeeeeeeeeeeeeeeer");
      print(value.data);
      userInfo = value.data['users'][0];
      emit(GetUserByIdSuccessState());
    }).catchError((error) {
    });
  }
  var count = 1;
  List<Map<String, dynamic>> reviews = [];
  double averageRating = 0;
  int offset = 0;
  String token="";
  int tot = 0;
  Future<void> getUserReviewsById(id) async {
    emit(GetUserReviewsByIDState());
    token = await CachHelper.getData(key: 'token') as String;
    avatar = await CachHelper.getData(key: 'avatar') as String;
    DioHelper.getData(
      url: "users/${id}/reviews",
      query: {
      }, token: token,
    ).then((value) {

      reviews = List<Map<String, dynamic>>.from(value.data['reviews']);
      print(reviews);
      //print("whuuuuuuuuuuuuuuuuuuuuuuuu");
      averageRating = value.data['averageRating'];
      offset = value.data['offset'] + value.data['totalCount'];
      tot = value.data['totalCount'];
      //print("reeeeeviewwwwwwwwwwwwwwwwwwwwww");
      print(tot);
      emit(GetUserReviewsByIdSuccessState());
    }).catchError((error) {
      print(error.toString());
    });
  }
  Map<String, dynamic> carResponse = {};
  String carCity = "";
  Future<void> getCarById(id)  async {
    print(id);
    token = await CachHelper.getData(key: 'token') as String;
    DioHelper.getData(
        url: 'cars/${id}',
        token: token,
        query: {}
    ).then((value) async {
      print("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
      print(value.data);
      carResponse = value.data;
      double carLatitude = value.data['latitude'];
      double carLongitude = value.data['longitude'];
      List<Placemark> placemarks = await placemarkFromCoordinates(carLatitude, carLongitude);
      carCity = placemarks[0].administrativeArea as String;
      await getUserById(value.data['ownerId']);
      count = value.data['images'].length;
      await getUserReviewsById(value.data['ownerId']);
      emit(GetCarSuccessState());
    });
  }
  void review({
    required Map<String, dynamic> query
  }) async{
    print("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
    print(tokenInfo);
    print(token.toString());
    print(query);

  }
}