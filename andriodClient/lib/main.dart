import 'package:flutter/material.dart';
import 'package:hotelyn/app.dart';
import 'package:hotelyn/shared/network/remote/DioHelper.dart';

void main() {
  DioHelper.init();
  runApp(const SAKANApp());
}
