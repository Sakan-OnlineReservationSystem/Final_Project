import 'package:flutter/material.dart';
import 'package:hotelyn/features//log-in/SignInScreen.dart';
import 'package:hotelyn/shared/components/Components.dart';
// import 'package:tawsila/shared/components/Components.dart';
// import 'package:tawsila/shared/network/local/Cachhelper.dart';
// import 'package:tawsila/shared/network/remote/DioHelper.dart';
import 'package:toast/toast.dart';

class ResetPassword extends StatefulWidget {
  const ResetPassword({super.key});

  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  var passwordController = TextEditingController();
  var confirmPasswordController = TextEditingController();
  bool isSecurePassword = true;
  bool isSecureConfirm = true;
  var formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Reset password"),
      ),
      persistentFooterButtons: [
        Row(
          children: [
            const Text(""),
            const Spacer(),
            TextButton(
              onPressed: () async{
                // if (formKey.currentState!.validate()) {
                //   String token = await CachHelper.getData(key: 'token');
                //   DioHelper.postDataVer(
                //       url: 'users/recover/reset-password',
                //       token: token,
                //       data: {
                //         "password": passwordController.text
                //       }
                //   ).then((value) {
                //     ToastContext toastContext = ToastContext();
                //     toastContext.init(context);
                //     Toast.show(
                //         "Successful",
                //         duration: Toast.lengthShort,
                //         gravity: Toast.bottom,
                //         backgroundColor: Colors.green
                //     );
                //     navigateAndFinish(context: context, screen: SignInScreen(language: "English"));
                //   });
                //}
                //Navigator.pushReplacementNamed(context, SignInScreen.route);
                navigateAndFinish(context: context, screen: SignInScreen(language: 'English'));
              },
              child: Container(
                height: 60,
                width: 100,
                decoration: BoxDecoration(
                    color: Colors.blue,
                    borderRadius: BorderRadius.circular(10)
                ),
                child: const Center(
                  child: Text(
                    "Next",
                    style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 30
                    ),
                  ),
                ),
              ),
            )
          ],
        ),
      ],
      body: Form(
        key: formKey,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextFormField(
                controller: passwordController,
                obscureText: isSecurePassword,
                keyboardType: TextInputType.text,
                decoration: InputDecoration(
                  prefixIcon: isSecurePassword ? const Icon(Icons.lock): const Icon(Icons.lock_open),
                  labelText: "Reset Password",
                  suffixIcon: IconButton(
                    icon: Icon(isSecurePassword ? Icons.visibility_off : Icons.visibility),
                    onPressed: () {
                      setState(() {
                        isSecurePassword = !isSecurePassword;
                      });
                    },

                  )
                ),
                validator: (value) {
                  if (value!.isEmpty) {
                    return "Password is required";
                  }
                  if (value!.length < 8) {
                    return "Password should be > 7";
                  }
                },
              ),
              const SizedBox(height: 20,),
              TextFormField(
                controller: confirmPasswordController,
                keyboardType: TextInputType.text,
                obscureText: isSecureConfirm,
                decoration: InputDecoration(
                  prefixIcon: isSecureConfirm ? const Icon(Icons.lock): const Icon(Icons.lock_open),
                  labelText: "Reset Password",
                  suffixIcon: IconButton(
                    icon: Icon(isSecureConfirm ? Icons.visibility_off : Icons.visibility),
                    onPressed: () {
                      setState(() {
                        isSecureConfirm = !isSecureConfirm;
                      });
                    },
                  ),
                ),
                validator:  (value) {
                  if (value != passwordController.text) {
                    return "Passwords are not identical";
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
/*

 */
