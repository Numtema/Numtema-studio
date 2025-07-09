"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartJSTooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js"
import { createContext, useContext, useMemo, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type {
  ChartConfig,
  ChartContainerProps,
  ChartProps,
  ChartTooltipContentProps,
  ChartTooltipProps,
} from "@/lib/types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartJSTooltip,
  Legend,
  ArcElement,
  Filler,
)

const ChartContext = createContext<{
  config: ChartConfig
  setConfig: (config: ChartConfig) => void
} | null>(null)

function useChart() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer>")
  }
  return context
}

const ChartContainer = ({ config, children, className, ...props }: ChartContainerProps) => {
  const [activeConfig, setActiveConfig] = useState(config)

  const chartConfig = useMemo(() => {
    return {
      ...config,
      ...activeConfig,
    }
  }, [config, activeConfig])

  return (
    <ChartContext.Provider value={{ config: chartConfig, setConfig: setActiveConfig }}>
      <div className={cn("flex aspect-video justify-center gap-4 [&>div]:flex-1", className)} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

const Chart = ({ children, ...props }: ChartProps) => {
  return <TooltipProvider>{children}</TooltipProvider>
}

const ChartTooltip = ({ content, ...props }: ChartTooltipProps) => {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>
        <div />
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}

const ChartTooltipContent = ({ className, ...props }: ChartTooltipContentProps) => {
  const { config } = useChart()

  return (
    <div
      className={cn("flex flex-col gap-1.5 rounded-lg border bg-background p-2.5 text-sm shadow-lg", className)}
      {...props}
    />
  )
}

export { ChartContainer, Chart, ChartTooltip, ChartTooltipContent, useChart }
