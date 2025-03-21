import 'package:flutter/material.dart';

/// [HotelynAppColors] -
/// Our colour palette is built with our core principles and guidelines as
/// its foundation.
class HotelynAppColors {
  HotelynAppColors._();

  // Primary Colors

  static const blue = Color(0XFF3D5BF6);
  static const blue2 = Color(0XFF7F9EF9);
  static const blue3 = Color(0XFF9FB6FA);
  static Color darken(Color color, [double amount = .1]) {
    assert(amount >= 0 && amount <= 1);
    final hsl = HSLColor.fromColor(color);
    final hslDark = hsl.withLightness((hsl.lightness - amount).clamp(0.0, 1.0));
    return hslDark.toColor();
  }

// Usage
  static const blue4 = Color(0xFF3D5BF6);
  //static const darkerBlue = darken(blue4, 0.2);

  static const black = Color(0XFF151B33);
  static const black2 = Color(0XFF636667);
  static const black3 = Color(0XFF8A8D99);

  static const white = Color(0XFFFFFFFF);
  static const white2 = Color(0XFFD4D4D4);
  static const white3 = Color(0XFFAAAAAA);

  // Other Color

  static const grey = Color(0XFFA7AEC1);
  static const grey2 = Color(0XFFC4C9D6);
  static const grey3 = Color(0XFFE2E4EA);

  static const green = Color(0XFF13B97D);
  static const green2 = Color(0XFF62D0A8);
  static const green3 = Color(0XFFB0E8D4);

  static const red = Color(0XFFFF4747);
  static const red2 = Color(0XFFFF8484);
  static const red3 = Color(0XFFFFC2C2);

  static const yellow = Color(0XFFFFBA55);
  static const yellow2 = Color(0XFFFFD18E);
  static const yellow3 = Color(0XFFFFE8C6);

  static const lightGrey = Color(0XFFF9F9F9);
  static const lightGrey2 = Color(0XFFE7E7E7);
  static const lightGrey3 = Color(0XFFCFCFCF);

  // Dark Mode Color

  static const darkMode = Color(0XFF111315);
  static const darkMode2 = Color(0XFF202427);
  static const darkMode3 = Color(0XFF292E32);
}
