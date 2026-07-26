import { Code2 } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

export default function LeetCodeDashboard() {
  return (
    <ComingSoon
      icon={Code2}
      eyebrow="LeetCode Tracker"
      title="Problem-solving stats"
      description="Difficulty breakdown, contest rating, and streak heatmap."
      phase={3}
      planned={[
        'Problems solved by difficulty',
        'Contest rating trend',
        'Submission heatmap',
        'Badge unlocks',
      ]}
    />
  );
}
