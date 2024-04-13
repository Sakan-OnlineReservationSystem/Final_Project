// import 'package:flutter/material.dart';
// import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:smooth_page_indicator/smooth_page_indicator.dart';
// import 'package:tawsila/modules/search-result/cubit/SeachCubit.dart';
// import 'package:tawsila/modules/search-result/cubit/SearchStates.dart';
// import 'package:tawsila/modules/view-car/cubit/ViewCarCubit.dart';
// import 'package:tawsila/modules/view-car/cubit/ViewCarStates.dart';
// import 'package:flutter_rating_bar/flutter_rating_bar.dart';
// import 'package:tawsila/shared/components/Components.dart';
// import 'package:url_launcher/url_launcher.dart';
//
// import '../../shared/network/local/Cachhelper.dart';
// import 'Comments.dart';
// import 'SearchResultScreen.dart';
// class ViewCarScreen extends StatelessWidget {
//   final id;
//   var title = "";
//   ViewCarScreen({super.key, required this.id,required this.title});
//
//   var boardController = PageController();
//   @override
//   Widget build(BuildContext context) {
//     return BlocProvider(
//       create: (BuildContext context) => SearchCubit()//..getUserById(id)..getCarById(id)
//         //..getUserReviewsById(id),
//       ..getCarById(id),
//       //..getuserinfo()..
//       child: BlocConsumer<SearchCubit, SearchStates>(
//         listener: (context, state) {},
//         builder: (context, state) {
//           var viewCarCubit = SearchCubit.get(context);
//           return Scaffold(
//             appBar: AppBar(
//               leading: IconButton(
//                 onPressed: () async {
//                   double latitude = await CachHelper.getData(key: "latitude") as double;
//                   double longitude = await CachHelper.getData(key: "longitude") as double;
//                   Map<String, dynamic> query = {
//                     "brands": "",
//                     "fuelTypes": "",
//                     "hasAbs": "",
//                     "hasAirConditioning": "",
//                     "hasRadio": "",
//                     "hasSunroof": "",
//                     "latitude": latitude,
//                     "longitude": longitude,
//                     "maxPrice":"",
//                     "maxYear":"",
//                     "minPrice":"",
//                     "minYear":"",
//                     "models":"",
//                     "offset": "",
//                     "seatsCount": "",
//                     "sortBy":"",
//                     "transmission":"",
//                   };
//                   navigateTo(context: context, screen: SearchResultScreen(query: query, lang: "English",));
//                   //navigateAndFinish(context: context, screen: (id: carID,));
//                 },
//                 icon: const Icon(
//                   Icons.arrow_back,
//                   color: Colors.white,
//                 ),
//               ),
//               title: Text(title.toString()),
//               backgroundColor: Colors.blue,
//             ),
//             persistentFooterButtons: [
//               Row(
//                 children: [
//                   Expanded(
//                     flex: 1,
//                     child: IconButton(
//                         onPressed: () {
//                           launch(
//                               "https://wa.me/${viewCarCubit.userInfo['phoneNumber']}?text=");
//                           //FlutterOpenWhatsapp.sendSingleMessage("${viewCarCubit.userInfo['phoneNumber']}", "Hello");
//                           print("Call whats app");
//                         },
//                         icon: const Icon(Icons.whatsapp, color: Colors.green,)
//                     ),
//                   ),
//                   Expanded(
//                     flex: 3,
//                     child: GestureDetector(
//                       onTap: () {
//                         launch("tel://${viewCarCubit.userInfo['phoneNumber']}");
//                       },
//                       child: Container(
//                         height: 40,
//                         decoration: BoxDecoration(
//                             color: Colors.black,
//                             borderRadius: BorderRadius.circular(10)
//                         ),
//                         child: Row(
//                           mainAxisAlignment: MainAxisAlignment.center,
//                           children:const [
//                             Icon(Icons.call_rounded, color: Colors.white,),
//                             Text(
//                               "Call Owner",
//                               style: TextStyle(color: Colors.white),
//                             ),
//                           ],
//                         ),
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
//             ],
//             body: SingleChildScrollView(
//               child: Padding(
//                 padding: const EdgeInsets.all(18.0),
//                 child: Column(
//                   crossAxisAlignment: CrossAxisAlignment.start,
//                   children: [
//                     Container(
//                       height: 214,
//                       decoration: BoxDecoration(
//                           borderRadius: BorderRadius.circular(10)
//                       ),
//                       child: PageView.builder(
//                         physics: BouncingScrollPhysics(),
//                         controller: boardController,
//                         itemBuilder: (context, index) {
//                           return Container(
//                             decoration: BoxDecoration(
//                                 borderRadius: BorderRadius.circular(20)
//                             ),
//                             child: Stack(
//                               children: [
//                                 Image(
//                                   // replace
//                                   //image: AssetImage(viewCarCubit.car["images"][index]),
//                                   image: NetworkImage(viewCarCubit.carResponse['images'][index]),
//                                   width: double.infinity,
//                                   height: double.infinity,
//                                   fit: BoxFit.cover,
//                                 ),
//                                 Center(
//                                   child: Column(
//                                     children: [
//                                       const Expanded(child: Text("")),
//                                       SmoothPageIndicator(
//                                         controller: boardController,
//                                         effect: const ExpandingDotsEffect(
//                                           dotColor: Colors.grey,
//                                           activeDotColor: Colors.blue,
//                                           dotHeight: 10,
//                                           expansionFactor: 4,
//                                           dotWidth: 10,
//                                           spacing: 5.0,
//                                         ),
//                                         count: viewCarCubit.count,
//                                       ),
//                                       const SizedBox(height: 6,)
//                                     ],
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           );
//                         },
//                         itemCount: viewCarCubit.count,
//                       ),
//                     ),
//                     const SizedBox(height: 10,),
//                     // owner avatar, price, year
//                     Row(
//                       children: [
//                         CircleAvatar(
//                           radius: 20,
//                           backgroundImage: NetworkImage(viewCarCubit.userInfo['avatar']??""),
//                         ),
//                         const SizedBox(width: 6,),
//                         Column(
//                           mainAxisAlignment: MainAxisAlignment.start,
//                           crossAxisAlignment: CrossAxisAlignment.start,
//                           children: [
//                             Text(
//                               // replace
//                               //"${viewCarCubit.car['ownerName']}",
//                               "${viewCarCubit.userInfo['firstName']??""} ${viewCarCubit.userInfo['lastName']??""}",
//                               style: const TextStyle(
//                                   color: Colors.black,
//                                   fontSize: 16
//                               ),
//                             ),
//                             RatingBar.builder(
//                               itemCount: 5,
//                               // replace
//                               initialRating: viewCarCubit.averageRating,
//                               ignoreGestures: true,
//                               itemSize: 20,
//                               allowHalfRating: true,
//                               itemBuilder: (context, index) {
//                                 return const Icon(
//                                   Icons.star,
//                                   color: Colors.amber,
//                                 );
//                               },
//                               onRatingUpdate: (rating) {
//                                 print(rating);
//                               },
//                             ),
//                           ],
//                         ),
//                         const Spacer(),
//                         Column(
//                           crossAxisAlignment: CrossAxisAlignment.end,
//                           children: [
//                             Row(
//                               children: [
//                                 Text(
//                                   // replace
//                                   //"${viewCarCubit.car['price']}",
//                                   "${viewCarCubit.carResponse['price']??""}",
//                                   style: const TextStyle(
//                                       color: Colors.black,
//                                       fontSize: 20,
//                                       fontWeight: FontWeight.bold
//                                   ),
//                                 ),
//                                 const SizedBox(width: 6,),
//                                 const Text(
//                                   "per day",
//                                   style: TextStyle(
//                                       color: Colors.grey,
//                                       fontSize: 20
//                                   ),
//                                 ),
//                               ],
//                             ),
//                             const SizedBox(height: 6,),
//                             Text(
//                               // replace
//                               //"${viewCarCubit.car['year']}",
//                               "${viewCarCubit.carResponse['year']??""}",
//                               style: const TextStyle(
//                                   color: Colors.black,
//                                   fontSize: 20,
//                                   fontWeight: FontWeight.bold
//                               ),
//                             ),
//                           ],
//                         ),
//                       ],
//                     ),
//                     const SizedBox(height: 10,),
//                     // car location, days
//                     Row(
//                       children: [
//                         Expanded(
//                           child: Container(
//                             height: 40,
//                             padding: const EdgeInsets.only(left: 12),
//                             decoration: BoxDecoration(
//                                 color: Colors.grey[300],
//                                 borderRadius: BorderRadius.circular(16)
//                             ),
//                             child: Row(
//                               children: [
//                                 const Icon(Icons.location_on_rounded, color: Colors.black45,),
//                                 const SizedBox(width: 12,),
//                                 Text(
//                                   // replace
//                                   //"${viewCarCubit.car['location']}",
//                                   "${viewCarCubit.carCity.split(' ')[0]}",
//                                   style: const TextStyle(
//                                     color: Colors.black45,
//                                     fontSize: 20,
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           ),
//                         ),
//                         const SizedBox(width: 12,),
//                         Expanded(
//                           child: Container(
//                             height: 40,
//                             padding: const EdgeInsets.only(left: 12),
//                             decoration: BoxDecoration(
//                                 color: Colors.grey[300],
//                                 borderRadius: BorderRadius.circular(16)
//                             ),
//                             child: Row(
//
//                               children: [
//                                 const Icon(Icons.watch_later_rounded, color: Colors.black45,),
//                                 const SizedBox(width: 12,),
//                                 Text(
//                                   // replace
//                                   //"Up to ${viewCarCubit.car['maxDays']} days",
//                                   "Up to ${viewCarCubit.carResponse['period']??""} days",
//                                   style: const TextStyle(
//                                     color: Colors.black45,
//                                     fontSize: 20,
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           ),
//                         ),
//                       ],
//                     ),
//                     const SizedBox(height: 10,),
//                     // fuel types, seats count
//                     Row(
//                       children: [
//                         Expanded(
//                           flex: 2,
//                           child: Container(
//                             height: 40,
//                             padding: const EdgeInsets.only(left: 12),
//                             decoration: BoxDecoration(
//                                 color: Colors.grey[300],
//                                 borderRadius: BorderRadius.circular(16)
//                             ),
//                             child: Row(
//                               children: [
//                                 const Icon(Icons.local_gas_station, color: Colors.black45,),
//                                 const SizedBox(width: 12,),
//                                 Text(
//                                   // replace
//                                   //"${viewCarCubit.car['fuelType']}",
//                                   "${viewCarCubit.carResponse['fuelType']??""}",
//                                   style: const TextStyle(
//                                     color: Colors.black45,
//                                     fontSize: 26,
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           ),
//                         ),
//                         const SizedBox(width: 12,),
//                         Expanded(
//                           child: Container(
//                             height: 40,
//                             padding: const EdgeInsets.only(left: 12),
//                             decoration: BoxDecoration(
//                                 color: Colors.grey[300],
//                                 borderRadius: BorderRadius.circular(16)
//                             ),
//                             child: Row(
//                               children: [
//                                 const Icon(Icons.airline_seat_recline_extra_sharp, color: Colors.black45,),
//                                 const SizedBox(width: 12,),
//                                 Text(
//                                   // replace
//                                   //"${viewCarCubit.car['seatsCount']}",
//                                   "${viewCarCubit.carResponse['seatsCount']??""}",
//                                   style: const TextStyle(
//                                     color: Colors.black45,
//                                     fontSize: 26,
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           ),
//                         ),
//                       ],
//                     ),
//                     const SizedBox(height: 10,),
//                     // transmission,
//                     Row(
//                       children: [
//                         Expanded(
//                           flex: 2,
//                           child: Container(
//                             height: 40,
//                             padding: const EdgeInsets.only(left: 12),
//                             decoration: BoxDecoration(
//                                 color: Colors.grey[300],
//                                 borderRadius: BorderRadius.circular(16)
//                             ),
//                             child: Row(
//                               children: [
//                                 const Icon(Icons.card_travel, color: Colors.black45,),
//                                 const SizedBox(width: 12,),
//                                 Text(
//                                   // replace
//                                   //"${viewCarCubit.car['gear']}",
//                                   "${viewCarCubit.carResponse['transmission']??""}",
//                                   style: const TextStyle(
//                                     color: Colors.black45,
//                                     fontSize: 26,
//                                   ),
//                                 ),
//                               ],
//                             ),
//                           ),
//                         ),
//                         const SizedBox(width: 12,),
//                         Expanded(
//                           child: Container(
//                             height: 40,
//                             padding: const EdgeInsets.only(left: 12),
//                             decoration: BoxDecoration(
//                                 color: Colors.grey[300],
//                                 borderRadius: BorderRadius.circular(16)
//                             ),
//                             child: const Icon(Icons.radio, color: Colors.black45,),
//                           ),
//                         ),
//                       ],
//                     ),
//                     const SizedBox(height: 10,),
//                     // content
//                     const Text(
//                       "Description",
//                       style: TextStyle(
//                           fontWeight: FontWeight.bold,
//                           fontSize: 24
//                       ),
//                     ),
//                     const SizedBox(height: 10,),
//                     // description content
//                     Text(
//                       // replace
//                       //"${viewCarCubit.car['description']}",
//                       "${viewCarCubit.carResponse['description']??""}",
//                     ),
//                     const SizedBox(height: 10,),
//                     TextButton(
//                         onPressed: (){navigateAndFinish(context: context, screen:
//                           TestMe(language: "English", id: viewCarCubit.userInfo['id'].toString(), carID: id, title: title,));},
//                         child: const Text(
//                           "Reviews",
//                           style: TextStyle(
//                               fontWeight: FontWeight.bold,
//                               fontSize: 24
//                           ),
//                         ),
//                     ),
//                     //const SizedBox(height: 10,),
//                     // ListView.separated(
//                     //     physics: const NeverScrollableScrollPhysics(),
//                     //     shrinkWrap: true,
//                     //     primary: false,
//                     //     // replace
//                     //     itemBuilder: (context, index) => buildReview(viewCarCubit.car['reviews'][index]),
//                     //     // itemBuilder: (context, index) => buildReview(viewCarCubit.reviews[index]),
//                     //     separatorBuilder: (context, index) => Container(
//                     //       height: 2,
//                     //       width: double.infinity,
//                     //       color: Colors.grey[300],
//                     //     ),
//                     //     // replace
//                     //     itemCount: viewCarCubit.car['reviews'].length // viewCarCubit.reviews.length
//                     // )
//                   ],
//                 ),
//               ),
//             ),
//           );
//         },
//       ),
//     );
//   }
//   // Widget buildReview(Map<String, dynamic> review) {
//   //   return Padding(
//   //     padding: const EdgeInsets.all(8.0),
//   //     child: Row(
//   //       children: [
//   //         CircleAvatar(
//   //           radius: 20,
//   //           child: Image(
//   //             // replace
//   //             //image: AssetImage(review['image']),
//   //             image: NetworkImage(review['reviewerAvatar']??""),
//   //             width: double.infinity,
//   //             height: double.infinity,
//   //             fit: BoxFit.cover,
//   //           ),
//   //         ),
//   //         const SizedBox(width: 10,),
//   //         Column(
//   //           children: [
//   //             Text(
//   //               "${review['reviewerFirstName']}  ${review['reviewerLastName']}",
//   //               style: const TextStyle(
//   //                   fontWeight: FontWeight.bold
//   //               ),
//   //             ),
//   //             const SizedBox(height: 6,),
//   //             Text(
//   //               "${review['content']}",
//   //             ),
//   //             const SizedBox(height: 6,),
//   //             RatingBar.builder(
//   //               itemCount: 5,
//   //               allowHalfRating: true,
//   //               initialRating: review['rating']/1.0,
//   //               ignoreGestures: true,
//   //               itemSize: 20,
//   //               itemBuilder: (context, index) {
//   //                 return const Icon(
//   //                   Icons.star,
//   //                   color: Colors.amber,
//   //                 );
//   //               },
//   //               onRatingUpdate: (rating) {},
//   //             ),
//   //           ],
//   //         ),
//   //
//   //       ],
//   //     ),
//   //   );
//   // }
// }
