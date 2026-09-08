import 'package:flutter/material.dart';

import '../../data/mock_data.dart';
import '../../theme/app_theme.dart';
import '../../widgets/bottom_nav_bar.dart';
import '../../widgets/project_card.dart';
import '../../widgets/task_card.dart';
import '../projects/project_workspace_screen.dart';
import '../projects/projects_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  late final _pages = [
    _HomeTab(),
    const ProjectsScreen(),
    _PlaceholderPage(label: 'Create'),
    _PlaceholderPage(label: 'Tasks'),
    _PlaceholderPage(label: 'AI'),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      body: SafeArea(
        child: _pages[_selectedIndex],
      ),
      bottomNavigationBar: BottomNavBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() => _selectedIndex = index);
        },
      ),
    );
  }
}

class _HomeTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.fromLTRB(18, 10, 18, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 34,
                height: 34,
                decoration: const BoxDecoration(
                  color: AppTheme.accent,
                  shape: BoxShape.circle,
                ),
                alignment: Alignment.center,
                child: const Text(
                  'S',
                  style: TextStyle(fontWeight: FontWeight.w800, color: Colors.white),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Container(
                  height: 42,
                  padding: const EdgeInsets.symmetric(horizontal: 14),
                  decoration: BoxDecoration(
                    color: AppTheme.panelSoft,
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Row(
                    children: const [
                      Icon(Icons.search_rounded, color: AppTheme.textMuted),
                      SizedBox(width: 8),
                      Text('Search anything...', style: TextStyle(color: AppTheme.textMuted, fontSize: 15)),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Container(
                width: 40,
                height: 40,
                decoration: const BoxDecoration(
                  color: AppTheme.panelSoft,
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.notifications_none_rounded, color: AppTheme.text),
              ),
            ],
          ),
          const SizedBox(height: 22),
          const Text(
            'Good evening, Shruti 👋',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: AppTheme.text),
          ),
          const SizedBox(height: 8),
          const Text(
            "Here's what needs your attention.",
            style: TextStyle(fontSize: 16, color: AppTheme.textMuted),
          ),
          const SizedBox(height: 20),
          Row(
            children: const [
              Expanded(child: _StatChip(value: '6', label: 'Projects')),
              Expanded(child: _StatChip(value: '12', label: 'Tasks')),
              Expanded(child: _StatChip(value: '3', label: 'Due soon')),
            ],
          ),
          const SizedBox(height: 22),
          Container(
            padding: const EdgeInsets.all(18),
            decoration: AppTheme.panelDecoration,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: const [
                    Icon(Icons.auto_awesome_rounded, color: AppTheme.accent),
                    SizedBox(width: 8),
                    Text('AI Priority', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: AppTheme.text)),
                  ],
                ),
                const SizedBox(height: 10),
                const Text(
                  'You have 3 deadlines this week. Your Smart Architecture project needs attention first because its documentation is only 45% complete.',
                  style: TextStyle(fontSize: 15, color: AppTheme.text, height: 1.4),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.accent,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        child: const Text('View Priorities'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: OutlinedButton(
                        onPressed: () {},
                        style: OutlinedButton.styleFrom(
                          foregroundColor: AppTheme.accent,
                          side: const BorderSide(color: AppTheme.accent),
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        ),
                        child: const Text('Ask AI'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 26),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('TODAY', style: TextStyle(letterSpacing: 1.2, color: AppTheme.textMuted, fontWeight: FontWeight.w800)),
              TextButton(
                onPressed: () {},
                child: const Text('All tasks', style: TextStyle(color: AppTheme.accent, fontWeight: FontWeight.w700)),
              ),
            ],
          ),
          const SizedBox(height: 10),
          ...MockData.tasks.take(4).map((task) => TaskCard(task: task, compact: true)),
          const SizedBox(height: 20),
          const Text('Active projects', style: TextStyle(color: AppTheme.textMuted, fontWeight: FontWeight.w800, letterSpacing: 1.2)),
          const SizedBox(height: 10),
          ...MockData.projects.take(3).map((project) => ProjectCard(
            project: project,
            onTap: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => ProjectWorkspaceScreen(project: project)),
              );
            },
          )),
        ],
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  final String value;
  final String label;

  const _StatChip({required this.value, required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 4),
      padding: const EdgeInsets.symmetric(vertical: 16),
      decoration: AppTheme.panelDecoration,
      child: Column(
        children: [
          Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AppTheme.text)),
          const SizedBox(height: 6),
          Text(label, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted, letterSpacing: 1.1)),
        ],
      ),
    );
  }
}

class _PlaceholderPage extends StatelessWidget {
  final String label;

  const _PlaceholderPage({required this.label});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        label,
        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: AppTheme.text),
      ),
    );
  }
}
