import { Sparkles } from 'lucide-react';
import ComingSoon from '@/components/common/ComingSoon';

export default function AIAssistant() {
  return (
    <ComingSoon
      icon={Sparkles}
      eyebrow="AI Assistant"
      title="Your in-app copilot"
      description="A floating chat assistant with markdown responses and code highlighting."
      phase={4}
      planned={[
        'Floating chat interface',
        'Typing animation',
        'Suggested prompts',
        'Syntax-highlighted code blocks',
      ]}
    />
  );
}
