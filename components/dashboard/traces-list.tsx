import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TracesListProps {
  expanded?: boolean
}

export function TracesList({ expanded = false }: TracesListProps) {
  const traces = [
    {
      id: "trace_1",
      name: "Customer Inquiry",
      timestamp: "Today at 14:32",
      status: "success",
      duration: "1.2s",
      agent: "Community Manager",
    },
    {
      id: "trace_2",
      name: "Data Analysis",
      timestamp: "Today at 12:15",
      status: "success",
      duration: "3.5s",
      agent: "Data Analyst",
    },
    {
      id: "trace_3",
      name: "Product Recommendation",
      timestamp: "Yesterday at 18:42",
      status: "error",
      duration: "2.1s",
      agent: "Community Manager",
    },
  ]

  return (
    <div className="space-y-3">
      {traces.map((trace) => (
        <div key={trace.id} className="flex items-center justify-between p-3 border rounded-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{trace.name}</span>
              <Badge
                variant={trace.status === "success" ? "default" : "destructive"}
                className={`text-xs ${trace.status === "success" ? "bg-green-500" : ""}`}
              >
                {trace.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{trace.timestamp}</span>
              <span>•</span>
              <span>{trace.duration}</span>
              {expanded && (
                <>
                  <span>•</span>
                  <span>{trace.agent}</span>
                </>
              )}
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            View
          </Button>
        </div>
      ))}
    </div>
  )
}
