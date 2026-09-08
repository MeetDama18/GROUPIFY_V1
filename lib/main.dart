import 'package:flutter/material.dart';

import 'screens/auth/login_screen.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const GroupifyApp());
}

class GroupifyApp extends StatelessWidget {
  const GroupifyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Groupify',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.theme(),
      home: const LoginScreen(),
    );
  }
}
