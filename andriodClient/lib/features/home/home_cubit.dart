import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hotelyn/features/home/home_state.dart';

class HomeCubit extends Cubit<HomeState> {
  static String dist = "";
  static DateTime? _fromDate;
  static DateTime? _toDate;

  HomeCubit(super.initialState);
}
