import 'package:conditional_builder_null_safety/conditional_builder_null_safety.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hotelyn/components/app_bar.dart';
import 'package:hotelyn/components/text_input/hotelyn_search_input.dart';
import 'package:hotelyn/features/search/recent_search/cubit/search_cubit.dart';
import 'package:hotelyn/features/search/recent_search/cubit/search_state.dart';

class RecentSearchTab extends StatelessWidget {
  const RecentSearchTab({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const HotelynHomeAppBar(
        title: 'Search',
        iconData: Icons.notifications,
      ),
      body: BlocConsumer<SearchCubit, SearchState>(
        listener: (context, state) {
          // TODO: implement listener
        },
        builder: (context, state) {
          return Builder(
            builder: (context) {
              return switch (state) {
                SearchInitial() => const SearchInitialScreen(),
                SearchError() => const SearchErrorScreen(),
                SearchLoading() => const SearchLoadingScreen(),
                SearchLoadSuccess() => const SearchLoadSuccessScreen()
              };
            },
          );
        },
      ),
    );
  }
}

class SearchLoadSuccessScreen extends StatelessWidget {
  const SearchLoadSuccessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Hero(
            tag: SearchCubit.searchTag,
             child: //ConditionalBuilder(
        //     condition: searchCubit.totalCount > 0,
        //     builder: (BuildContext context) {
        //       return Column(
        //         crossAxisAlignment: CrossAxisAlignment.start,
        //         children: [
        //           const HotelynSearchInput(hintText: 'Search hotel'),
        //           Padding(
        //             padding: const EdgeInsets.only(left: 18, top: 8),
        //             child: Text(
        //               "${searchCubit.totalCount} results found",
        //               style: const TextStyle(
        //                   fontSize: 20,
        //                   fontWeight: FontWeight.bold
        //               ),
        //             ),
        //           ),
        //           Expanded(
        //             child: ListView.separated(
        //                 itemBuilder: (context, index) {
        //                   return buildCar(searchCubit.cars[index],context);
        //                 },
        //                 separatorBuilder: (context, index) => const SizedBox(
        //                   height: 4,
        //                   width: double.infinity,
        //                 ),
        //                 itemCount: searchCubit.totalCount),
        //           ),
        //         ],
        //       );
        //     },
        //     fallback: (context) => ConditionalBuilder(
        //       condition: searchCubit.totalCount != 0,
        //       builder: (BuildContext context) => reload,
        //       fallback: (BuildContext context)=> const Center(child: Text("there`s no available offers")),
        //     )
        // )
             const HotelynSearchInput(hintText: 'Search hotel'),
        )
      ],
    );
  }
}

class SearchLoadingScreen extends StatelessWidget {
  const SearchLoadingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}

class SearchErrorScreen extends StatelessWidget {
  const SearchErrorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}

class SearchInitialScreen extends StatelessWidget {
  const SearchInitialScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
