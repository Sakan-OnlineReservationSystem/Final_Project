import 'package:flutter/material.dart';

class HotelynIcon extends StatelessWidget {
  const HotelynIcon({super.key, this.width = 300, this.height = 300});

  static const path = 'assets/icons/logo.png';

  final double width;
  final double height;

  @override
  Widget build(BuildContext context) {
    return Image.asset(
      path,
      width: width,
      height: height,
    );
  }
}
