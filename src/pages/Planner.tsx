import { CalendarClock } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

export default function Planner() {
  return (
    <ComingSoon
      icon={CalendarClock}
      eyebrow="Daily Planner"
      title="Time-blocked planning"
      description="Drag-and-drop time blocks with Pomodoro-linked focus sessions."
      phase={2}
      planned={[
        'Drag-and-drop time blocks',
        'Task priority & status',
        'Pomodoro timer integration',
        'Daily / weekly views',
      ]}
    />
  );
}
