import { Github } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

export default function GitHubDashboard() {
  return (
    <ComingSoon
      icon={Github}
      eyebrow="GitHub Dashboard"
      title="Contribution mission control"
      description="A mock-data-driven view of contributions, repos, and languages."
      phase={3}
      planned={[
        'Contribution heatmap',
        'Repository & star stats',
        'Language breakdown chart',
        'Follower trend graph',
      ]}
    />
  );
}
