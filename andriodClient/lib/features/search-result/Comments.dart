import 'package:comment_box/comment/comment.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:intl/intl.dart';
import 'package:hotelyn/shared/components/Components.dart';
import 'package:hotelyn/shared/end-points.dart';
import 'package:hotelyn/shared/network/remote/DioHelper.dart';
import 'ViewCar.dart';
import 'cubit/SeachCubit.dart';
import 'cubit/SearchStates.dart';

class TestMe extends StatefulWidget {
  var language = "";
  var id = "";
  var carID = "";
  var title = "";
  TestMe({super.key ,required this.language,required this.id,required this.carID,required this.title});
  @override
  _TestMeState createState() => _TestMeState(language: language, id: id, carID: carID, title: title);
}

class _TestMeState extends State<TestMe> {
  var language = "";
  var id = "";
  var carID = "";
  var title = "";
  _TestMeState({required this.language,required this.id,required this.carID,required this.title});
  final formKey = GlobalKey<FormState>();
  final TextEditingController commentController = TextEditingController();
  List filedata = [];
  double rate = 3;
  Widget commentChild(data,viewCarCubit) {
    return ListView(
      children: <Widget>[
        for (var i = 0; i < data.length; i++)
          Padding(
            padding: const EdgeInsets.fromLTRB(2.0, 8.0, 2.0, 0.0),
            child: ListTile(
              leading: GestureDetector(
                onTap: () async {
                  // Display the image in large form.
                  print("Comment Clicked");
                },
                child: Container(
                  height: 50.0,
                  width: 50.0,
                  decoration: const BoxDecoration(
                      color: Colors.blue,
                      borderRadius: BorderRadius.all(Radius.circular(50))),
                  child: CircleAvatar(
                        radius: 50,
                        backgroundImage: avatar(data[i]['reviewerAvatar'])),
                  ),
              ),
              title: Text(
                "${data[i]['reviewerFirstName']} ${data[i]['reviewerLastName']}",
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              subtitle: Text(data[i]['content']),
              trailing: Column(
                children: [
                  const SizedBox(height: 10,),
                  Text(data[i]['updatedAt'], style: const TextStyle(fontSize: 10)),
                  RatingBar.builder(
                    itemCount: 5,
                    allowHalfRating: true,
                    initialRating: double.parse(data[i]['rating'].toString()),
                    ignoreGestures: true,
                    itemSize: 20,
                    itemBuilder: (context, index) {
                      return const Icon(
                        Icons.star,
                        color: Colors.amber,
                      );
                  },
                  onRatingUpdate: (rating) {},
                ),
                ]
              )
            ),
          ),
        button(viewCarCubit.offset, viewCarCubit.tot,viewCarCubit),
        const SizedBox(height: 70,)
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create:  (BuildContext context) => SearchCubit()..getUserById(id)
        ..getUserReviewsById(id),
      child: BlocConsumer<SearchCubit, SearchStates>(
        builder: (context, state) {
          var viewCarCubit = SearchCubit.get(context);
          filedata = viewCarCubit.reviews;
          print(filedata);
          return Scaffold(
            appBar: AppBar(
              leading: IconButton(
                onPressed: () {
                  //navigateAndFinish(context: context, screen: ViewCarScreen(id: carID, title: title,));
                },
                icon: const Icon(
                  Icons.arrow_back,
                  color: Colors.white,
                ),
              ),
              title: const Text("Review Page"),
              backgroundColor: Colors.blue,
            ),
            body: CommentBox(
              userImage: avatar(viewCarCubit.avatar),
              labelText: 'Write a comment...',
              errorText: 'Comment cannot be blank',
              withBorder: false,
              sendButtonMethod: () {
                if (formKey.currentState!.validate()) {
                  print(commentController.text);
                  setState(() {
                    filedata = viewCarCubit.reviews;
                    var value = {
                      'reviewerFirstName': viewCarCubit.tokenInfo[USERFNAME],
                      "reviewerLastName":  viewCarCubit.tokenInfo[USERFNAME],
                      'reviewerAvatar': viewCarCubit.avatar,
                      'content': commentController.text,
                      "updatedAt": DateFormat('dd-MM-yyyyTkk:mm').format(DateTime.now()),
                      "rating" :rate.toString().substring(0,1),
                    };
                    DioHelper.postDataVer(
                      url: "reviews",
                      data: {
                        "rating": rate.toString().substring(0,1),
                        "comment": commentController.text,
                        "reviewee": viewCarCubit.tokenInfo[USERID],
                      }
                      , token: viewCarCubit.token,
                    ).then((v) {
                      filedata.insert(0, Map<String, String>.from(value));
                      print(v.data);
                      commentController.clear();
                      FocusScope.of(context).unfocus();
                      //navigateAndFinish(context: context, screen: HomePageScreen(language: language));
                    }).catchError((error) {
                      print("************************************************************************");
                      print(error.toString());
                    });
                  });
                } else {
                  print("Not validated");
                }
              },
              formKey: formKey,
              commentController: commentController,
              backgroundColor: Colors.blue,
              textColor: Colors.white,
              sendWidget: const Icon(Icons.send_sharp, size: 30, color: Colors.white),
              child: Stack(
                children: [
                  commentChild(filedata,viewCarCubit),
                  Positioned(
                      bottom: 0,
                      child: Container(
                        color: Colors.blue,
                        child: RatingBar.builder(
                          initialRating: rate,
                          minRating: 1,
                          direction: Axis.horizontal,
                          allowHalfRating: false,
                          itemCount: 5,
                          itemPadding: const EdgeInsets.only(right: 45,left: 5),
                          itemBuilder: (context, _) => const Icon(
                            Icons.star,
                            color: Colors.amber,
                          ),
                          onRatingUpdate: (value) {
                            rate = value;
                            print(rate);
                          },
                        )
                      )
                  )
                ]
              ),
            ),
          );
        },
        listener: (context, state) {  },
      ),
    );
  }

  Widget button(int offset,int total,var viewCarCubit){
    if(10==viewCarCubit.tot){
      return IconButton(onPressed: (){
        print(offset+10);
        DioHelper.getData(
          url: "users/$id/reviews",
          query: {"offset":(viewCarCubit.offset)}, token: viewCarCubit.token,
        ).then((value) {
          setState(() {
          print(value.data);
          List<Map<String, dynamic>> reviews = List<Map<String, dynamic>>.from(value.data['reviews']);
          viewCarCubit.offset = value.data['offset'] + 10;
          viewCarCubit.tot = value.data['totalCount'];
          filedata = filedata..addAll(reviews);
          print(filedata.length);
          viewCarCubit.reviews = filedata;
          });
        }).catchError((error) {
          print(error.toString());
        });
      },
          icon: const Icon(
            Icons.expand_more
          )
      );
    }
    else {
      return const SizedBox(height: 2,);
    }
  }
  ImageProvider avatar(var av){
    if(av != ""){
      return NetworkImage(av);
    }
    else{
      return const AssetImage('assets/images/owner.png');
    }
  }
}
