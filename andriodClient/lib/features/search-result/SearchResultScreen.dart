import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hotelyn/features/search-result/cubit/SeachCubit.dart';
import 'package:hotelyn/features/search-result/cubit/SearchStates.dart';

import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:hotelyn/components/theme/hotelyn_colors.dart';
//import 'ViewCar.dart';
/*
  Map<String, dynamic> query = {
    "brands": "",
    "fuelTypes": "",
    "hasAbs": false,
    "hasAirConditioning": false,
    "hasRadio": false,
    "hasSunroof": false,
    "latitude": searchCubit.latitude,
    "longitude": searchCubit.longitude,
    "maxPrice":"",
    "maxYear":"",
    "minPrice":"",
    "minYear":"",
    "models":"",
    "offset": 0,
    "seatsCount": 0,
    "sortBy":"",
    "transmission":"",
  };
 */
class SearchResultScreen extends StatelessWidget {
  final Map<String, dynamic> query;
  var lang="";
  SearchResultScreen({super.key, required this.query,required this.lang});
  Widget reload = const Center(child: CircularProgressIndicator());
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      //create: (BuildContext context) => SearchCubit()..getLocation()..getData(query: query),
      create: (BuildContext context) =>SearchCubit()..getData(query: query),
      child: BlocConsumer<SearchCubit, SearchStates>(
        listener: (context, state) {},
        builder:(context, state) {
          var searchCubit = SearchCubit.get(context);
          return Scaffold(
            appBar: AppBar(
              toolbarHeight: 70,
              //leading: const SizedBox(),
              backgroundColor: HotelynAppColors.darken(HotelynAppColors.blue4, 0.2),
              title: const Text(
                'Recommended for you',
                style: TextStyle(
                    fontSize: 20,
                    // Style your text if needed
                    color: Colors.white
                ),
              ),
              centerTitle: false,
              actions: const <Widget>[],
            ),
            body: ConditionalBuilder(
              condition: searchCubit.totalCount > 0,
              builder: (BuildContext context) {
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 18, top: 8),
                      child: Text(
                        "${searchCubit.totalCount} results found",
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold
                        ),
                      ),
                    ),
                    Expanded(
                      child: ListView.separated(
                          itemBuilder: (context, index) {
                            //if (index == 3 ) print(searchCubit.items[index]) ;
                            return buildCar(searchCubit.items[index==3? 2:index],context);
                          },
                          separatorBuilder: (context, index) => const SizedBox(
                            height: 4,
                            width: double.infinity,
                          ),
                          itemCount: searchCubit.totalCount),
                    ),
                  ],
                );
              },
              fallback: (context) => ConditionalBuilder(
                condition: searchCubit.totalCount != 0,
                builder: (BuildContext context) => reload,
                fallback: (BuildContext context)=> const Center(child: Text("there`s no available offers")),
              )//(context) => reload,
            ),
          );
        }
      ),
    );
  }


  Widget buildCar(Map<String, dynamic> hotel,var context) {
    return Padding(
      padding: const EdgeInsets.only(left: 18, right: 18, top: 10),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
        ),
        height: 200,
        child: InkWell(
          onTap: () {
            //navigateTo(context: context, screen: ViewCarScreen(id: '${car['id']}', title: '${car['brand']} ${car['model']}',));
          },
          child: Stack(
            children: [
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(width: 3),
                  gradient: const LinearGradient(
                    colors: [Colors.black, Colors.black54],
                    begin: Alignment.bottomCenter,
                    end: Alignment.center
                  ),
                ),
                child: Image(
                  image: NetworkImage('${hotel['photos'][0]}'),
                  width: double.infinity,
                  height: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
              Column(
                children: [
                  const Expanded(child: Text("")),
                  Padding(
                    padding: const EdgeInsets.only(left: 8, right: 8),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Text(
                              hotel['name'].substring(0,hotel['name'].length > 20 ? 20: hotel['name'].length),
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 25,
                              ),
                            ),
                            const SizedBox(height: 10,),
                          ],
                        ),
                        Row(
                          children:  [
                            const Icon(Icons.ac_unit, color: Colors.white,),
                            Text(
                              "${hotel['country']}.  ${hotel['city']} ",
                              style: const TextStyle(
                                color: Colors.white,
                                // fontWeight: FontWeight.bold,
                                fontSize: 25,
                              ),
                            ),
                            const Spacer(),
                            Text(
                              "${hotel['cheapestPrice']} EGP",
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 20,
                              ),
                            ),
                          ],
                        ),
                        Row(
                          children:  [
                            Text(
                              hotel['type'],
                              style: const TextStyle(
                                color: Colors.white,
                                // fontWeight: FontWeight.bold,
                                fontSize: 20,
                              ),
                            ),
                            const Spacer(),
                            const Text(
                              "per night",
                              style: TextStyle(
                                color: Colors.white,
                                // fontWeight: FontWeight.bold,
                                fontSize: 20,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10,),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}