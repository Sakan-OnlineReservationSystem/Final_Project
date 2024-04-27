import 'package:flutter/material.dart';
import 'package:hotelyn/shared/components/Components.dart';
// import 'package:tawsila/shared/components/Components.dart';
// import 'package:tawsila/shared/network/local/Cachhelper.dart';
// import 'package:tawsila/shared/network/remote/DioHelper.dart';
import 'package:toast/toast.dart';

import '../VerificationScreen/verification.dart';

class ForgetPasswordScreen extends StatelessWidget {

  var emailController = TextEditingController();
  var formKey = GlobalKey<FormState>();
  static const route = '/account/forgotPass';
  ToastContext toastContext = ToastContext();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: CircleAvatar(
        radius: 30,
        child: IconButton(onPressed: () {
          toastContext.init(context);
          if(formKey.currentState!.validate()) {
            // DioHelper.postData(
            //     url: 'users/recover/identify',
            //     data: {
            //       "email": emailController.text
            //     }
            // ).then((value) async {
            //   Toast.show(
            //       "Email valid",
            //       duration: Toast.lengthShort,
            //       gravity: Toast.bottom,
            //       backgroundColor: Colors.green
            //   );
            //   await CachHelper.saveData(key: 'token', value: value.data['token']);
            //   navigateAndFinish(context: context, screen: Verification(language: 'English',reset: true,));
            // }).catchError((onError) {
            //   print(onError.toString());
            //   Toast.show(
            //       "Email Invalid",
            //       duration: Toast.lengthShort,
            //       gravity: Toast.bottom,
            //       backgroundColor: Colors.red
            //   );
            // });
            //Navigator.pushReplacementNamed(context, Verification.route);
            navigateAndFinish(context: context, screen: Verification(language: "English", reset: true));
          }
        }, icon: const Icon(Icons.arrow_right_alt_sharp),
        ),
      ),

      appBar: AppBar(
        title: const Text("Forget Password"),
      ),
      body: Form(
        key: formKey,
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextFormField(
              controller: emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: const InputDecoration(
                labelText: "Email Address",
              ),
              validator: (value) {
                if (value!.isEmpty) {
                  return "Email address is required";
                }
              },
            ),
            // child: defaultTextFormFieldColumn(
            //     controller: emailController,
            //     validatorFunction:
            //     textInputType: TextInputType.emailAddress
            // ),
          ),
        ),
      ),
    );
  }
}
