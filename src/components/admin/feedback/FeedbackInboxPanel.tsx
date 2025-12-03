import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const FeedbackInboxPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Feedback Inbox
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No feedback items yet.</p>
      </CardContent>
    </Card>
  );
};

export default FeedbackInboxPanel;
