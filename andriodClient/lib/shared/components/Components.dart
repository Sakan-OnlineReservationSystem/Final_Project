
import 'package:flutter/material.dart';
//import 'package:location/location.dart';
import 'dart:convert';
import '../network/local/Cachhelper.dart';

class UserLocation {
//  Location location = new Location();
  late bool serviceEnabled;
//  late PermissionStatus permissionGranted;
//  late LocationData locationData;
//
//   void getLocation() async {
//     serviceEnabled = await location.serviceEnabled();
//     if (!serviceEnabled) {
//       serviceEnabled = await location.requestService();
//     }
//     permissionGranted = await location.hasPermission();
//     if (permissionGranted == PermissionStatus.denied) {
//       permissionGranted = await location.requestPermission();
//     }
//     locationData = await location.getLocation();
//     // await location.getLocation().then((value) => locationData = value);
//     CachHelper.saveData(key: 'latitude', value: locationData.latitude);
//     CachHelper.saveData(key: 'longitude', value: locationData.longitude);
//   }
}
Widget defaultTextFormFieldRow({
  required TextEditingController controller,
  required String labelText ,
  required Function validatorFunction,
  required TextInputType textInputType,
  Function? suffixIconFunction,
  Icon? prefixIcon ,
  IconData? suffixIcon,
  bool isSecure = false,
}) =>
    Expanded(
      child: Container( // email address
        height: 50.0,
        child: TextFormField(
          validator: (value) {
            return validatorFunction(value);
          },
          obscureText: isSecure,
          controller: controller,
          keyboardType: textInputType,

          decoration: InputDecoration(

            labelText: labelText,
            border: OutlineInputBorder(),
            prefix: Padding(
              padding: const EdgeInsets.all(8.0),
              child: prefixIcon,
            ),
            suffixIcon: IconButton(
              icon: Icon(suffixIcon),
              onPressed: () {
                return suffixIconFunction!();
              },
            ),
          ),
        ),
      ),
    )
;

Widget defaultTextFormFieldColumn({
  required TextEditingController controller,
  required String labelText ,
  required Function validatorFunction,
  required TextInputType textInputType,
  Function? suffixIconFunction,
  Icon? prefixIcon ,
  IconData? suffixIcon,
  bool isSecure = false,
}) =>
    Container( // email address
      height: 50.0,
      child: TextFormField(
        validator: (value) {
          return validatorFunction(value);
        },
        obscureText: isSecure,
        controller: controller,
        keyboardType: textInputType,
        decoration: InputDecoration(
          labelText: labelText,
          border: OutlineInputBorder(),
          prefix: Padding(
            padding: const EdgeInsets.all(8.0),
            child: prefixIcon,
          ),
          suffixIcon: IconButton(
            icon: Icon(suffixIcon),
            onPressed: () {
              return suffixIconFunction!();
            },
          ),
        ),
      ),
    )
;

void navigateTo ({
  required BuildContext context,
  required Widget screen
}) {
  Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) =>  screen
      )
  );
}

void navigateAndFinish ({
  required BuildContext context,
  required screen
})  =>
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(
        builder: (context) => screen,
      ),
          (route) {
        return false;
      },
    );
Widget buildTextField({
  required TextEditingController controller,
  required String placeHolder,
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
      child: TextField(
        cursorColor: Colors.black,
        controller: controller,
        decoration: InputDecoration(
            border: InputBorder.none,
            hintText: '${placeHolder}'
        ),
      ),
    ),
  );
}

Map<String, dynamic> parseJwt(String token) {
  final parts = token.split('.');
  if (parts.length != 3) {
    throw Exception('invalid token');
  }

  final payload = _decodeBase64(parts[1]);
  final payloadMap = json.decode(payload);
  if (payloadMap is! Map<String, dynamic>) {
    throw Exception('invalid payload');
  }

  return payloadMap;
}

String _decodeBase64(String str) {
  String output = str.replaceAll('-', '+').replaceAll('_', '/');

  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw Exception('Illegal base64url string!"');
  }

  return utf8.decode(base64Url.decode(output));
}