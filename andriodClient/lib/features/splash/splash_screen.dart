import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hotelyn/features/home/home_screen.dart';
import 'package:hotelyn/features/onboarding/on_boarding_page.dart';
import 'package:hotelyn/features/splash/splash_cubit.dart';
import 'package:hotelyn/features/splash/splash_state.dart';
import 'package:hotelyn/shared/components/Components.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  static const route = '/splash';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocProvider(
        create: (context) => SplashCubit(),
        child: BlocConsumer<SplashCubit, SplashState>(
          listener: (context, state) {
            if (state is SplashToHome) {
              // Navigator.pushNamed(context, HomePage.route);
              navigateAndFinish(context: context, screen: const HomePage());
            }

            if (state is SplashToOnBoarding) {
              //Navigator.pushNamed(context, OnBoardingPage.route);
              navigateAndFinish(context: context, screen: const OnBoardingPage());
            }
          },
          builder: (context, state) {
            return const SplashScreenBody();
          },
        ),
      ),
    );
  }
}

class SplashScreenBody extends StatelessWidget {
  const SplashScreenBody({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Image.asset(
        fit: BoxFit.cover,
        width: 200,

        'assets/icons/logo.png',
        height: 200,
      ),
    );
  }
}
