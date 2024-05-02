import 'package:flutter/material.dart';
import 'package:hotelyn/components/theme/hotelyn_colors.dart';
import 'package:hotelyn/shared/components/Components.dart';

import 'package:intl/intl.dart';

import 'package:hotelyn/features/messages/messages_tab.dart';

class HomeTap extends StatelessWidget {
  HomeTap({super.key});

  final dist = TextEditingController();
  final fromModelController = TextEditingController();
  final toModelController = TextEditingController();
  final rooms = TextEditingController(text: '1');
  final adults = TextEditingController(text: '2');
  final children = TextEditingController(text: '0');
  final temp = TextEditingController();


  @override
  Widget build(BuildContext context,) {
    double imageSize = (MediaQuery.of(context).size.width * 120.0) / 500.0;
    //double fontSize = (MediaQuery.of(context).size.width * 20.0) / 500.0;
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 70,
        leading: const SizedBox(),
        backgroundColor: HotelynAppColors.darken(HotelynAppColors.blue4, 0.2),
        title: const Text(
          'SAKAN',
          style: TextStyle(
              fontSize: 40,
              // Style your text if needed
              color: Colors.white
          ),
        ),
        centerTitle: true,
        actions: <Widget>[
          IconButton(
            icon: const Icon(Icons.message),
            color: Colors.white,
            onPressed: () {
              // Action for the first icon
              navigateTo(context: context, screen: MessagesTab());
            },
          ),
          IconButton(
            icon: const Icon(Icons.notifications),
            color: Colors.white,
            onPressed: () {
              // Action for the second icon
            },
          ),
        ],
      ),
      body: Container(
        color: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              //mainAxisSize: MainAxisSize.min,

              children: <Widget>[
                TextField(
                  controller: dist,
                  decoration: InputDecoration(
                    hintText: 'Enter a location, property name, or address',
                    prefixIcon: const Icon(Icons.search),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                ),
                Row(
                  children: [
                    Expanded(
                        child: buildTextFieldIn(
                            controller: fromModelController,
                            placeHolder: "from",
                            validate: (value) {
                              if (value.isEmpty) {
                                return "This field is required";
                              }
                            },
                            onTapFunc: () async {
                              DateTime initialLastDate = DateTime(2100);
                              if (toModelController.text.isNotEmpty) {
                                initialLastDate =
                                    DateFormat('yyyy-MM-dd').parse(
                                        toModelController.text);
                              }
                              final DateTime? fromDate = await showDatePicker(
                                context: context,
                                initialDate: DateTime.now(),
                                lastDate: initialLastDate.isBefore(
                                    DateTime(2100))
                                    ? initialLastDate
                                    : DateTime(2100),
                                firstDate: DateTime.now(),

                              );
                              if (fromDate != null) {
                                String formattedDate = DateFormat('yyyy-MM-dd')
                                    .format(fromDate);
                                fromModelController.text = formattedDate;
                              }
                            }

                        )

                    ),
                    // const SizedBox(width: 6,),
                    Expanded(
                      child: buildTextFieldIn(
                          controller: toModelController,
                          placeHolder: "to",
                          validate: (value) {
                            if (value.isEmpty) {
                              return "This field is required";
                            }
                          },
                          onTapFunc: () async {
                            DateTime initialToDate = DateTime.now();
                            if (fromModelController.text.isNotEmpty) {
                              initialToDate = DateFormat('yyyy-MM-dd').parse(
                                  fromModelController.text);
                            }
                            final DateTime? toDate = await showDatePicker(
                              context: context,
                              initialDate: initialToDate.isAfter(DateTime.now())
                                  ? initialToDate
                                  : DateTime.now(),
                              firstDate: initialToDate.isAfter(DateTime.now())
                                  ? initialToDate
                                  : DateTime.now(),
                              lastDate: DateTime(2100),
                            );
                            if (toDate != null) {
                              String formattedDate = DateFormat('yyyy-MM-dd')
                                  .format(toDate);
                              toModelController.text = formattedDate;
                            }
                          }
                      ),
                    )
                  ],
                ),
                TextField(
                  readOnly: true,
                  controller: temp,
                  decoration: InputDecoration(
                    hintText: "${rooms.text} rooms, ${adults
                        .text} adults, ${children.text} children",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  onTap: () {
                    showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            title: const Text('Select rooms and guests'),
                            content: StatefulBuilder( // Use StatefulBuilder here
                              builder: (BuildContext context, StateSetter setState) {
                                return SingleChildScrollView(
                                  child: ListBody(
                                    children: <Widget>[
                                      Row(
                                        children: [
                                          const Text('Rooms'),
                                          IconButton(
                                            icon: const Icon(Icons.remove),
                                            color: Colors.black,
                                            onPressed: () {
                                              if (int.parse(rooms.text)>1) {
                                                setState(() { // This will now update the state within the dialog
                                                  rooms.text = (int.parse(rooms
                                                      .text) - 1).toString();
                                                });
                                              }
                                            },
                                          ),
                                          Text(
                                              style: const TextStyle(fontSize: 20),
                                              rooms.text
                                          ),
                                          IconButton(
                                            icon: const Icon(Icons.add),
                                            onPressed: () {
                                              setState(() { // This will now update the state within the dialog
                                                rooms.text = (int.parse(rooms.text) + 1).toString();
                                              });
                                            },
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          const Text('Adults'),
                                          IconButton(
                                            icon: const Icon(Icons.remove),
                                            color: Colors.black,
                                            onPressed: () {
                                              if (int.parse(adults.text)>1) {
                                                setState(() { // This will now update the state within the dialog
                                                  adults.text = (int.parse(adults
                                                      .text) - 1).toString();
                                                });
                                              }
                                            },
                                          ),
                                          Text(
                                              style: const TextStyle(fontSize: 20),
                                              adults.text
                                          ),
                                          IconButton(
                                            icon: const Icon(Icons.add),
                                            onPressed: () {
                                              setState(() { // This will now update the state within the dialog
                                                adults.text = (int.parse(adults.text) + 1).toString();
                                              });
                                            },
                                          ),
                                        ],
                                      ),
                                      Row(
                                        children: [
                                          const Text('Children'),
                                          IconButton(
                                            icon: const Icon(Icons.remove),
                                            color: Colors.black,
                                            onPressed: () {
                                              if (int.parse(children.text)>0) {
                                                setState(() { // This will now update the state within the dialog
                                                  children.text = (int.parse(children
                                                      .text) - 1).toString();
                                                });
                                              }
                                            },
                                          ),
                                          Text(
                                              style: const TextStyle(fontSize: 20),
                                              children.text
                                          ),
                                          IconButton(
                                            icon: const Icon(Icons.add),
                                            onPressed: () {
                                              setState(() { // This will now update the state within the dialog
                                                children.text = (int.parse(children.text) + 1).toString();
                                              });
                                            },
                                          ),
                                        ],
                                      ),
                                      // Add more widgets here for the content of the pop-up
                                    ],
                                  ),
                                );
                              },
                            ),
                            actions: <Widget>[
                              TextButton(
                                child: const Text('apply'),
                                onPressed: () {
                                  temp.text =
                                  "${rooms.text} rooms, ${adults.text} adults, ${children
                                      .text} children";
                                  Navigator.of(context).pop();
                                },
                              ),
                            ],
                          );
                        }
                    );

                  },
                ),
                Container(
                  width: double.infinity,
                  height: 50,
                  decoration: BoxDecoration(
                    color: Colors.blue[900],
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: TextButton(
                      child: const Text(
                        "Search",
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                      onPressed: () {

                      }
                  ),
                ),
                const SizedBox(height: 30),
                const Text(
                  textAlign: TextAlign.left,
                  style: TextStyle(
                      fontSize: 20,fontWeight: FontWeight.bold,color: Colors.black
                  ), "Browse by property type",
                ),
                //Flexible(
                //  fit: FlexFit.loose,
                //  child:
                  buildPageItem(
                    title1: 'Hotels',
                    //title2: homePageCubit.items['offerCar2']??'',
                    image: const AssetImage("assets/images/R.jpg"),//NetworkImage("https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="),
                    onTapFunc: () {
                      //navigateTo(context: context, screen: CarOfferScreen(language: language));
                      //print("Offer Car page");
                      //print("Width = ${imageSize}");
                    },
                    imageSize: imageSize,
                    single: true,
                  ),
                Row(
                  children: [
                    buildPageItem(
                      title1: 'Apartments',
                      //title2: homePageCubit.items['offerCar2']??'',
                      image: const AssetImage("assets/images/apr.jpg"),//NetworkImage("https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="),
                      onTapFunc: () {
                        //navigateTo(context: context, screen: CarOfferScreen(language: language));
                        //print("Offer Car page");
                        //print("Width = $imageSize");
                      },
                      imageSize: imageSize,
                      single: false,
                    ),
                    const SizedBox(width: 14,),
                    buildPageItem(
                      title1: 'Resorts',
                      //title2: homePageCubit.items['offerCar2']??'',
                      image: const AssetImage("assets/images/res.jpg"),//NetworkImage("https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="),
                      onTapFunc: () {
                        //navigateTo(context: context, screen: CarOfferScreen(language: language));
                        //print("Offer Car page");
                        //print("Width = ${imageSize}");
                      },
                      imageSize: imageSize,
                      single: false,
                    ),
                  ],
                ),
                Row(
                  children: [
                    buildPageItem(
                      title1: 'Villas',
                      //title2: homePageCubit.items['offerCar2']??'',
                      image: const AssetImage("assets/images/vil.jpg"),//NetworkImage("https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="),
                      onTapFunc: () {
                        //navigateTo(context: context, screen: CarOfferScreen(language: language));
                        //print("Offer Car page");
                        //print("Width = ${imageSize}");
                      },
                      imageSize: imageSize,
                      single: false,
                    ),
                    const SizedBox(width: 14,),
                    buildPageItem(
                      title1: 'cabins',
                      //title2: homePageCubit.items['offerCar2']??'',
                      image: const AssetImage("assets/images/cap.jpg"),//NetworkImage("https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="),
                      onTapFunc: () {
                        //navigateTo(context: context, screen: CarOfferScreen(language: language));
                        //print("Offer Car page");
                        //print("Width = ${imageSize}");
                      },
                      imageSize: imageSize,
                      single: false,
                    ),
                  ],
                )

                //),

              ],

            ),
          ),
        ),
      ),
      //bottomSheet:
    );
  }

  Widget buildTextFieldIn({
    required TextEditingController controller,
    required String placeHolder,
    required Function onTapFunc,
    required Function validate
  }) {
    return Container(
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5),
          border: Border.all(
              color: Colors.black
          )
      ),
      child: Padding(
        padding: const EdgeInsets.only(left: 16),
        child: TextFormField(
          onTap: () {
            onTapFunc();
          },
          validator: (value) {
            return validate(value);
          },
          cursorColor: Colors.black,
          controller: controller,
          decoration: InputDecoration(
              border: InputBorder.none,
              hintText: placeHolder
          ),
        ),
      ),
    );
  }
  Widget buildPageItem({
    required String title1,
    required image,
    required Function onTapFunc,
    required double imageSize,
    required bool single,
  }) => SizedBox(
    height: imageSize + 40, // Set a specific height for the container
    child: InkWell(
      onTap: () {
        onTapFunc();
      },
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            children: [
              Image(
                width: single? double.infinity: 2 * imageSize - 15,
                height: imageSize,
                fit: BoxFit.cover,
                image: image,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child:
                Text(
                  title1,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                    color: Colors.black,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
  );

  ImageProvider avatar(var homePageCubit){
    if(homePageCubit.usersInfo['avatar'] != ""){
      return NetworkImage('${homePageCubit.usersInfo['avatar']}');
    }
    else{
      return const AssetImage('assets/images/owner.png');
    }
  }
}