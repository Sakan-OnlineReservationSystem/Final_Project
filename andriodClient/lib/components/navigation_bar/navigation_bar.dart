import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'navigation_bar_cubit.dart';

class HotelynNavigationBar extends StatelessWidget {
  const HotelynNavigationBar({super.key});

  @override
  Widget build(BuildContext context) {
    final cubit = context.watch<NavigationBarCubit>();
    return PopScope(
      canPop: false,
      onPopInvoked: (bool) => {
        cubit.updateSelectedIndex(0)
      }
      ,
      child: BottomNavigationBar(
        onTap: (index) => cubit.updateSelectedIndex(index),
        currentIndex: cubit.state.selectedTabIndex,
        showSelectedLabels: true,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.recommend),
            label: 'For you',
          ),
          // BottomNavigationBarItem(
          //   icon: Icon(Icons.message),
          //   label: 'Messages',
          // ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            label: 'Profile',
          )
        ],
      ),
    );
  }
}
