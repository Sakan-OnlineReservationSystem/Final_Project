import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hotelyn/features/home/home_screen.dart';
import 'package:hotelyn/shared/components/Components.dart';
// import 'package:tawsila/shared/components/Components.dart';
// import 'package:tawsila/shared/network/local/Cachhelper.dart';
// import 'package:tawsila/shared/network/remote/DioHelper.dart';
import 'package:toast/toast.dart';

import '../forget-password/RestPassword.dart';
import '../signup/cubit/SignUpCubit.dart';
import '../signup/cubit/SignUpStates.dart';



class Verification extends StatelessWidget{
  final String language;
  final bool reset;
  static const route = '/account/verify';
  String res = "ffffff";
  Verification({super.key, required this.language, required this.reset});
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
        create: (context) => SignUpCubit()..setLanguage(l: language)..readJson('verify'),
        child: BlocConsumer<SignUpCubit, SignUpStates>(
            listener: (context, state) {},
            builder: (context, state) {
              var signUpCubit = SignUpCubit.get(context);
              ToastContext toast = ToastContext();
              return Scaffold(
                  body: SingleChildScrollView(
                    child: Column(
                      children: [
                        const SizedBox(height: 40,),
                        const Image( height: 200,width: 300,
                            image: AssetImage('assets/images/verify.png')),
                        Text(
                          "${signUpCubit.items['verify']??'error'}",
                          style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 60,
                              color: Colors.black
                          ),),
                        Text(
                          "${signUpCubit.items['info']??'error'}",
                          style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 30,
                              color: Colors.black
                          ),),
                        Row(mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            SizedBox(
                              height: 60,
                              width: 60,
                              child: TextFormField(
                                onChanged: (value){
                                  if(value.length == 1) {
                                    res = replaceCharAt(res, 0, value);
                                    FocusScope.of(context).nextFocus();
                                  }
                                },
                                decoration: const InputDecoration(hintText: "-"),
                                style: Theme.of(context).textTheme.titleLarge,
                                keyboardType: TextInputType.number,
                                textAlign: TextAlign.center,
                                inputFormatters: [
                                  LengthLimitingTextInputFormatter(1),
                                  FilteringTextInputFormatter.digitsOnly,
                                ],
                    
                              ),
                            ),
                            SizedBox(
                              height: 60,
                              width: 60,
                              child: TextFormField(
                                onChanged: (value){
                                  if(value.length == 1) {
                                    res = replaceCharAt(res, 1, value);
                                    FocusScope.of(context).nextFocus();
                                  }
                                },
                                decoration: const InputDecoration(hintText: "-"),
                                style: Theme.of(context).textTheme.titleLarge,
                                keyboardType: TextInputType.number,
                                textAlign: TextAlign.center,
                                inputFormatters: [
                                  LengthLimitingTextInputFormatter(1),
                                  FilteringTextInputFormatter.digitsOnly,
                                ],
                    
                              ),
                            ),
                            SizedBox(
                              height: 60,
                              width: 60,
                              child: TextFormField(
                                onChanged: (value){
                                  if(value.length == 1) {
                                    res = replaceCharAt(res, 2, value);
                                    FocusScope.of(context).nextFocus();
                                  }
                                },
                                decoration: const InputDecoration(hintText: "-"),
                                style: Theme.of(context).textTheme.titleLarge,
                                keyboardType: TextInputType.number,
                                textAlign: TextAlign.center,
                                inputFormatters: [
                                  LengthLimitingTextInputFormatter(1),
                                  FilteringTextInputFormatter.digitsOnly,
                                ],
                    
                              ),
                            ),
                            SizedBox(
                              height: 60,
                              width: 60,
                              child: TextFormField(
                                onChanged: (value){
                                  if(value.length == 1) {
                                    res = replaceCharAt(res, 3, value);
                                    FocusScope.of(context).nextFocus();
                                  }
                                },
                    
                                decoration: const InputDecoration(hintText: "-"),
                                style: Theme.of(context).textTheme.titleLarge,
                                keyboardType: TextInputType.number,
                                textAlign: TextAlign.center,
                                inputFormatters: [
                                  LengthLimitingTextInputFormatter(1),
                                  FilteringTextInputFormatter.digitsOnly,
                                ],
                    
                              ),
                            ),
                            SizedBox(
                              height: 60,
                              width: 60,
                              child: TextFormField(
                                onChanged: (value){
                                  if(value.length == 1) {
                                    res = replaceCharAt(res, 4, value);
                                    FocusScope.of(context).nextFocus();
                                  }
                                },
                                decoration: const InputDecoration(hintText: "-"),
                                style: Theme.of(context).textTheme.titleLarge,
                                keyboardType: TextInputType.number,
                                textAlign: TextAlign.center,
                                inputFormatters: [
                                  LengthLimitingTextInputFormatter(1),
                                  FilteringTextInputFormatter.digitsOnly,
                                ],
                    
                              ),
                            ),
                            SizedBox(
                              height: 60,
                              width: 60,
                              child: TextFormField(
                                onChanged: (value) async{
                                  if(value.length == 1) {
                                    res = replaceCharAt(res, 5, value);
                                    if(!res.contains("f")) {
                                      // String token = await CachHelper.getData(key: 'token');
                                      // if (reset == false) {
                                      //   signUpCubit.verify(query: {"emailVerificationCode": res}, context: context);
                                      // } else {
                                      //   DioHelper.postDataVer(
                                      //       url: 'users/recover/verify',
                                      //       data: {
                                      //         "verificationCode": res,
                                      //       }, token: token,
                                      //   ).then((value) async {
                                      //     ToastContext toastContext = ToastContext();
                                      //     toastContext.init(context);
                                      //     Toast.show(
                                      //         "Successful",
                                      //         duration: Toast.lengthShort,
                                      //         gravity: Toast.bottom,
                                      //         backgroundColor: Colors.green
                                      //     );
                                      //     await CachHelper.saveData(key: 'token', value: value.data['token']);
                                      //     navigateAndFinish(context: context, screen: ResetPassword());
                                      //   });
                                      //Navigator.pushReplacementNamed(context, HomePage.route);
                                      navigateAndFinish(context: context, screen: HomePage());
                                    }
                                  }
                                },
                    
                                decoration: const InputDecoration(hintText: "-"),
                                style: Theme.of(context).textTheme.titleLarge,
                                keyboardType: TextInputType.number,
                                textAlign: TextAlign.center,
                                inputFormatters: [
                                  LengthLimitingTextInputFormatter(1),
                                  FilteringTextInputFormatter.digitsOnly,
                                ],
                    
                              ),
                            )
                          ],
                        ),TextButton(
                          style: TextButton.styleFrom(
                            textStyle: const TextStyle(fontSize: 20),
                          ),
                          onPressed: () {},
                          child: Text("${signUpCubit.items['resend']??''}",),
                    
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Container(
                          width: 80,
                          height: 40,
                          alignment: Alignment.bottomCenter,
                          decoration: BoxDecoration(
                            color: Colors.blue,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: TextButton(
                            child: Text(
                              "${signUpCubit.items['enter']??""}",
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                              ),
                            ),
                            onPressed: () async{
                              // String token = await CachHelper.getData(key: 'token');
                              // if(!res.contains("f")) {
                              //   if (reset == false) {
                              //     signUpCubit.verify(query: {"emailVerificationCode": res}, context: context);
                              //   } else {
                              //     DioHelper.postDataVer(
                              //       url: 'users/recover/verify',
                              //       data: {
                              //         "verificationCode": res,
                              //       }, token: token,
                              //     ).then((value) {
                              //       ToastContext toastContext = ToastContext();
                              //       toastContext.init(context);
                              //       Toast.show(
                              //           "Successful",
                              //           duration: Toast.lengthShort,
                              //           gravity: Toast.bottom,
                              //           backgroundColor: Colors.green
                              //       );
                              //     });
                              //   }
                              // }
                              // else{
                              //   Toast.show("${signUpCubit.items['error']??""}",
                              //       duration: Toast.lengthShort, backgroundColor: Colors.red
                              //   );
                              // }
                            },
                          ),
                        ),
                      ],
                    
                    ),
                  ));}));
  }
  String replaceCharAt(String oldString, int index, String newChar) {
    return oldString.substring(0, index) + newChar + oldString.substring(index + 1);
  }

}



