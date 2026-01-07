import { Badge } from "@/components/ui/badge";

export function AgentStatusBadge({ status }: { status: string }) {
  const variant =
    status === "active"
      ? "default"
      : status === "pending_verification"
      ? "secondary"
      : "outline";

  return <Badge variant={variant}>{status}</Badge>;
}
