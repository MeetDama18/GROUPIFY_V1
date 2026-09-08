import 'package:flutter/material.dart';

import '../../data/mock_data.dart';
import '../../theme/app_theme.dart';
import '../../widgets/project_card.dart';
import 'project_workspace_screen.dart';

class ProjectsScreen extends StatelessWidget {
  const ProjectsScreen({super.key});

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
                child: const Text('S', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800)),
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
          const SizedBox(height: 18),
          const Text('My Projects', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: AppTheme.text)),
          const SizedBox(height: 14),
          ...MockData.projects.map((project) => ProjectCard(
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
