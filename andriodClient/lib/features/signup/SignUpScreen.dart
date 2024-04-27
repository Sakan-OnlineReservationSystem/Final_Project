import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hotelyn/features//signup/cubit/SignUpCubit.dart';
import 'package:hotelyn/features//signup/cubit/SignUpStates.dart';
import 'package:hotelyn/shared/components/Components.dart';
import 'package:toast/toast.dart';

import '../../shared/network/remote/DioHelper.dart';
import '../VerificationScreen/verification.dart';

class SignUpScreen extends StatelessWidget {
  String language;
  ToastContext sss = ToastContext();
  SignUpScreen({super.key, required this.language});
  var fNameController = TextEditingController();
  var lNameController = TextEditingController();
  var emailController = TextEditingController();
  var passwordController = TextEditingController();
  var confirmPasswordController = TextEditingController();
  var cityController = TextEditingController();
  var phoneController = TextEditingController();
  var formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {

    return BlocProvider(
      create: (context) => SignUpCubit()..setLanguage(l: language)..readJson('SignUp'),
      child: BlocConsumer<SignUpCubit, SignUpStates>(
          listener: (context, state) {},
          builder: (context, state) {
            var signUpCubit = SignUpCubit.get(context);
            //phoneController.text = "+2";
            return Scaffold(
              backgroundColor: Colors.grey[300],
              body: Directionality(
                textDirection: signUpCubit.language == "English" ? TextDirection.ltr: TextDirection.rtl,
                child: Form(
                  key: formKey,
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10
                      ),
                      child: Column(
                        children: [
                          const SizedBox(
                            height: 50,
                          ),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                "${signUpCubit.items['title1']??''}",
                                style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 40,
                                    color: Colors.black
                                ),
                              ),
                              const SizedBox(width: 10,),
                              const Image(image: AssetImage('assets/images/hand.png'), width: 50, height: 50,)
                            ],
                          ),
                          Text(
                            "${signUpCubit.items['title2']??''}",
                            style: const TextStyle(
                                fontSize: 20,
                                color: Colors.grey
                            ),
                          ),
                          const SizedBox(
                            height: 30,
                          ),
                          Row(
                            children: [
                              defaultTextFormFieldRow(
                                  prefixIcon: const Icon(Icons.text_fields),
                                  controller: fNameController,
                                  textInputType: TextInputType.name,
                                  validatorFunction: (value) {
                                    if(value.length == 0) {
                                      return signUpCubit.items['nameError']??"";
                                    }
                                  },
                                  labelText: signUpCubit.items['Fname']??""
                              ),
                              const SizedBox(
                                width: 20,
                              ),
                              defaultTextFormFieldRow(
                                  prefixIcon: const Icon(Icons.text_fields),
                                  controller: lNameController,
                                  textInputType: TextInputType.name,
                                  validatorFunction: (value) {
                                    if(value.length == 0) {
                                      return signUpCubit.items['nameError']??"";
                                    }
                                  },
                                  labelText: signUpCubit.items['Lname']??""
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          defaultTextFormFieldColumn(
                              prefixIcon: const Icon(Icons.email),
                              controller: emailController,
                              labelText: signUpCubit.items['email']??"",
                              validatorFunction: (String? value) {
                                if(value!.isEmpty) {
                                  return "${signUpCubit.items['emailErrorEmpty']??''}";
                                } else if(!EmailValidator.validate(value, true)) {
                                  return "${signUpCubit.items['emailError']??''}";
                                }
                              },
                              textInputType: TextInputType.emailAddress
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          defaultTextFormFieldColumn(
                              prefixIcon: signUpCubit.passwordIsSecure ? const Icon(Icons.lock): const Icon(Icons.lock_open),
                              controller: passwordController,
                              labelText: signUpCubit.items['password']??"",
                              validatorFunction: (value) {
                                if(value.length == 0) {
                                  return signUpCubit.items['passwordError']??"";
                                }
                              },
                              textInputType: TextInputType.text,
                              isSecure: signUpCubit.passwordIsSecure,
                              suffixIcon: signUpCubit.passwordIsSecure ? Icons.visibility_off : Icons.visibility,
                              suffixIconFunction: () {
                                signUpCubit.changePasswordVisibility();
                              }
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          defaultTextFormFieldColumn(
                              prefixIcon: signUpCubit.passwordIsSecure ? const Icon(Icons.lock): const Icon(Icons.lock_open),
                              controller: confirmPasswordController,
                              labelText: signUpCubit.items['confirmPassword']??"",
                              validatorFunction: (value) {
                                if(value  != passwordController.text) {
                                  return signUpCubit.items['confirmPasswordError']??"";
                                }
                              },
                              textInputType: TextInputType.text,
                              isSecure: signUpCubit.confirmPasswordIsSecure,
                              suffixIcon: signUpCubit.confirmPasswordIsSecure ? Icons.visibility_off : Icons.visibility,
                              suffixIconFunction: () {
                                signUpCubit.changeConfirmPasswordVisibility();
                              }
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          defaultTextFormFieldColumn(
                              prefixIcon: const Icon(Icons.location_city),
                              controller: cityController,
                              labelText: signUpCubit.items['city']??"",
                              validatorFunction: (value) {
                                if(value.length == 0) {
                                  return signUpCubit.items['cityError']??"";
                                }
                              },
                              textInputType: TextInputType.text
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                          defaultTextFormFieldColumn(
                              prefixIcon: const Icon(Icons.phone),
                              controller: phoneController,
                              labelText: signUpCubit.items['phone']??"",
                              validatorFunction: (value){
                                //+201021890205
                                if(value.length != 13) {
                                  return signUpCubit.items['phoneError']??"";
                                }
                              },
                              textInputType: TextInputType.phone
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(5),
                                border: Border.all(
                                    color: signUpCubit.hasWhatsAppColor
                                )
                            ),
                            child: CheckboxListTile(
                              controlAffinity: ListTileControlAffinity.leading,
                              title: Text(
                                  "${signUpCubit.items['whatsappCheckBox']??""}"
                              ),
                              value: signUpCubit.hasWhatsApp,
                              onChanged: (value) {
                                signUpCubit.hasWhatsAppFun();
                              },
                            ),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Container(
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(5),
                                border: Border.all(
                                    color: signUpCubit.agreeColor
                                )
                            ),
                            child: Row(
                              children: [
                                Expanded(
                                  child: CheckboxListTile(
                                    controlAffinity: ListTileControlAffinity.leading,
                                    title: Text(
                                        "${signUpCubit.items['termsAndConditions']??""}"
                                    ),
                                    value: signUpCubit.termsAndConditions,
                                    onChanged: (value) {
                                      signUpCubit.termsAndConditionsFun();
                                    },
                                  ),
                                ),
                                Expanded(
                                  child: Column(
                                    // mainAxisAlignment: MainAxisAlignment.start,
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      TextButton(
                                        onPressed: (){
                                        },
                                        child: Text(
                                          "${signUpCubit.items['termsAndConditionsPage']??""}",
                                          style: const TextStyle(
                                            color: Colors.blue,
                                          ),
                                        ),),
                                    ],
                                  ),
                                )
                              ],
                            ),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          InkWell(
                            onTap: () {
                              if(!signUpCubit.hasWhatsApp) {
                                signUpCubit.changeHasWhatsApp();
                                return;
                              }
                              if(!signUpCubit.termsAndConditions) {
                                signUpCubit.agreeTermsAndConditionsColor();
                                return;
                              }
                              if(formKey.currentState!.validate()) {
                                // DioHelper.postData(url: 'users/register',
                                //     data: {
                                //       'email' : emailController.text,
                                //       'firstName' :  fNameController.text,
                                //       'lastName' : lNameController.text,
                                //       'password' : passwordController.text,
                                //       'phoneNumber' : phoneController.text.replaceAll("+", "00"),
                                //       'hasWhatsapp' : true
                                //     }).then((value){
                                //   sss.init(context);
                                //   Toast.show("email created Successfully",
                                //       duration: Toast.lengthShort,
                                //       gravity:  Toast.bottom,backgroundColor: Colors.green);
                                //   navigateAndFinish(context: context, screen: Verification(language: language, reset: false,));
                                //   //print(value);
                                // }).catchError((error) {
                                //   //print(error.toString());
                                //   sss.init(context);
                                //   Toast.show("email is not valid",
                                //       duration: Toast.lengthLong,
                                //       gravity:  Toast.bottom,backgroundColor: Colors.red);
                                // });
                                navigateAndFinish(context: context, screen: Verification(language: language, reset: false,));

                              }
                            },
                            child: Container(
                              width: double.infinity,
                              height: 40,
                              decoration: BoxDecoration(
                                color: Colors.blue,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Center(
                                child: Text(
                                  "${signUpCubit.items['signUp']??""}",
                                  style: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 20
                                  ),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            );}
      ),
    );
  }

}
